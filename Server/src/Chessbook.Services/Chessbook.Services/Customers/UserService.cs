namespace Chessbook.Services
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;
    using Chessbook.Core;
    using Chessbook.Data;
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
    using Nop.Core;
    using Nop.Core.Caching;
    using Nop.Core.Domain.Common;
    using Nop.Core.Domain.Customers;
    using Nop.Services.Common;
    using Nop.Services.Customers;

    public class UserService<TUser> : BaseService, IUserService where TUser : Customer, new()
    {
        private readonly IRepository<CustomerRole> _customerRoleRepository;

        private readonly IRepository<Relationship> relationshipRepository;
        private readonly IGenericAttributeService _genericAttributeService;
        private readonly IRepository<GenericAttribute> _gaRepository;
        private readonly IRepository<Customer> _customerRepository;
        private readonly IStaticCacheManager _staticCacheManager;
        private readonly IRepository<CustomerCustomerRoleMapping> _customerCustomerRoleMappingRepository;
        private readonly IRepository<CustomerPassword> _customerPasswordRepository;

        private Customer _cachedCustomer;

        public UserService(ICurrentContextProvider contextProvider,
            IRepository<Relationship> relationshipRepository,
            IGenericAttributeService genericAttributeService,
             IRepository<Customer> customerRepository,
             IRepository<CustomerRole> customerRoleRepository,
             IStaticCacheManager staticCacheManager,
             IRepository<CustomerCustomerRoleMapping> customerCustomerRoleMappingRepository,
             IRepository<GenericAttribute> gaRepository,
             IRepository<CustomerPassword> customerPasswordRepository) : base(contextProvider)
        {
            this.relationshipRepository = relationshipRepository;
            this._genericAttributeService = genericAttributeService;
            this._customerRepository = customerRepository;
            this._customerRoleRepository = customerRoleRepository;
            this._staticCacheManager = staticCacheManager;
            this._customerCustomerRoleMappingRepository = customerCustomerRoleMappingRepository;
            _gaRepository = gaRepository;
            _customerPasswordRepository = customerPasswordRepository;
        }

        //public async Task<GridData<UserDTO>> GetDataForGrid(UsersGridFilter filter, bool includeDeleted = false)
        //{
        //    var tuple = await userRepository.GetFilteredListWithTotalCount(filter, Session, includeDeleted);

        //    return new GridData<UserDTO>
        //    {
        //        Items = tuple.Item1.MapTo<IEnumerable<UserDTO>>(),
        //        TotalCount = tuple.Item2
        //    };
        //}

        //public async Task<bool> Delete(int id)
        //{
        //    await userRepository.Delete(id, Session);
        //    return true;
        //}




        public virtual async Task<IPagedList<Customer>> GetAllCustomersAsync(DateTime? createdFromUtc = null, DateTime? createdToUtc = null,
           int affiliateId = 0, int vendorId = 0, int[] customerRoleIds = null,
           string email = null, string username = null, string firstName = null, string lastName = null,
           int dayOfBirth = 0, int monthOfBirth = 0,
           string company = null, string phone = null, string zipPostalCode = null, string ipAddress = null,
           int pageIndex = 0, int pageSize = int.MaxValue, bool getOnlyTotalCount = false)
        {
            var customers = await _customerRepository.GetAllPagedAsync(query =>
            {
                if (createdFromUtc.HasValue)
                    query = query.Where(c => createdFromUtc.Value <= c.CreatedOn);
                if (createdToUtc.HasValue)
                    query = query.Where(c => createdToUtc.Value >= c.CreatedOn);
                //if (affiliateId > 0)
                //    query = query.Where(c => affiliateId == c.AffiliateId);
                //if (vendorId > 0)
                //    query = query.Where(c => vendorId == c.VendorId);

                query = query.Where(c => !c.Deleted);

                if (customerRoleIds != null && customerRoleIds.Length > 0)
                {
                    query = query.Join(_customerCustomerRoleMappingRepository.Table, x => x.Id, y => y.CustomerId,
                            (x, y) => new { Customer = x, Mapping = y })
                        .Where(z => customerRoleIds.Contains(z.Mapping.CustomerRoleId))
                        .Select(z => z.Customer)
                        .Distinct();
                }

                if (!string.IsNullOrWhiteSpace(email))
                    query = query.Where(c => c.Email.Contains(email));
                if (!string.IsNullOrWhiteSpace(username))
                    query = query.Where(c => c.ScreenName.Contains(username));
                if (!string.IsNullOrWhiteSpace(firstName))
                {
                    query = query
                        .Join(_gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.FirstNameAttribute &&
                                    z.Attribute.Value.Contains(firstName))
                        .Select(z => z.Customer);
                }

                if (!string.IsNullOrWhiteSpace(lastName))
                {
                    query = query
                        .Join(_gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.LastNameAttribute &&
                                    z.Attribute.Value.Contains(lastName))
                        .Select(z => z.Customer);
                }

                //date of birth is stored as a string into database.
                //we also know that date of birth is stored in the following format YYYY-MM-DD (for example, 1983-02-18).
                //so let's search it as a string
                if (dayOfBirth > 0 && monthOfBirth > 0)
                {
                    //both are specified
                    var dateOfBirthStr = monthOfBirth.ToString("00", CultureInfo.InvariantCulture) + "-" +
                                         dayOfBirth.ToString("00", CultureInfo.InvariantCulture);

                    //z.Attribute.Value.Length - dateOfBirthStr.Length = 5
                    //dateOfBirthStr.Length = 5
                    query = query
                        .Join(_gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.DateOfBirthAttribute &&
                                    z.Attribute.Value.Substring(5, 5) == dateOfBirthStr)
                        .Select(z => z.Customer);
                }
                else if (dayOfBirth > 0)
                {
                    //only day is specified
                    var dateOfBirthStr = dayOfBirth.ToString("00", CultureInfo.InvariantCulture);

                    //z.Attribute.Value.Length - dateOfBirthStr.Length = 8
                    //dateOfBirthStr.Length = 2
                    query = query
                        .Join(_gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.DateOfBirthAttribute &&
                                    z.Attribute.Value.Substring(8, 2) == dateOfBirthStr)
                        .Select(z => z.Customer);
                }
                else if (monthOfBirth > 0)
                {
                    //only month is specified
                    var dateOfBirthStr = "-" + monthOfBirth.ToString("00", CultureInfo.InvariantCulture) + "-";
                    query = query
                        .Join(_gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.DateOfBirthAttribute &&
                                    z.Attribute.Value.Contains(dateOfBirthStr))
                        .Select(z => z.Customer);
                }

                //search by company
                if (!string.IsNullOrWhiteSpace(company))
                {
                    query = query
                        .Join(_gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.CompanyAttribute &&
                                    z.Attribute.Value.Contains(company))
                        .Select(z => z.Customer);
                }

                //search by phone
                if (!string.IsNullOrWhiteSpace(phone))
                {
                    query = query
                        .Join(_gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.PhoneAttribute &&
                                    z.Attribute.Value.Contains(phone))
                        .Select(z => z.Customer);
                }

                //search by zip
                if (!string.IsNullOrWhiteSpace(zipPostalCode))
                {
                    query = query
                        .Join(_gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.ZipPostalCodeAttribute &&
                                    z.Attribute.Value.Contains(zipPostalCode))
                        .Select(z => z.Customer);
                }

                //search by IpAddress
                if (!string.IsNullOrWhiteSpace(ipAddress) && CommonHelper.IsValidIpAddress(ipAddress))
                {
                    query = query.Where(w => w.LastIpAddress == ipAddress);
                }

                query = query.OrderByDescending(c => c.CreatedOn);

                return query;
            }, pageIndex, pageSize, getOnlyTotalCount);

            return customers;
        }


        /// <summary>
        /// Gets a customer
        /// </summary>
        /// <param name="customerId">Customer identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains a customer
        /// </returns>
        public virtual async Task<Customer> GetCustomerByIdAsync(int customerId)
        {
            return await _customerRepository.GetByIdAsync(customerId,
                cache => cache.PrepareKeyForShortTermCache(NopEntityCacheDefaults<Customer>.ByIdCacheKey, customerId));
        }

        /// <summary>
        /// Get customers by identifiers
        /// </summary>
        /// <param name="customerIds">Customer identifiers</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customers
        /// </returns>
        public virtual async Task<IList<Customer>> GetCustomersByIdsAsync(int[] customerIds)
        {
            return await _customerRepository.GetByIdsAsync(customerIds, includeDeleted: false);
        }


        /// <summary>
        /// Get customer role identifiers
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="showHidden">A value indicating whether to load hidden records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer role identifiers
        /// </returns>
        public virtual async Task<int[]> GetCustomerRoleIdsAsync(Customer customer, bool showHidden = false)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            var query = from cr in _customerRoleRepository.Table
                        join crm in _customerCustomerRoleMappingRepository.Table on cr.Id equals crm.CustomerRoleId
                        where crm.CustomerId == customer.Id && (showHidden || cr.Active)
                        select cr.Id;

            var key = _staticCacheManager.PrepareKeyForShortTermCache(NopCustomerServicesDefaults.CustomerRoleIdsCacheKey, customer, showHidden);

            return await _staticCacheManager.GetAsync(key, () => query.ToArray());
        }



        /// <summary>
        /// Delete a customer
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task DeleteCustomerAsync(Customer customer)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            if (customer.IsSystemAccount)
            {
                throw new NopException($"System customer account ({customer.SystemName}) could not be deleted");
            }

            customer.Deleted = true;

            if (false) // _customerSettings.SuffixDeletedCustomers
            {
                if (!string.IsNullOrEmpty(customer.Email))
                {
                    customer.Email += "-DELETED";
                }
                if (!string.IsNullOrEmpty(customer.ScreenName))
                {
                    customer.ScreenName += "-DELETED";
                }
            }

            await _customerRepository.UpdateAsync(customer, false);
            await _customerRepository.DeleteAsync(customer);
        }

        /// <summary>
        /// Get customer by email
        /// </summary>
        /// <param name="email">Email</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer
        /// </returns>
        public virtual async Task<Customer> GetCustomerByEmailAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return null;
            }

            var query = from c in _customerRepository.Table
                        orderby c.Id
                        where c.Email == email
                        select c;

            var customer = await query.FirstOrDefaultAsyncExt();

            return customer;
        }

        public virtual async Task<Customer> GetOrCreateBackgroundTaskUserAsync()
        {
            var backgroundTaskUser = await GetCustomerBySystemNameAsync(NopCustomerDefaults.BackgroundTaskCustomerName);

            if (backgroundTaskUser is null)
            {
                //If for any reaso  n the system user isn't in the database, then we add it
                backgroundTaskUser = new Customer
                {
                    Email = "builtin@background-task-record.com",
                    Active = true,
                    IsSystemAccount = true,
                    SystemName = NopCustomerDefaults.BackgroundTaskCustomerName,
                    CreatedOn = DateTime.UtcNow,
                    LastActivityDateUtc = DateTime.UtcNow,
                };

                await InsertCustomerAsync(backgroundTaskUser);

                var guestRole = await GetCustomerRoleBySystemNameAsync(NopCustomerDefaults.GuestsRoleName);

                if (guestRole is null)
                    throw new NopException("'Guests' role could not be loaded");

                await AddCustomerRoleMappingAsync(new CustomerCustomerRoleMapping { CustomerRoleId = guestRole.Id, CustomerId = backgroundTaskUser.Id });
            }

            return backgroundTaskUser;
        }

        /// <summary>
        /// Get customer by system name
        /// </summary>
        /// <param name="systemName">System name</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer
        /// </returns>
        public virtual async Task<Customer> GetCustomerBySystemNameAsync(string systemName)
        {
            if (string.IsNullOrWhiteSpace(systemName))
                return null;

            var key = _staticCacheManager.PrepareKeyForDefaultCache(NopCustomerServicesDefaults.CustomerBySystemNameCacheKey, systemName);

            var query = from c in _customerRepository.Table
                        orderby c.Id
                        where c.SystemName == systemName
                        select c;

            var customer = await _staticCacheManager.GetAsync(key, async () => await query.FirstOrDefaultAsyncExt());

            return customer;
        }

        //public async Task<UserDTO> Edit(UserDTO dto)
        //{
        //    var user = dto.MapTo<TUser>();
        //    await userRepository.Edit(user, Session);
        //    return user.MapTo<UserDTO>();
        //}

        //public async Task<byte[]> GetUserPhoto(int userId)
        //{
        //    var photoContent = await userPhotoRepository.Get(userId, Session);
        //    return photoContent?.Image;
        //}

        //public async Task<UserDTO> GetById(int id, bool includeDeleted = false)
        //{
        //    var user = await userRepository.Get(id, Session, includeDeleted);
        //    return user.MapTo<UserDTO>();
        //}

        //public async Task<User> GetByIdClean(int id, bool includeDeleted = false)
        //{
        //    var user = await userRepository.Get(id, Session, includeDeleted);
        //    return user;
        //}

        //public async Task<UserDTO> GetByLogin(string login, bool includeDeleted = false)
        //{
        //    var user = await userRepository.GetByLogin(login, Session, includeDeleted);
        //    return user.MapTo<UserDTO>();
        //}

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

        /// <summary>
        /// Get customer by username
        /// </summary>
        /// <param name="username">Username</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer
        /// </returns>
        public virtual async Task<Customer> GetCustomerByUsernameAsync(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return null;
            }

            var query = from c in _customerRepository.Table
                        orderby c.Id
                        where c.ScreenName == username
                        select c;

            var customer = await query.FirstOrDefaultAsyncExt();

            return customer;
        }

        /// <summary>
        /// Insert a customer
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task InsertCustomerAsync(Customer customer)
        {
            await _customerRepository.InsertAsync(customer);
        }

        /// <summary>
        /// Updates the customer
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task UpdateCustomerAsync(Customer customer)
        {
            await _customerRepository.UpdateAsync(customer);
        }


        #region Customer roles

        /// <summary>
        /// Add a customer-customer role mapping
        /// </summary>
        /// <param name="roleMapping">Customer-customer role mapping</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task AddCustomerRoleMappingAsync(CustomerCustomerRoleMapping roleMapping)
        {
            await _customerCustomerRoleMappingRepository.InsertAsync(roleMapping);
        }

        /// <summary>
        /// Remove a customer-customer role mapping
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="role">Customer role</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task RemoveCustomerRoleMappingAsync(Customer customer, CustomerRole role)
        {
            if (customer is null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            if (role is null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            var mapping = await _customerCustomerRoleMappingRepository.Table
                .SingleOrDefaultAsync(ccrm => ccrm.CustomerId == customer.Id && ccrm.CustomerRoleId == role.Id);

            if (mapping != null)
            {
                await _customerCustomerRoleMappingRepository.DeleteAsync(mapping);
            }
        }

        /// <summary>
        /// Delete a customer role
        /// </summary>
        /// <param name="customerRole">Customer role</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task DeleteCustomerRoleAsync(CustomerRole customerRole)
        {
            if (customerRole == null)
            {
                throw new ArgumentNullException(nameof(customerRole));
            }

            if (customerRole.IsSystemRole)
            {
                throw new NopException("System role could not be deleted");
            }

            await _customerRoleRepository.DeleteAsync(customerRole);
        }

        /// <summary>
        /// Gets a customer role
        /// </summary>
        /// <param name="customerRoleId">Customer role identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer role
        /// </returns>
        public virtual async Task<CustomerRole> GetCustomerRoleByIdAsync(int customerRoleId)
        {
            return await _customerRoleRepository.GetByIdAsync(customerRoleId, cache => default);
        }

        /// <summary>
        /// Gets a customer role
        /// </summary>
        /// <param name="systemName">Customer role system name</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer role
        /// </returns>
        public virtual async Task<CustomerRole> GetCustomerRoleBySystemNameAsync(string systemName)
        {
            if (string.IsNullOrWhiteSpace(systemName))
            {
                return null;
            }

            var key = _staticCacheManager.PrepareKeyForDefaultCache(NopCustomerServicesDefaults.CustomerRolesBySystemNameCacheKey, systemName);

            var query = from cr in _customerRoleRepository.Table
                        orderby cr.Id
                        where cr.SystemName == systemName
                        select cr;

            var customerRole = await _staticCacheManager.GetAsync(key, async () => await query.FirstOrDefaultAsyncExt());

            return customerRole;
        }

        /// <summary>
        /// Gets all customer roles
        /// </summary>
        /// <param name="showHidden">A value indicating whether to show hidden records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer roles
        /// </returns>
        public virtual async Task<IList<CustomerRole>> GetAllCustomerRolesAsync(bool showHidden = false)
        {
            var key = _staticCacheManager.PrepareKeyForDefaultCache(NopCustomerServicesDefaults.CustomerRolesAllCacheKey, showHidden);

            var query = from cr in _customerRoleRepository.Table
                        orderby cr.Name
                        where showHidden || cr.Active
                        select cr;

            var customerRoles = await _staticCacheManager.GetAsync(key, async () => await query.ToListAsync());

            return customerRoles;
        }

        ///// <summary>
        ///// Gets a value indicating whether customer is in a certain customer role
        ///// </summary>
        ///// <param name="customer">Customer</param>
        ///// <param name="customerRoleSystemName">Customer role system name</param>
        ///// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        ///// <returns>
        ///// A task that represents the asynchronous operation
        ///// The task result contains the result
        ///// </returns>
        //public virtual async Task<bool> IsInCustomerRoleAsync(User customer, string customerRoleSystemName, bool onlyActiveCustomerRoles = true)
        //{
        //    if (customer == null)
        //    {
        //        throw new ArgumentNullException(nameof(customer));
        //    }

        //    if (string.IsNullOrEmpty(customerRoleSystemName))
        //    {
        //        throw new ArgumentNullException(nameof(customerRoleSystemName));
        //    }

        //    var customerRoles = await GetCustomerRolesAsync(customer, !onlyActiveCustomerRoles);

        //    return customerRoles?.Any(cr => cr.SystemName == customerRoleSystemName) ?? false;
        //}

        /// <summary>
        /// Gets a value indicating whether customer is administrator
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<bool> IsAdminAsync(Customer customer, bool onlyActiveCustomerRoles = true)
        {
            return await IsInCustomerRoleAsync(customer, NopCustomerDefaults.AdministratorsRoleName, onlyActiveCustomerRoles);
        }

        /// <summary>
        /// Gets a value indicating whether customer is a forum moderator
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<bool> IsForumModeratorAsync(Customer customer, bool onlyActiveCustomerRoles = true)
        {
            return await IsInCustomerRoleAsync(customer, NopCustomerDefaults.ForumModeratorsRoleName, onlyActiveCustomerRoles);
        }

        /// <summary>
        /// Gets a value indicating whether customer is registered
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<bool> IsRegisteredAsync(Customer customer, bool onlyActiveCustomerRoles = true)
        {
            return await IsInCustomerRoleAsync(customer, NopCustomerDefaults.RegisteredRoleName, onlyActiveCustomerRoles);
        }

        /// <summary>
        /// Gets a value indicating whether customer is guest
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<bool> IsGuestAsync(Customer customer, bool onlyActiveCustomerRoles = true)
        {
            return await IsInCustomerRoleAsync(customer, NopCustomerDefaults.GuestsRoleName, onlyActiveCustomerRoles);
        }

        /// <summary>
        /// Gets a value indicating whether customer is vendor
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<bool> IsVendorAsync(Customer customer, bool onlyActiveCustomerRoles = true)
        {
            return await IsInCustomerRoleAsync(customer, NopCustomerDefaults.VendorsRoleName, onlyActiveCustomerRoles);
        }

        /// <summary>
        /// Updates the customer role
        /// </summary>
        /// <param name="customerRole">Customer role</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task UpdateCustomerRoleAsync(CustomerRole customerRole)
        {
            await _customerRoleRepository.UpdateAsync(customerRole);
        }

        /// <summary>
        /// Inserts a customer role
        /// </summary>
        /// <param name="customerRole">Customer role</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task InsertCustomerRoleAsync(CustomerRole customerRole)
        {
            await _customerRoleRepository.InsertAsync(customerRole);
        }

        #endregion

        //public async Task<(IList<User>, int)> GetAllUsers(UsersGridFilter filter, int userId)
        //{
        //    var users = await this.userRepository.GetFilteredListWithTotalCount(filter, Session);

        //    var loggedinUserRelationships = await this.relationshipRepository.Table.Where(r => r.SourceId == userId).ToListAsync();

        //    var usersModel = new List<User>();
        //    foreach (var user in users.Item1)
        //    {
        //        if (user.Id == userId)
        //        {
        //            continue;
        //        }

        //        var currentRelationship = loggedinUserRelationships.Where(r => r.TargetId == user.Id).FirstOrDefault();

        //        if (currentRelationship == null)
        //        {
        //            usersModel.Add(user);
        //            continue;
        //        }

        //        if (currentRelationship.Following)
        //        {
        //            continue;
        //        }

        //        user.FollowedBy = currentRelationship.FollowedBy; // for who to follow and connect. Usually it is not ok to have this prop in the user

        //        usersModel.Add(user);
        //    }

        //   var tuple = (usersModel, users.Item2);

        //    return tuple;
        //}

        //public async Task<UserDTO> GetByScreenName(string screenName, bool includeDeleted = true)
        //{
        //    var profile = await this.userRepository.GetByLogin(screenName, base.Session);

        //    return profile.MapTo<UserDTO>();
        //}

        ////public async Task SaveAvatarId(int userId, int pictureId)
        ////{
        ////    var user = (await this.userRepository.Get(userId, Session));

        ////    user.ProfilePictureId = pictureId;

        ////    await this.userRepository.Edit(user, Session);
        ////}

        public async Task Update(Customer user)
        {
            await this._customerRepository.UpdateAsync(user);
        }


        /// <summary>
        /// Gets list of customer roles
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="showHidden">A value indicating whether to load hidden records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<IList<CustomerRole>> GetCustomerRolesAsync(Customer customer, bool showHidden = false)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            return await _customerRoleRepository.GetAllAsync(query =>
            {
                return from cr in query
                       join crm in _customerCustomerRoleMappingRepository.Table on cr.Id equals crm.CustomerRoleId
                       where crm.CustomerId == customer.Id &&
                             (showHidden || cr.Active)
                       select cr;
            }, cache => cache.PrepareKeyForShortTermCache(NopCustomerServicesDefaults.CustomerRolesCacheKey, customer, showHidden));

        }

        /// <summary>
        /// Gets a value indicating whether customer is in a certain customer role
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="customerRoleSystemName">Customer role system name</param>
        /// <param name="onlyActiveCustomerRoles">A value indicating whether we should look only in active customer roles</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public virtual async Task<bool> IsInCustomerRoleAsync(Customer customer, string customerRoleSystemName, bool onlyActiveCustomerRoles = true)
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

            return customerRoles?.Any(cr => cr.SystemName == customerRoleSystemName) ?? false;
        }

        /// <summary>
        /// Get current customer password
        /// </summary>
        /// <param name="customerId">Customer identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer password
        /// </returns>
        public virtual async Task<CustomerPassword> GetCurrentPasswordAsync(int customerId)
        {
            if (customerId == 0)
            {
                return null;
            }

            // return the latest password
            return (await GetCustomerPasswordsAsync(customerId, passwordsToReturn: 1)).FirstOrDefault();
        }

        /// <summary>
        /// Insert a customer password
        /// </summary>
        /// <param name="customerPassword">Customer password</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task InsertCustomerPasswordAsync(CustomerPassword customerPassword)
        {
            await _customerPasswordRepository.InsertAsync(customerPassword);
        }

        /// <summary>
        /// Insert a guest customer
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer
        /// </returns>
        public virtual async Task<Customer> InsertGuestCustomerAsync()
        {
            var customer = new Customer
            {
                CustomerGuid = Guid.NewGuid(),
                Active = true,
                CreatedOn = DateTime.UtcNow,
                LastActivityDateUtc = DateTime.UtcNow
            };

            // add to 'Guests' role
            var guestRole = await GetCustomerRoleBySystemNameAsync(NopCustomerDefaults.GuestsRoleName);
            if (guestRole == null)
            {
                throw new NopException("'Guests' role could not be loaded");
            }

            await _customerRepository.InsertAsync(customer);

            await AddCustomerRoleMappingAsync(new CustomerCustomerRoleMapping { CustomerId = customer.Id, CustomerRoleId = guestRole.Id });

            return customer;
        }


        // <summary>
        /// Gets customer passwords
        /// </summary>
        /// <param name="customerId">Customer identifier; pass null to load all records</param>
        /// <param name="passwordFormat">Password format; pass null to load all records</param>
        /// <param name="passwordsToReturn">Number of returning passwords; pass null to load all records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the list of customer passwords
        /// </returns>
        public virtual async Task<IList<CustomerPassword>> GetCustomerPasswordsAsync(int? customerId = null,
            PasswordFormat? passwordFormat = null, int? passwordsToReturn = null)
        {
            var query = _customerPasswordRepository.Table;

            //filter by customer
            if (customerId.HasValue)
                query = query.Where(password => password.CustomerId == customerId.Value);

            //filter by password format
            if (passwordFormat.HasValue)
                query = query.Where(password => password.PasswordFormatId == (int)passwordFormat.Value);

            //get the latest passwords
            if (passwordsToReturn.HasValue)
                query = query.OrderByDescending(password => password.CreatedOnUtc).Take(passwordsToReturn.Value);

            return await query.ToListAsync();
        }

        public async Task<IPagedList<Customer>> GetWhoToFollowUsers(UsersGridFilter filter, int userId, int[] customerRoleIds, bool getOnlyTotalCount)
        {
            var customers = await _customerRepository.GetAllPagedAsync(query =>
            {
                query = query.Where(c => !c.Deleted);

                if (customerRoleIds != null && customerRoleIds.Length > 0)
                {
                    query = query.Join(_customerCustomerRoleMappingRepository.Table, x => x.Id, y => y.CustomerId,
                            (x, y) => new { Customer = x, Mapping = y })
                        .Where(z => customerRoleIds.Contains(z.Mapping.CustomerRoleId))
                        .Select(z => z.Customer)
                        .Distinct();
                }

                query = query.OrderByDescending(c => c.CreatedOn);

                return query;
            }, filter.PageNumber, filter.PageSize, getOnlyTotalCount);


            var loggedinUserRelationships = await this.relationshipRepository.Table.Where(r => r.SourceId == userId).ToListAsync();

            for (int i = 0; i < customers.Count; i++)
            {
                var user = customers[i];
                if (user.Id == userId)
                {
                    customers.Remove(user);
                    i--;
                    continue;
                }

                var currentRelationship = loggedinUserRelationships.Where(r => r.TargetId == user.Id).FirstOrDefault();

                if (currentRelationship == null)
                {
                    continue;
                }

                if (currentRelationship.Following)
                {
                    customers.Remove(user);
                    i--;
                    continue;
                }

                user.FollowedBy = currentRelationship.FollowedBy; // for who to follow and connect. Usually it is not ok to have this prop in the user
            }

            return customers;
        }
    }
}
