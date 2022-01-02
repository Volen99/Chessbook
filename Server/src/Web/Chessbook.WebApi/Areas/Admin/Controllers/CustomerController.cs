using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Data.Models;
using Chessbook.Services;
using Chessbook.Web.Api.Areas.Admin.Models.Users;
using Chessbook.Web.Api.Factories;
using Chessbook.Services.Security;

using Chessbook.Common;
using Chessbook.Services.ExportImport;
using Chessbook.Core.Domain.Customers;
using Chessbook.Core;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [Route("admin/users")]
    public class CustomerController : BaseAdminController
    {
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IPermissionService permissionService;
        private readonly IExportManager exportManager;
        private readonly IWorkContext workContext;

        public CustomerController(IUserService customerService, IUserModelFactory userModelFactory,
            IPermissionService permissionService, IExportManager exportManager, IWorkContext workContext)
        {
            this.userService = customerService;
            this.userModelFactory = userModelFactory;
            this.permissionService = permissionService;
            this.exportManager = exportManager;
            this.workContext = workContext;
        }

        [HttpGet]
        [Route("list")]
        public virtual async Task<IActionResult> CustomerList([FromQuery] CustomerSearchModel searchModel)
        {
            if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManageCustomers))
            {
                return this.BadRequest("Admin.AccessDenied.Description");
            }

            // prepare model
            var model = await this.userModelFactory.PrepareCustomerListModelAsync(searchModel);

            return this.Ok(new
            {
                data = model.Data,
                total = model.RecordsTotal,
            });
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetUser(int id)
        {
            if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManageCustomers))
            {
                return this.Forbid();
            }

            // try to get a user with the specified id
            var customer = await this.userService.GetCustomerByIdAsync(id);
            if (customer == null || customer.Deleted)
            {
                return RedirectToAction("List");
            }

            // prepare model
            var model = await this.userModelFactory.PrepareCustomerModelAsync(null, customer);

            return this.Ok(model);
        }

        [HttpPost]
        [Route("edit")]
        public async Task<IActionResult> Edit([FromBody] UserEditInputModel model)
        {
            model.Role = model.Role.Select(id => ++id).ToList(); // coz in da client they start from 0 :(

            if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManageCustomers))
            {
                return this.Unauthorized();
            }

            // try to get a customer with the specified id
            var customer = await this.userService.GetCustomerByIdAsync(model.UserId);
            if (customer == null || customer.Deleted)
            {
                return this.NotFound();
            }

            // validate customer roles
            var allCustomerRoles = await this.userService.GetAllCustomerRolesAsync(true);
            var newCustomerRoles = new List<CustomerRole>();
            foreach (var customerRole in allCustomerRoles)
            {
                if (model.Role.Contains(customerRole.Id))
                {
                    newCustomerRoles.Add(customerRole);
                }
            }

            var customerRolesError = await ValidateCustomerRolesAsync(newCustomerRoles, await this.userService.GetCustomerRolesAsync(customer));

            if (!string.IsNullOrEmpty(customerRolesError))
            {
                return this.BadRequest(customerRolesError);
            }

            // Ensure that valid email address is entered if Registered role is checked to avoid registered customers with empty email address
            if (newCustomerRoles.Any() && newCustomerRoles.FirstOrDefault(c => c.SystemName == NopCustomerDefaults.RegisteredRoleName) != null &&
                !CommonHelper.IsValidEmail(model.Email))
            {
                return this.BadRequest();
            }

            //// custom customer attributes
            //var customerAttributesXml = await ParseCustomCustomerAttributesAsync(form);
            //if (newCustomerRoles.Any() && newCustomerRoles.FirstOrDefault(c => c.SystemName == NopCustomerDefaults.RegisteredRoleName) != null)
            //{
            //    var customerAttributeWarnings = await _customerAttributeParser.GetAttributeWarningsAsync(customerAttributesXml);
            //    foreach (var error in customerAttributeWarnings)
            //    {
            //        ModelState.AddModelError(string.Empty, error);
            //    }
            //}

            if (ModelState.IsValid)
            {
                var currentCustomerRoleIds = await this.userService.GetCustomerRoleIdsAsync(customer, true);

                // customer roles
                foreach (var customerRole in allCustomerRoles)
                {
                    // ensure that the current customer cannot add/remove to/from "Administrators" system role
                    // if he's not an admin himself
                    if (customerRole.SystemName == NopCustomerDefaults.AdministratorsRoleName &&
                        !await this.userService.IsAdminAsync(await this.workContext.GetCurrentCustomerAsync()))
                    {
                        continue;
                    }

                    if (model.Role.Contains(customerRole.Id))
                    {
                        // new role
                        if (currentCustomerRoleIds.All(roleId => roleId != customerRole.Id))
                        {
                            await this.userService.AddCustomerRoleMappingAsync(new CustomerCustomerRoleMapping { CustomerId = customer.Id, CustomerRoleId = customerRole.Id });
                        }
                    }
                    else
                    {
                        //// prevent attempts to delete the administrator role from the user, if the user is the last active administrator
                        //if (customerRole.SystemName == NopCustomerDefaults.AdministratorsRoleName && !await SecondAdminAccountExistsAsync(customer))
                        //{
                        //    _notificationService.ErrorNotification(await _localizationService.GetResourceAsync("Admin.Customers.Customers.AdminAccountShouldExists.DeleteRole"));
                        //    continue;
                        //}

                        // remove role
                        if (currentCustomerRoleIds.Any(roleId => roleId == customerRole.Id))
                        {
                            await this.userService.RemoveCustomerRoleMappingAsync(customer, customerRole);
                        }
                    }
                }

                await this.userService.UpdateCustomerAsync(customer);

                ////activity log
                //await _customerActivityService.InsertActivityAsync("EditCustomer",
                //    string.Format(await _localizationService.GetResourceAsync("ActivityLog.EditCustomer"), customer.Id), customer);

                //_notificationService.SuccessNotification(await _localizationService.GetResourceAsync("Admin.Customers.Customers.Updated"));
            }

            return this.Ok();
        }

        [HttpPost]
        [Route("ban/{id:int}")]
        public async Task<IActionResult> BanUser(int id, [FromBody] string reason)
        {
            var userToBanOrUnban = await this.userService.GetCustomerByIdAsync(id);

            if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManageCustomers))
            {
                return this.Unauthorized();
            }

            await this.ChangeUserBan(userToBanOrUnban, true, reason);

            return this.NoContent();
        }

        [HttpPost]
        [Route("unban/{id:int}")]
        public async Task<IActionResult> UnbanUser(int id, [FromBody] string reason)
        {
            var userToBanOrUnban = await this.userService.GetCustomerByIdAsync(id);

            if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManageCustomers))
            {
                return this.Unauthorized();
            }

            await this.ChangeUserBan(userToBanOrUnban, false, reason);

            return this.NoContent();
        }

        #region Export / Import

        [HttpPost, ActionName("ExportExcel")]
        [Route("export-excel-all")]
        public async Task<IActionResult> ExportExcelAll()
        {
            if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManageCustomers))
            {
                return this.Unauthorized();
            }

            var customers = await this.userService.GetAllCustomersAsync();
            try
            {
                var bytes = await this.exportManager.ExportCustomersToXlsxAsync(customers);
                return File(bytes, MimeTypes.TextXlsx, "customers.xlsx");
            }
            catch (Exception exc)
            {
                //await _notificationService.ErrorNotificationAsync(exc);
                //return RedirectToAction("List");

                return this.BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcelSelected(string selectedIds)
        {
            if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManageCustomers))
            {
                return this.Unauthorized();
            }

            var customers = new List<Customer>();
            if (selectedIds != null)
            {
                var ids = selectedIds
                    .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(x => Convert.ToInt32(x))
                    .ToArray();
                customers.AddRange(await this.userService.GetCustomersByIdsAsync(ids));
            }

            try
            {
                var bytes = await this.exportManager.ExportCustomersToXlsxAsync(customers);
                return File(bytes, MimeTypes.TextXlsx, "users.xlsx");
            }
            catch (Exception exc)
            {
                //await _notificationService.ErrorNotificationAsync(exc);
                //return RedirectToAction("List");

                return this.BadRequest();
            }
        }

        #endregion

        #region Utilities

        /// <returns>A task that represents the asynchronous operation</returns>
        protected async Task<string> ValidateCustomerRolesAsync(IList<CustomerRole> customerRoles, IList<CustomerRole> existingCustomerRoles)
        {
            if (customerRoles == null)
            {
                throw new ArgumentNullException(nameof(customerRoles));
            }

            if (existingCustomerRoles == null)
            {
                throw new ArgumentNullException(nameof(existingCustomerRoles));
            }

            // check ACL permission to manage customer roles
            var rolesToAdd = customerRoles.Except(existingCustomerRoles);
            var rolesToDelete = existingCustomerRoles.Except(customerRoles);
            if (rolesToAdd.Any(role => role.SystemName != NopCustomerDefaults.RegisteredRoleName) || rolesToDelete.Any())
            {
                if (!await this.permissionService.AuthorizeAsync(StandardPermissionProvider.ManageAcl))
                {
                    //return await _localizationService.GetResourceAsync("Admin.Customers.Customers.CustomerRolesManagingError");
                }
            }

            // ensure a customer is not added to both 'Guests' and 'Registered' customer roles
            // ensure that a customer is in at least one required role ('Guests' and 'Registered')
            var isInGuestsRole = customerRoles.FirstOrDefault(cr => cr.SystemName == NopCustomerDefaults.GuestsRoleName) != null;
            var isInRegisteredRole = customerRoles.FirstOrDefault(cr => cr.SystemName == NopCustomerDefaults.RegisteredRoleName) != null;
            if (isInGuestsRole && isInRegisteredRole)
            {
                //return await _localizationService.GetResourceAsync("Admin.Customers.Customers.GuestsAndRegisteredRolesError");
            }
            if (!isInGuestsRole && !isInRegisteredRole)
            {
                //return await _localizationService.GetResourceAsync("Admin.Customers.Customers.AddCustomerToGuestsOrRegisteredRoleError");
            }

            // no errors
            return string.Empty;
        }

        #endregion

        private async Task ChangeUserBan(Customer userToBanOrUnban, bool ban, string reason = null)
        {
            userToBanOrUnban.Banned = ban;
            userToBanOrUnban.BannedReason = reason;

            await this.userService.UpdateCustomerAsync(userToBanOrUnban);
        }
    }
}
