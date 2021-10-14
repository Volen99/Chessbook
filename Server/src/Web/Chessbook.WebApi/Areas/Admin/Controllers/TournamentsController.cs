using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Core;
using Chessbook.Core.Domain.Tournaments;
using Chessbook.Services;
using Chessbook.Services.Tournaments;
using Chessbook.Web.Api.Areas.Admin.Models.Tournaments;

namespace Chessbook.Web.Api.Areas.Admin.Controllers
{
    [Route("admin/tournaments")]
    public class TournamentsController : BaseAdminController
    {
        private readonly IUserService userService;
        private readonly IWorkContext workContext;
        private readonly ITournamentService tournamentService;

        public TournamentsController(IUserService userService, IWorkContext workContext, ITournamentService tournamentService)
        {
            this.userService = userService;
            this.workContext = workContext;
            this.tournamentService = tournamentService;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> ApplyTournamentSubmit([FromBody] TournamentCreateBody body)
        {
            if (!await this.userService.IsRegisteredAsync(await this.workContext.GetCurrentCustomerAsync())
                && !await this.userService.IsAdminAsync(await this.workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            // disabled by default
            var tournament = new Tournament
            {
                Name = body.Name,
                Description = body.Description,
                Date = body.Date,
                Picture = body.Picture,
                DisplayOrder = body.DisplayOrder,
                PlayerCount = body.PlayerCount,
                Status = body.Status,
                Site = body.Site,
                Twitter = body.Twitter,
                Youtube = body.Youtube,
                Facebook = body.Facebook,
            };

            await this.tournamentService.InsertTournamentAsync(tournament);

            return this.Ok();
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

        [HttpPost]
        [Route("edit/{id:int}")]
        public async Task<IActionResult> Edit(int id, [FromBody] TournamentCreateBody body)
        {
            if (!await this.userService.IsRegisteredAsync(await this.workContext.GetCurrentCustomerAsync())
               && !await this.userService.IsAdminAsync(await this.workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            // try to get a tournament with the specified id
            var tournament = await this.tournamentService.GetTournamentByIdAsync(id);
            if (tournament == null)
            {
                return this.NotFound();
            }

            tournament.Name = body.Name;
            tournament.Description = body.Description;
            tournament.Date = body.Date;
            tournament.Picture = body.Picture;
            tournament.DisplayOrder = body.DisplayOrder;
            tournament.PlayerCount = body.PlayerCount;
            tournament.Status = body.Status;
            tournament.Site = body.Site;
            tournament.Twitter = body.Twitter;
            tournament.Youtube = body.Youtube;
            tournament.Facebook = body.Facebook;

            await this.tournamentService.UpdateTournamentAsync(tournament);

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
            var tournament = await this.tournamentService.GetTournamentByIdAsync(id);
            if (tournament == null)
            {
                return this.NotFound();
            }

            await this.tournamentService.DeleteTournamentAsync(tournament);

            return this.NoContent();
        }
    }
}
