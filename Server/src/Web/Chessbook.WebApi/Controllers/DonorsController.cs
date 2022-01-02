using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Services.Donations;

namespace Chessbook.Web.Api.Controllers
{
    [Route("donators")]
    public class DonorsController : BaseApiController
    {
        private readonly IDonatorService donatorService;

        public DonorsController(IDonatorService donatorService)
        {
            this.donatorService = donatorService;
        }

        [HttpGet]
        [Route("list")] 
        public async Task<IActionResult> GetDonors()
        {
            var model = await this.donatorService.GetAllDonatorsAsync();

            return this.Ok(new
            {
                data = model,
                total = model.TotalCount,
            });
        }
    }
}
