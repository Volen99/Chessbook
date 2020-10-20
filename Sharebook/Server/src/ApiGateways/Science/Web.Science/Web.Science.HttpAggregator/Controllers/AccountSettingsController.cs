namespace Web.HttpAggregator.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using WorldFeed;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Parameters.AccountSettingsClient;

    public class AccountSettingsController : ControllerBase
    {
        private readonly ITwitterClient client;

        public AccountSettingsController()
        {
            this.client = new TwitterClient("", "");
        }

        [HttpPost]
        [Route("Account/Settings")]
        public async Task<IAccountSettingsDTO> UpdateAccountSettingsAsync([FromBody] IUpdateAccountSettingsParameters parameters)
        {
            // var parameters = new UpdateAccountSettingsParameters();

            var result = await this.client.AccountSettings.UpdateAccountSettingsAsync(parameters);

            return result.AccountSettingsDTO;
        }
    }
}
