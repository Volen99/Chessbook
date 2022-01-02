using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Core;
using Chessbook.Core.Domain.Donations;
using Chessbook.Services;
using Chessbook.Services.Donations;
using Chessbook.Web.Api.Areas.Admin.Models.Donations;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [Route("admin/donators")]
    public class DonatorsController : BaseAdminController
    {
        private readonly IUserService userService;
        private readonly IWorkContext workContext;
        private readonly IDonatorService donatorService;

        public DonatorsController(IUserService userService, IWorkContext workContext, IDonatorService donatorService)
        {
            this.userService = userService;
            this.workContext = workContext;
            this.donatorService = donatorService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> ApplyDonatorSubmit([FromBody] DonatorCreateBody body)
        {
            if (!await this.userService.IsRegisteredAsync(await this.workContext.GetCurrentCustomerAsync())
                && !await this.userService.IsAdminAsync(await this.workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            // disabled by default
            var donator = new Donator
            {
                Name = body.Name,
                Link = body.Link,
                Message = body.Message,
                Type = body.Type,
                CreatedAt = DateTime.UtcNow,
            };

            await this.donatorService.InsertDonatorAsync(donator);

            return this.Ok();
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetDonators()
        {
            var model = await this.donatorService.GetAllDonatorsAsync();

            return this.Ok(new
            {
                data = model,
                total = model.TotalCount,
            });
        }

        [HttpPost]
        [Route("edit/{id:int}")]
        public async Task<IActionResult> Edit(int id, [FromBody] DonatorCreateBody body)
        {
            if (!await this.userService.IsRegisteredAsync(await this.workContext.GetCurrentCustomerAsync())
               && !await this.userService.IsAdminAsync(await this.workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            // try to get a donor with the specified id
            var donor = await this.donatorService.GetDonatorByIdAsync(id);
            if (donor == null)
            {
                return this.NotFound();
            }

            donor.Name = body.Name;
            donor.Link = body.Link;
            donor.Message = body.Message;
            donor.Type = body.Type;
            donor.Col = body.Col;

            await this.donatorService.UpdateDonatorAsync(donor);

            return this.NoContent();
        }

        [HttpPost]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!await this.userService.IsRegisteredAsync(await this.workContext.GetCurrentCustomerAsync())
               && !await this.userService.IsAdminAsync(await this.workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            // try to get a tournament with the specified id
            var tournament = await this.donatorService.GetDonatorByIdAsync(id);
            if (tournament == null)
            {
                return this.NotFound();
            }

            await this.donatorService.DeleteDonatorAsync(tournament);

            return this.NoContent();
        }
    }
}
