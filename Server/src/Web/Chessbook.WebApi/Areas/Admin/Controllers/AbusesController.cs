using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Services.Abuses;
using Chessbook.Services;
using Chessbook.Web.Api.Areas.Admin.Web.Models;
using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Models.Abuses;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [Route("admin/abuses")]
    public class AbusesController : BaseAdminController
    {
        private readonly IUserService userService;
        private readonly IAbuseService abuseService;
        private readonly IAbuseModelFactory abuseModelFactory;

        public AbusesController(IUserService userService, IAbuseService abuseService, IAbuseModelFactory abuseModelFactory)
        {
            this.userService = userService;
            this.abuseService = abuseService;
            this.abuseModelFactory = abuseModelFactory;
        }

        [HttpGet]
        public async Task<IActionResult> ListAbuses([FromQuery] QueryListAbusesAdminModel input)
        {
            var abuses = await this.abuseService.ListAbusesForAdmins(input.Start, input.Count, input.Sort, input.Filter, input.Id, input.Id,
                input.PredefinedReasons, input.AbuseState, input.VideoIs, input.Search, input.SearchReporter, input.SearchReportee, input.SearchVideo);

            if (abuses.TotalCount > 0)
            {
                var models = new List<AbuseModel>();
                foreach (var abuse in abuses)
                {
                    models.Add(await this.abuseModelFactory.PrepareAbuseModel(abuse));
                }

                return this.Ok(new
                {
                    total = abuses.TotalCount,
                    data = models,
                });
            }

            return this.Ok(new
            {
                total = abuses.TotalCount,
                data = abuses,
            });
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> DeleteAbuse(int id)
        {
            var abuseCurrent = await this.abuseService.GetById(id);
            if (abuseCurrent == null)
            {
                return this.NotFound();
            }

            await this.abuseService.DeleteAbuse(abuseCurrent);

            return this.NoContent();
        }

    }
}
