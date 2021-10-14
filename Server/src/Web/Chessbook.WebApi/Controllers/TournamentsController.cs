using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Services.Tournaments;

namespace Chessbook.Web.Api.Controllers
{
    [Route("tournaments")]
    public class TournamentsController : BaseApiController
    {
        private readonly ITournamentService tournamentService;

        public TournamentsController(ITournamentService tournamentService)
        {
            this.tournamentService = tournamentService;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetTournaments()
        {
            var model = await this.tournamentService.GetAllTournamentsAsync();

            return this.Ok(new
            {
                data = model,
                total = model.TotalCount,
            });
        }
    }
}
