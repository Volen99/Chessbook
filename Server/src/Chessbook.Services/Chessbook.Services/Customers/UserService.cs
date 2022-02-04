namespace Chessbook.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Globalization;
    using System.Threading.Tasks;

    using Chessbook.Core;
    using Chessbook.Data;
    using Chessbook.Data.Common.Filters;
    using Chessbook.Data.Models;
    using Chessbook.Core.Caching;
    using Chessbook.Core.Domain.Common;
    using Chessbook.Core.Domain.Customers;
    using Chessbook.Services.Common;
    using Chessbook.Services.Customers;
    using Chessbook.Core.Domain.Relationships;

    public class UserService<TUser> : IUserService where TUser : Customer, new()
    {
        private readonly IRepository<CustomerRole> customerRoleRepository;
        private readonly IRepository<Relationship> relationshipRepository;
        private readonly IGenericAttributeService genericAttributeService;
        private readonly IRepository<GenericAttribute> gaRepository;
        private readonly IRepository<Customer> customerRepository;
        private readonly INopDataProvider dataProvider;
        private readonly IStaticCacheManager staticCacheManager;
        private readonly IRepository<CustomerCustomerRoleMapping> customerCustomerRoleMappingRepository;
        private readonly IRepository<CustomerPassword> customerPasswordRepository;

        private Customer _cachedCustomer;

        public UserService(IRepository<Relationship> relationshipRepository,
            IGenericAttributeService genericAttributeService,
             IRepository<Customer> customerRepository,
             IRepository<CustomerRole> customerRoleRepository,
             IStaticCacheManager staticCacheManager,
             IRepository<CustomerCustomerRoleMapping> customerCustomerRoleMappingRepository,
             IRepository<GenericAttribute> gaRepository,
             IRepository<CustomerPassword> customerPasswordRepository,
             INopDataProvider dataProvider)
        {
            this.relationshipRepository = relationshipRepository;
            this.genericAttributeService = genericAttributeService;
            this.customerRepository = customerRepository;
            this.customerRoleRepository = customerRoleRepository;
            this.dataProvider = dataProvider;
            this.staticCacheManager = staticCacheManager;
            this.customerCustomerRoleMappingRepository = customerCustomerRoleMappingRepository;
            this.gaRepository = gaRepository;
            this.customerPasswordRepository = customerPasswordRepository;
        }

        /// <summary>
        /// Gets all customers
        /// </summary>
        /// <param name="createdFromUtc">Created date from (UTC); null to load all records</param>
        /// <param name="createdToUtc">Created date to (UTC); null to load all records</param>
        /// <param name="affiliateId">Affiliate identifier</param>
        /// <param name="vendorId">Vendor identifier</param>
        /// <param name="customerRoleIds">A list of customer role identifiers to filter by (at least one match); pass null or empty list in order to load all customers; </param>
        /// <param name="email">Email; null to load all customers</param>
        /// <param name="username">Username; null to load all customers</param>
        /// <param name="firstName">First name; null to load all customers</param>
        /// <param name="lastName">Last name; null to load all customers</param>
        /// <param name="dayOfBirth">Day of birth; 0 to load all customers</param>
        /// <param name="monthOfBirth">Month of birth; 0 to load all customers</param>
        /// <param name="company">Company; null to load all customers</param>
        /// <param name="phone">Phone; null to load all customers</param>
        /// <param name="zipPostalCode">Phone; null to load all customers</param>
        /// <param name="ipAddress">IP address; null to load all customers</param>
        /// <param name="pageIndex">Page index</param>
        /// <param name="pageSize">Page size</param>
        /// <param name="getOnlyTotalCount">A value in indicating whether you want to load only total number of records. Set to "true" if you don't want to load data from database</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customers
        /// </returns>
        public async Task<IPagedList<Customer>> GetAllCustomersAsync(DateTime? createdFromUtc = null, DateTime? createdToUtc = null,
           int affiliateId = 0, int vendorId = 0, int[] customerRoleIds = null,
           string email = null, string username = null, string firstName = null, string lastName = null,
           int dayOfBirth = 0, int monthOfBirth = 0,
           string company = null, string phone = null, string zipPostalCode = null, string ipAddress = null,
           int pageIndex = 0, int pageSize = int.MaxValue, bool getOnlyTotalCount = false)
        {
            var customers = await this.customerRepository.GetAllPagedAsync(query =>
            {
                if (createdFromUtc.HasValue)
                    query = query.Where(c => createdFromUtc.Value <= c.CreatedOn);

                if (createdToUtc.HasValue)
                    query = query.Where(c => createdToUtc.Value >= c.CreatedOn);

                query = query.Where(c => !c.Deleted);
                query = query.Where(c => c.ScreenName != null); // by mi

                if (customerRoleIds != null && customerRoleIds.Length > 0)
                {
                    query = query.Join(this.customerCustomerRoleMappingRepository.Table, x => x.Id, y => y.CustomerId,
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
                        .Join(this.gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.FirstNameAttribute &&
                                    z.Attribute.Value.Contains(firstName))
                        .Select(z => z.Customer);
                }

                if (!string.IsNullOrWhiteSpace(lastName))
                {
                    query = query
                        .Join(this.gaRepository.Table, x => x.Id, y => y.EntityId,
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
                        .Join(this.gaRepository.Table, x => x.Id, y => y.EntityId,
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
                        .Join(this.gaRepository.Table, x => x.Id, y => y.EntityId,
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
                        .Join(this.gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.DateOfBirthAttribute &&
                                    z.Attribute.Value.Contains(dateOfBirthStr))
                        .Select(z => z.Customer);
                }

                if (!string.IsNullOrWhiteSpace(phone))
                {
                    query = query
                        .Join(this.gaRepository.Table, x => x.Id, y => y.EntityId,
                            (x, y) => new { Customer = x, Attribute = y })
                        .Where(z => z.Attribute.KeyGroup == nameof(Customer) &&
                                    z.Attribute.Key == NopCustomerDefaults.PhoneAttribute &&
                                    z.Attribute.Value.Contains(phone))
                        .Select(z => z.Customer);
                }

                // search by IpAddress
                if (!string.IsNullOrWhiteSpace(ipAddress) && CommonHelper.IsValidIpAddress(ipAddress))
                {
                    query = query.Where(w => w.LastIpAddress == ipAddress);
                }

                query = query.OrderByDescending(c => c.CreatedOn);

                return query;
            }, pageIndex, pageSize, getOnlyTotalCount, false);

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
            return await this.customerRepository.GetByIdAsync(customerId,
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
            return await this.customerRepository.GetByIdsAsync(customerIds, includeDeleted: false);
        }

        /// <summary>
        /// Gets a customer by GUID
        /// </summary>
        /// <param name="customerGuid">Customer GUID</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains a customer
        /// </returns>
        public virtual async Task<Customer> GetCustomerByGuidAsync(Guid customerGuid)
        {
            if (customerGuid == Guid.Empty)
                return null;

            var query = from c in this.customerRepository.Table
                        where c.CustomerGuid == customerGuid
                        orderby c.Id
                        select c;

            var key = this.staticCacheManager.PrepareKeyForShortTermCache(NopCustomerServicesDefaults.CustomerByGuidCacheKey, customerGuid);

            return await this.staticCacheManager.GetAsync(key, async () => await query.FirstOrDefaultAsyncExt());
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

            var query = from cr in this.customerRoleRepository.Table
                        join crm in this.customerCustomerRoleMappingRepository.Table on cr.Id equals crm.CustomerRoleId
                        where crm.CustomerId == customer.Id && (showHidden || cr.Active)
                        select cr.Id;

            var key = this.staticCacheManager.PrepareKeyForShortTermCache(NopCustomerServicesDefaults.CustomerRoleIdsCacheKey, customer, showHidden);

            return await this.staticCacheManager.GetAsync(key, () => query.ToArray());
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

            await this.customerRepository.UpdateAsync(customer, false);
            await this.customerRepository.DeleteAsync(customer);
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

            var query = from c in this.customerRepository.Table
                        orderby c.Id
                        where c.Email == email && !c.Deleted
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

            var key = this.staticCacheManager.PrepareKeyForDefaultCache(NopCustomerServicesDefaults.CustomerBySystemNameCacheKey, systemName);

            var query = from c in this.customerRepository.Table
                        orderby c.Id
                        where c.SystemName == systemName
                        select c;

            var customer = await this.staticCacheManager.GetAsync(key, async () => await query.FirstOrDefaultAsyncExt());

            return customer;
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

            var query = from c in this.customerRepository.Table
                        orderby c.Id
                        where c.ScreenName == username && !c.Deleted
                        select c;

            var customer = await query.FirstOrDefaultAsyncExt();

            return customer;
        }

        public virtual async Task<List<Customer>> ListByUsernames(string[] usernames)
        {
            var query = from c in this.customerRepository.Table
                        orderby c.Id
                        where usernames.Contains(c.ScreenName) && !c.Deleted
                        select c;

            return await query.ToListAsync();
        }

        /// <summary>
        /// Insert a customer
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task InsertCustomerAsync(Customer customer)
        {
            await this.customerRepository.InsertAsync(customer);
        }

        /// <summary>
        /// Updates the customer
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task UpdateCustomerAsync(Customer customer)
        {
            await this.customerRepository.UpdateAsync(customer);
        }


        #region Customer roles

        /// <summary>
        /// Add a customer-customer role mapping
        /// </summary>
        /// <param name="roleMapping">Customer-customer role mapping</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task AddCustomerRoleMappingAsync(CustomerCustomerRoleMapping roleMapping)
        {
            await this.customerCustomerRoleMappingRepository.InsertAsync(roleMapping);
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

            var mapping = await this.customerCustomerRoleMappingRepository.Table
                .SingleOrDefaultAsync(ccrm => ccrm.CustomerId == customer.Id && ccrm.CustomerRoleId == role.Id);

            if (mapping != null)
            {
                await this.customerCustomerRoleMappingRepository.DeleteAsync(mapping);
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

            await this.customerRoleRepository.DeleteAsync(customerRole);
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
            return await this.customerRoleRepository.GetByIdAsync(customerRoleId, cache => default);
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

            var key = this.staticCacheManager.PrepareKeyForDefaultCache(NopCustomerServicesDefaults.CustomerRolesBySystemNameCacheKey, systemName);

            var query = from cr in this.customerRoleRepository.Table
                        orderby cr.Id
                        where cr.SystemName == systemName
                        select cr;

            var customerRole = await this.staticCacheManager.GetAsync(key, async () => await query.FirstOrDefaultAsyncExt());

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
            var key = this.staticCacheManager.PrepareKeyForDefaultCache(NopCustomerServicesDefaults.CustomerRolesAllCacheKey, showHidden);

            var query = from cr in this.customerRoleRepository.Table
                        orderby cr.Name
                        where showHidden || cr.Active
                        select cr;

            var customerRoles = await this.staticCacheManager.GetAsync(key, async () => await query.ToListAsync());

            return customerRoles;
        }

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
            return await IsInCustomerRoleAsync(customer, NopCustomerDefaults.ModeratorsRoleName, onlyActiveCustomerRoles);
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
            return false; // await IsInCustomerRoleAsync(customer, NopCustomerDefaults.VendorsRoleName, onlyActiveCustomerRoles);
        }

        /// <summary>
        /// Updates the customer role
        /// </summary>
        /// <param name="customerRole">Customer role</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task UpdateCustomerRoleAsync(CustomerRole customerRole)
        {
            await this.customerRoleRepository.UpdateAsync(customerRole);
        }

        /// <summary>
        /// Inserts a customer role
        /// </summary>
        /// <param name="customerRole">Customer role</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task InsertCustomerRoleAsync(CustomerRole customerRole)
        {
            await this.customerRoleRepository.InsertAsync(customerRole);
        }

        #endregion
        public async Task Update(Customer user)
        {
            await this.customerRepository.UpdateAsync(user);
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

            return await this.customerRoleRepository.GetAllAsync(query =>
            {
                return from cr in query
                       join crm in this.customerCustomerRoleMappingRepository.Table on cr.Id equals crm.CustomerRoleId
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
            await this.customerPasswordRepository.InsertAsync(customerPassword);
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

            await this.customerRepository.InsertAsync(customer);

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
            var query = this.customerPasswordRepository.Table;

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
            var customers = await this.customerRepository.GetAllPagedAsync(query =>
            {
                query = query.Where(c => !c.Deleted);

                if (customerRoleIds != null && customerRoleIds.Length > 0)
                {
                    query = query.Join(this.customerCustomerRoleMappingRepository.Table, x => x.Id, y => y.CustomerId,
                            (x, y) => new { Customer = x, Mapping = y })
                        .Where(z => customerRoleIds.Contains(z.Mapping.CustomerRoleId))
                        .Select(z => z.Customer)
                        .Distinct();
                }

                var random = CommonHelper.GenerateRandomInteger(0, 100);
                if (random >= 80)
                {
                    query = query.OrderByDescending(c => c.FollowersCount);
                }
                else if (random % 2 == 0)
                {
                    query = query.OrderBy(c => c.CreatedOn);
                }
                else
                {
                    query = query.OrderByDescending(c => c.CreatedOn);
                }


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

        /// <summary>
        /// Formats the customer name
        /// </summary>
        /// <param name="customer">Source</param>
        /// <param name="stripTooLong">Strip too long customer name</param>
        /// <param name="maxLength">Maximum customer name length</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the formatted text
        /// </returns>
        public virtual async Task<string> FormatUsernameAsync(Customer customer, bool stripTooLong = false, int maxLength = 0)
        {
            if (customer == null)
            {
                return string.Empty;
            }

            if (await IsGuestAsync(customer))
            {
                return "Customer.Guest";
            }
            string result = customer.DisplayName;

            if (stripTooLong && maxLength > 0)
            {
                result = CommonHelper.EnsureMaximumLength(result, maxLength);
            }

            return result;
        }

        /// <summary>
        /// Delete guest customer records
        /// </summary>
        /// <param name="createdFromUtc">Created date from (UTC); null to load all records</param>
        /// <param name="createdToUtc">Created date to (UTC); null to load all records</param>
        /// <param name="onlyWithoutShoppingCart">A value indicating whether to delete customers only without shopping cart</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the number of deleted customers
        /// </returns>
        public async Task<int> DeleteGuestCustomersAsync(DateTime? createdFromUtc, DateTime? createdToUtc, bool onlyWithoutShoppingCart)
        {
            var guestRole = await GetCustomerRoleBySystemNameAsync(NopCustomerDefaults.GuestsRoleName);

            var allGuestCustomers = from guest in this.customerRepository.Table
                                    join ccm in this.customerCustomerRoleMappingRepository.Table on guest.Id equals ccm.CustomerId
                                    where ccm.CustomerRoleId == guestRole.Id
                                    select guest;

            var guestsToDelete = from guest in this.customerRepository.Table
                                 join g in allGuestCustomers on guest.Id equals g.Id
                                 select new { CustomerId = guest.Id };

            await using var tmpGuests = await this.dataProvider.CreateTempDataStorageAsync("tmp_guestsToDelete", guestsToDelete);

            // delete guests
            var totalRecordsDeleted = await this.customerRepository.DeleteAsync(c => tmpGuests.Any(tmp => tmp.CustomerId == c.Id));

            // delete attributes     TODO: Check before production if guests have any generic attributes kk
            await this.gaRepository.DeleteAsync(ga => tmpGuests.Any(c => c.CustomerId == ga.EntityId) && ga.KeyGroup == nameof(Customer));

            return totalRecordsDeleted;
        }

        /// <summary>
        /// Check whether password recovery token is valid
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="token">Token to validate</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public async Task<bool> IsPasswordRecoveryTokenValidAsync(Customer customer, string token)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));

            var cPrt = await this.genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.PasswordRecoveryTokenAttribute);
            if (string.IsNullOrEmpty(cPrt))
                return false;

            if (!cPrt.Equals(token, StringComparison.InvariantCultureIgnoreCase))
                return false;

            return true;
        }

        /// <summary>
        /// Check whether password recovery link is expired
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result
        /// </returns>
        public async Task<bool> IsPasswordRecoveryLinkExpiredAsync(Customer customer)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            var generatedDate = await this.genericAttributeService.GetAttributeAsync<DateTime?>(customer, NopCustomerDefaults.PasswordRecoveryTokenDateGeneratedAttribute);
            if (!generatedDate.HasValue)
            {
                return false;
            }

            var daysPassed = (DateTime.UtcNow - generatedDate.Value).TotalDays;
            if (daysPassed > 7)
            {
                return true;
            }

            return false;
        }
    }
}
