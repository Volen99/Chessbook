namespace Sharebook.Web.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Sharebook.Web.Controllers;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        public virtual async Task<IActionResult> Register(string returnUrl)
        {
            //var result = await this.userManager.CreateAsync(user, model.Password);
            //if (result.Errors.Count() > 0)
            //{
            //    AddErrors(result);
            //    // If we got this far, something failed, redisplay form
            //    return View(model);
            //}

            //var model = new RegisterModel();
            //model = await _customerModelFactory.PrepareRegisterModelAsync(model, false, setDefaultValues: true);

            return this.Ok();

        }
    }
}
