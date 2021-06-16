using Chessbook.Services.Data.Services;
using Chessbook.Web.Api.Areas.Admin.Models.Users;
using Chessbook.Web.Api.Factories;
using Microsoft.AspNetCore.Mvc;
using Nop.Services.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [Route("admin/users")]
    public class CustomerController : BaseAdminController
    {
        private readonly IUserService userService;
        private readonly IUserModelFactory userModelFactory;
        private readonly IPermissionService permissionService;

        public CustomerController(IUserService customerService, IUserModelFactory userModelFactory, IPermissionService permissionService)
        {
            this.userService = customerService;
            this.userModelFactory = userModelFactory;
            this.permissionService = permissionService;
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
    }
}
