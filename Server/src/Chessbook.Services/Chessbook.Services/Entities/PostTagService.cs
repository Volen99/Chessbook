using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Caching;
using Chessbook.Services.Catalog;
using Chessbook.Services.Security;
using Chessbook.Services.Stores;
using Chessbook.Core.Domain.Posts;
using Chessbook.Data;

namespace Chessbook.Services.Entities
{
    public class PostTagService : IPostTagService
    {
        #region Fields

        private readonly IAclService _aclService;
        private readonly IUserService _customerService;
        private readonly IRepository<Post> _productRepository;
        private readonly IRepository<PostTag> _productProductTagMappingRepository;
        private readonly IRepository<Tag> _productTagRepository;
        private readonly IStaticCacheManager _staticCacheManager;
        private readonly IStoreMappingService _storeMappingService;
        private readonly IWorkContext _workContext;

        #endregion

        #region Ctor

        public PostTagService(
            IAclService aclService,
            IUserService customerService,
            IRepository<Post> productRepository,
            IRepository<PostTag> productProductTagMappingRepository,
            IRepository<Tag> productTagRepository,
            IStaticCacheManager staticCacheManager,
            IStoreMappingService storeMappingService,
            IWorkContext workContext)
        {
            _aclService = aclService;
            _customerService = customerService;
            _productRepository = productRepository;
            _productProductTagMappingRepository = productProductTagMappingRepository;
            _productTagRepository = productTagRepository;
            _staticCacheManager = staticCacheManager;
            _storeMappingService = storeMappingService;
            _workContext = workContext;
        }

        #endregion

        #region Utilities

        /// <summary>
        /// Delete a product-product tag mapping
        /// </summary>
        /// <param name="productId">Product identifier</param>
        /// <param name="productTagId">Product tag identifier</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected virtual async Task DeleteProductProductTagMappingAsync(int productId, int productTagId)
        {
            var mappingRecord = await _productProductTagMappingRepository.Table
                .FirstOrDefaultAsyncExt(pptm => pptm.PostId == productId && pptm.TagId == productTagId);

            if (mappingRecord is null)
            {
                throw new Exception("Mapping record not found");
            }

            await _productProductTagMappingRepository.DeleteAsync(mappingRecord);
        }

        /// <summary>
        /// Indicates whether a product tag exists
        /// </summary>
        /// <param name="product">Product</param>
        /// <param name="productTagId">Product tag identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        protected virtual async Task<bool> PostTagExistsAsync(Post product, int productTagId)
        {
            if (product == null)
                throw new ArgumentNullException(nameof(product));

            return await _productProductTagMappingRepository.Table
                .AnyAsync(pptm => pptm.PostId == product.Id && pptm.TagId == productTagId);
        }

        /// <summary>
        /// Gets product tag by name
        /// </summary>
        /// <param name="name">Product tag name</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product tag
        /// </returns>
        public virtual async Task<Tag> GetPostTagByNameAsync(string name) // was protected
        {
            var query = from pt in _productTagRepository.Table
                        where pt.Name == name
                        select pt;

            var productTag = await query.FirstOrDefaultAsyncExt();
            return productTag;
        }

        /// <summary>
        /// Inserts a product tag
        /// </summary>
        /// <param name="productTag">Product tag</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        protected virtual async Task InsertPostTagAsync(Tag productTag)
        {
            await _productTagRepository.InsertAsync(productTag);
        }

        #endregion

        #region Methods

        /// <summary>
        /// Delete a product tag
        /// </summary>
        /// <param name="productTag">Product tag</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task DeletePostTagAsync(Tag productTag)
        {
            await _productTagRepository.DeleteAsync(productTag);
        }

        /// <summary>
        /// Delete product tags
        /// </summary>
        /// <param name="productTags">Product tags</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task DeletePostTagsAsync(IList<Tag> productTags)
        {
            if (productTags == null)
            {
                throw new ArgumentNullException(nameof(productTags));
            }

            foreach (var productTag in productTags)
            {
                await DeletePostTagAsync(productTag);
            }
        }

        /// <summary>
        /// Gets all product tags
        /// </summary>
        /// <param name="tagName">Tag name</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product tags
        /// </returns>
        public virtual async Task<IList<Tag>> GetAllPostTagsAsync(string tagName = null)
        {
            var allProductTags = await _productTagRepository.GetAllAsync(query => query, getCacheKey: cache => default);

            if (!string.IsNullOrEmpty(tagName))
                allProductTags = allProductTags.Where(tag => tag.Name.Contains(tagName)).ToList();

            return allProductTags;
        }

        /// <summary>
        /// Gets all product tags by product identifier
        /// </summary>
        /// <param name="productId">Product identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product tags
        /// </returns>
        public virtual async Task<IList<Tag>> GetAllPostTagsByPostIdAsync(int productId)
        {
            var key = _staticCacheManager.PrepareKeyForDefaultCache(NopCatalogDefaults.ProductTagsByProductCacheKey, productId);

            return await _staticCacheManager.GetAsync(key, async () =>
            {
                var tagMapping = from ptm in _productProductTagMappingRepository.Table
                                 join pt in _productTagRepository.Table on ptm.TagId equals pt.Id
                                 where ptm.PostId == productId
                                 orderby pt.Id
                                 select pt;

                return await tagMapping.ToListAsync();
            });
        }

        /// <summary>
        /// Gets product tag
        /// </summary>
        /// <param name="productTagId">Product tag identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product tag
        /// </returns>
        public virtual async Task<Tag> GetPostTagByIdAsync(int productTagId)
        {
            return await _productTagRepository.GetByIdAsync(productTagId, cache => default);
        }

        /// <summary>
        /// Gets product tags
        /// </summary>
        /// <param name="productTagIds">Product tags identifiers</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the product tags
        /// </returns>
        public virtual async Task<IList<Tag>> GetPostTagsByIdsAsync(int[] productTagIds)
        {
            return await _productTagRepository.GetByIdsAsync(productTagIds);
        }

        /// <summary>
        /// Inserts a product-product tag mapping
        /// </summary>
        /// <param name="tagMapping">Product-product tag mapping</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task InsertProductProductTagMappingAsync(PostTag tagMapping)
        {
            await _productProductTagMappingRepository.InsertAsync(tagMapping);
        }

        /// <summary>
        /// Updates the product tag
        /// </summary>
        /// <param name="productTag">Product tag</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task UpdatePostTagAsync(Tag postTag)
        {
            if (postTag == null)
                throw new ArgumentNullException(nameof(postTag));

            await _productTagRepository.UpdateAsync(postTag);

            //var seName = await _urlRecordService.ValidateSeNameAsync(postTag, string.Empty, postTag.Name, true);
            //await _urlRecordService.SaveSlugAsync(postTag, seName, 0);
        }

        /// <summary>
        /// Get products quantity linked to a passed tag identifier
        /// </summary>
        /// <param name="productTagId">Product tag identifier</param>
        /// <param name="storeId">Store identifier</param>
        /// <param name="showHidden">A value indicating whether to show hidden records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the number of products
        /// </returns>
        public virtual async Task<int> GetPostCountByPostTagIdAsync(int productTagId, int storeId, bool showHidden = false)
        {
            var dictionary = await GetPostCountAsync(storeId, showHidden);
            if (dictionary.ContainsKey(productTagId))
            {
                return dictionary[productTagId];
            }

            return 0;
        }

        /// <summary>
        /// Get product count for every linked tag
        /// </summary>
        /// <param name="storeId">Store identifier</param>
        /// <param name="showHidden">A value indicating whether to show hidden records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the dictionary of "product tag ID : product count"
        /// </returns>
        public virtual async Task<Dictionary<int, int>> GetPostCountAsync(int storeId, bool showHidden = false)
        {
            var customer = await _workContext.GetCurrentCustomerAsync();
            var customerRoleIds = await _customerService.GetCustomerRoleIdsAsync(customer);

            //var key = _staticCacheManager.PrepareKeyForDefaultCache(NopCatalogDefaults.ProductTagCountCacheKey, storeId, customerRoleIds, showHidden);

            //return await _staticCacheManager.GetAsync(key, async () =>
            //{
            //    var query = _productProductTagMappingRepository.Table;

            //    if (!showHidden)
            //    {
            //        // var productsQuery = _productRepository.Table.Where(p => p.Published);
            //        var productsQuery = _productRepository.Table.Where(p => p.CreatedAt != null);

            //        //apply store mapping constraints
            //        // productsQuery = await _storeMappingService.ApplyStoreMapping(productsQuery, storeId);

            //        //apply ACL constraints
            //        // productsQuery = await _aclService.ApplyAcl(productsQuery, customerRoleIds);

            //        query = query.Where(pc => productsQuery.Any(p => !p.Deleted && pc.PostId == p.Id));
            //    }

            //    var pTagCount = from pt in _productTagRepository.Table
            //                    join ptm in query on pt.Id equals ptm.TagId
            //                    group ptm by ptm.TagId into ptmGrouped
            //                    select new
            //                    {
            //                        ProductTagId = ptmGrouped.Key,
            //                        ProductCount = ptmGrouped.Count()
            //                    };

            //    return pTagCount.ToDictionary(item => item.ProductTagId, item => item.ProductCount);
            //});

            var query = _productProductTagMappingRepository.Table;

            if (!showHidden)
            {
                // var productsQuery = _productRepository.Table.Where(p => p.Published);
                var productsQuery = _productRepository.Table.Where(p => p.CreatedAt != null);

                //apply store mapping constraints
                // productsQuery = await _storeMappingService.ApplyStoreMapping(productsQuery, storeId);

                //apply ACL constraints
                // productsQuery = await _aclService.ApplyAcl(productsQuery, customerRoleIds);

                query = query.Where(pc => productsQuery.Any(p => !p.Deleted && pc.PostId == p.Id));
            }

            var pTagCount = from pt in _productTagRepository.Table
                            join ptm in query on pt.Id equals ptm.TagId
                            group ptm by ptm.TagId into ptmGrouped
                            select new
                            {
                                ProductTagId = ptmGrouped.Key,
                                ProductCount = ptmGrouped.Count()
                            };

            return pTagCount.ToDictionary(item => item.ProductTagId, item => item.ProductCount);
        }

        /// <summary>
        /// Update product tags
        /// </summary>
        /// <param name="product">Product for update</param>
        /// <param name="productTags">Product tags</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task UpdatePostTagsAsync(Post product, string[] productTags)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product));
            }

            // product tags
            var existingProductTags = await GetAllPostTagsByPostIdAsync(product.Id);
            var productTagsToRemove = new List<Tag>();
            foreach (var existingProductTag in existingProductTags)
            {
                var found = false;
                foreach (var newProductTag in productTags)
                {
                    if (!existingProductTag.Name.Equals(newProductTag, StringComparison.InvariantCultureIgnoreCase))
                    {
                        continue;
                    }

                    found = true;
                    break;
                }

                if (!found)
                {
                    productTagsToRemove.Add(existingProductTag);
                }
            }

            foreach (var productTag in productTagsToRemove)
            {
                await DeleteProductProductTagMappingAsync(product.Id, productTag.Id);
            }

            foreach (var productTagName in productTags)
            {
                Tag productTag;
                var productTag2 = await GetPostTagByNameAsync(productTagName);
                if (productTag2 == null)
                {
                    // add new product tag
                    productTag = new Tag
                    {
                        Name = productTagName,
                        CreatedAt = DateTime.UtcNow,
                    };
                    await InsertPostTagAsync(productTag);
                }
                else
                    productTag = productTag2;

                if (!await PostTagExistsAsync(product, productTag.Id))
                {
                    await InsertProductProductTagMappingAsync(new PostTag { TagId = productTag.Id, PostId = product.Id, CreatedAt = DateTime.UtcNow, });
                }

                //var seName = await _urlRecordService.ValidateSeNameAsync(productTag, string.Empty, productTag.Name, true);
                //await _urlRecordService.SaveSlugAsync(productTag, seName, 0);
            }

            //cache
            await _staticCacheManager.RemoveByPrefixAsync(NopEntityCacheDefaults<Tag>.Prefix);
        }

        #endregion
    }
}
