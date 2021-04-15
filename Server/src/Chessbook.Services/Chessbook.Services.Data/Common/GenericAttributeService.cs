using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chessbook.Common;
using Chessbook.Data.Common.Repositories;
using Chessbook.Data.Models;
using Microsoft.EntityFrameworkCore;
using Nop.Core;
using Nop.Core.Caching;
using Nop.Core.Domain.Common;

namespace Nop.Services.Common
{
    /// <summary>
    /// Generic attribute service
    /// </summary>
    public partial class GenericAttributeService : IGenericAttributeService
    {
        #region Fields

        private readonly IRepository<GenericAttribute> _genericAttributeRepository;
        private readonly IStaticCacheManager _staticCacheManager;

        #endregion

        #region Ctor

        public GenericAttributeService(IRepository<GenericAttribute> genericAttributeRepository, IStaticCacheManager staticCacheManager)
        {
            _genericAttributeRepository = genericAttributeRepository;
            _staticCacheManager = staticCacheManager;
        }

        #endregion

        #region Methods


        /// <summary>
        /// Save attribute value
        /// </summary>
        /// <typeparam name="TPropType">Property type</typeparam>
        /// <param name="entity">Entity</param>
        /// <param name="key">Key</param>
        /// <param name="value">Value</param>
        /// <param name="storeId">Store identifier; pass 0 if this attribute will be available for all stores</param>
        public virtual async Task SaveAttributeAsync<TPropType>(BaseEntity entity, string key, TPropType value, int storeId = 0)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            if (key == null)
                throw new ArgumentNullException(nameof(key));

            var keyGroup = entity.GetType().Name;

            var props = (await GetAttributesForEntityAsync(entity.Id, keyGroup))
                .Where(x => x.StoreId == storeId)
                .ToList();
            var prop = props.FirstOrDefault(ga =>
                ga.Key.Equals(key, StringComparison.InvariantCultureIgnoreCase)); // should be culture invariant

            var valueStr = CommonHelper.To<string>(value);

            if (prop != null)
            {
                if (string.IsNullOrWhiteSpace(valueStr))
                    //delete
                    await DeleteAttributeAsync(prop);
                else
                {
                    //update
                    prop.Value = valueStr;
                    await UpdateAttributeAsync(prop);
                }
            }
            else
            {
                if (string.IsNullOrWhiteSpace(valueStr)) 
                    return;

                //insert
                prop = new GenericAttribute
                {
                    EntityId = entity.Id,
                    Key = key,
                    KeyGroup = keyGroup,
                    Value = valueStr,
                    StoreId = storeId
                };

                await InsertAttributeAsync(prop);
            }
        }

        /// <summary>
        /// Get an attribute of an entity
        /// </summary>
        /// <typeparam name="TPropType">Property type</typeparam>
        /// <param name="entity">Entity</param>
        /// <param name="key">Key</param>
        /// <param name="storeId">Load a value specific for a certain store; pass 0 to load a value shared for all stores</param>
        /// <param name="defaultValue">Default value</param>
        /// <returns>Attribute</returns>
        public virtual async Task<TPropType> GetAttributeAsync<TPropType>(BaseEntity entity, string key, int storeId = 0, TPropType defaultValue = default)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            var keyGroup = entity.GetType().Name;

            var props = await GetAttributesForEntityAsync(entity.Id, keyGroup);

            //little hack here (only for unit testing). we should write expect-return rules in unit tests for such cases
            if (props == null)
                return defaultValue;

            props = props.Where(x => x.StoreId == storeId).ToList();
            if (!props.Any())
                return defaultValue;

            var prop = props.FirstOrDefault(ga =>
                ga.Key.Equals(key, StringComparison.InvariantCultureIgnoreCase)); //should be culture invariant

            if (prop == null || string.IsNullOrEmpty(prop.Value))
                return defaultValue;

            return CommonHelper.To<TPropType>(prop.Value);
        }

        /// <summary>
        /// Get an attribute of an entity
        /// </summary>
        /// <typeparam name="TPropType">Property type</typeparam>
        /// <typeparam name="TEntity">Entity type</typeparam>
        /// <param name="entityId">Entity identifier</param>
        /// <param name="key">Key</param>
        /// <param name="storeId">Load a value specific for a certain store; pass 0 to load a value shared for all stores</param>
        /// <param name="defaultValue">Default value</param>
        /// <returns>Attribute</returns>
        public virtual async Task<TPropType> GetAttributeAsync<TEntity, TPropType>(int entityId, string key, int storeId = 0, TPropType defaultValue = default)
            where TEntity : BaseEntity
        {
            var entity = (TEntity)Activator.CreateInstance(typeof(TEntity));
            entity.Id = entityId;

            return await GetAttributeAsync(entity, key, storeId, defaultValue);
        }

        public Task DeleteAttributeAsync(GenericAttribute attribute)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAttributesAsync(IList<GenericAttribute> attributes)
        {
            throw new NotImplementedException();
        }

        public Task InsertAttributeAsync(GenericAttribute attribute)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAttributeAsync(GenericAttribute attribute)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get attributes
        /// </summary>
        /// <param name="entityId">Entity identifier</param>
        /// <param name="keyGroup">Key group</param>
        /// <returns>Get attributes</returns>
        public async Task<IList<GenericAttribute>> GetAttributesForEntityAsync(int entityId, string keyGroup)
        {
            var key = _staticCacheManager.PrepareKeyForShortTermCache(NopCommonDefaults.GenericAttributeCacheKey, entityId, keyGroup);

            var query = from ga in _genericAttributeRepository.All()
                        where ga.EntityId == entityId &&
                              ga.KeyGroup == keyGroup
                        select ga;
            var attributes = await _staticCacheManager.GetAsync(key, async () => await query.ToListAsync());

            return attributes;
        }

        #endregion
    }
}
