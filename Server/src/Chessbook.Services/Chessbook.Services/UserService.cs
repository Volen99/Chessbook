namespace Chessbook.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Chessbook.Core;
    using Chessbook.Data.Common.Filters;
    using Chessbook.Data.Common.Repositories;
    using Chessbook.Data.Common.System;
    using Chessbook.Data.Models;
    using Chessbook.Data.Models.System;
    using Chessbook.Data.Repositories;
    using Chessbook.Services.Data;
    using Chessbook.Services.Data.Services;
    using Chessbook.Services.Mapping;
    using Chessbook.Web.Models;
    using LinqToDB;

    public class UserService<TUser> : BaseService, IUserService where TUser : User, new()
    {
        protected readonly IUserRepository<TUser> userRepository;
        protected readonly IUserPhotoRepository userPhotoRepository;
        private readonly IUserRoleRepository<UserRole> _customerCustomerRoleMappingRepository;

        private readonly IRepository<UserRole> _customerRoleRepository;
        private readonly IRepository<Relationship> relationshipRepository;

        public UserService(ICurrentContextProvider contextProvider, IUserRepository<TUser> userRepository,
            IUserPhotoRepository userPhotoRepository, IUserRoleRepository<UserRole> customerCustomerRoleMappingRepository,
            IRepository<Relationship> relationshipRepository) : base(contextProvider)
        {
            this.userRepository = userRepository;
            this.userPhotoRepository = userPhotoRepository;

            this._customerCustomerRoleMappingRepository = customerCustomerRoleMappingRepository;
            this.relationshipRepository = relationshipRepository;
        }

        public async Task<GridData<UserDTO>> GetDataForGrid(UsersGridFilter filter, bool includeDeleted = false)
        {
            var tuple = await userRepository.GetFilteredListWithTotalCount(filter, Session, includeDeleted);

            return new GridData<UserDTO>
            {
                Items = tuple.Item1.MapTo<IEnumerable<UserDTO>>(),
                TotalCount = tuple.Item2
            };
        }

        public async Task<bool> Delete(int id)
        {
            await userRepository.Delete(id, Session);
            return true;
        }

        public async Task<UserDTO> Edit(UserDTO dto)
        {
            var user = dto.MapTo<TUser>();
            await userRepository.Edit(user, Session);
            return user.MapTo<UserDTO>();
        }

        public async Task<byte[]> GetUserPhoto(int userId)
        {
            var photoContent = await userPhotoRepository.Get(userId, Session);
            return photoContent?.Image;
        }

        public async Task<UserDTO> GetById(int id, bool includeDeleted = false)
        {
            var user = await userRepository.Get(id, Session, includeDeleted);
            return user.MapTo<UserDTO>();
        }

        public async Task<User> GetByIdClean(int id, bool includeDeleted = false)
        {
            var user = await userRepository.Get(id, Session, includeDeleted);
            return user;
        }

        public async Task<UserDTO> GetByLogin(string login, bool includeDeleted = false)
        {
            var user = await userRepository.GetByLogin(login, Session, includeDeleted);
            return user.MapTo<UserDTO>();
        }

        public async Task<(IEnumerable<TUser>, int)> GetFilteredListWithTotalCount(UsersGridFilter filter,
            ContextSession session, bool includeDeleted = false)
        {
            //var query = GetEntities(session, includeDeleted).ApplyFilter(filter);
            //return (
            //    await query
            //        .Skip(filter.PageSize * (filter.PageNumber - 1))
            //        .Take(filter.PageSize)
            //        .Include(u => u.UserRoles)
            //        .ThenInclude(x => x.Role)
            //        .Include(u => u.Settings)
            //        .ToArrayAsync(),
            //    await query
            //        .CountAsync());

            return default;
        }

        public async Task<(IList<User>, int)> GetAllUsers(UsersGridFilter filter, int userId)
        {
            var users = await this.userRepository.GetFilteredListWithTotalCount(filter, Session);

            var loggedinUserRelationships = await this.relationshipRepository.All().Where(r => r.SourceId == userId).ToListAsync();

            var usersModel = new List<User>();
            foreach (var user in users.Item1)
            {
                if (user.Id == userId)
                {
                    continue;
                }

                var currentRelationship = loggedinUserRelationships.Where(r => r.TargetId == user.Id).FirstOrDefault();

                if (currentRelationship == null)
                {
                    usersModel.Add(user);
                    continue;
                }

                if (currentRelationship.Following)
                {
                    continue;
                }

                user.FollowedBy = currentRelationship.FollowedBy; // for who to follow and connect. Usually it is not ok to have this prop in the user

                usersModel.Add(user);
            }

           var tuple = (usersModel, users.Item2);

            return tuple;
        }

        public async Task<UserDTO> GetByScreenName(string screenName, bool includeDeleted = true)
        {
            var profile = await this.userRepository.GetByLogin(screenName, base.Session);

            return profile.MapTo<UserDTO>();
        }

        public async Task SaveAvatarId(int userId, int pictureId)
        {
            var user = (await this.userRepository.Get(userId, Session));

            user.ProfilePictureId = pictureId;

            await this.userRepository.Edit(user, Session);
        }

        public async Task Update(dynamic user)
        {
            await this.userRepository.Edit(user, Session);
        }

        /// <summary>
        /// Gets a value indicating whether customer is guest
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>Result</returns>
        public async Task<bool> IsGuestAsync(User customer, bool onlyActiveCustomerRoles = true)
        {
            return await IsInCustomerRoleAsync(customer, NopCustomerDefaults.GuestsRoleName, onlyActiveCustomerRoles);
        }


        /// <summary>
        /// Gets list of customer roles
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="showHidden">A value indicating whether to load hidden records</param>
        /// <returns>Result</returns>
        public async Task<IList<string>> GetCustomerRolesAsync(User customer, bool showHidden = false)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            //return await _customerRoleRepository.GetAllAsync(query =>
            //{
            //    return from cr in query
            //           join crm in _customerCustomerRoleMappingRepository.Table on cr.Id equals crm.CustomerRoleId
            //           where crm.CustomerId == customer.Id &&
            //                 (showHidden || cr.Active)
            //           select cr;
            //}, cache => cache.PrepareKeyForShortTermCache(NopCustomerServicesDefaults.CustomerRolesCacheKey, customer, showHidden));

            return await _customerCustomerRoleMappingRepository.GetByUserId(customer.Id, Session);

        }

        /// <summary>
        /// Gets a value indicating whether customer is a forum moderator
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>Result</returns>
        public virtual async Task<bool> IsForumModeratorAsync(User customer, bool onlyActiveCustomerRoles = true)
        {
            return await IsInCustomerRoleAsync(customer, NopCustomerDefaults.ForumModeratorsRoleName, onlyActiveCustomerRoles);
        }


        /// <summary>
        /// Gets a value indicating whether customer is in a certain customer role
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="customerRoleSystemName">Customer role system name</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>Result</returns>
        public async Task<bool> IsInCustomerRoleAsync(User customer, string customerRoleSystemName, bool onlyActiveCustomerRoles = true)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            if (string.IsNullOrEmpty(customerRoleSystemName))
            {
                throw new ArgumentNullException(nameof(customerRoleSystemName));
            }

            var customerRoles = await GetCustomerRolesAsync(customer, !onlyActiveCustomerRoles);

            return customerRoles?.Any(cr => cr == customerRoleSystemName) ?? false;              // .SystemName
        }
    }
}
