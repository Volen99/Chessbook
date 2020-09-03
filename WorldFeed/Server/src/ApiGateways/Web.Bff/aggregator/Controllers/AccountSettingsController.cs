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
            this.client = new TwitterClient("jaja", "haha");
        }

        [Route("Account/Settings")]
        [HttpGet]
        public async Task<IAccountSettingsDTO> GetAccountSettingsAsync()
        {
            var result = await this.client.AccountSettings.GetAccountSettingsAsync();

            return result.AccountSettingsDTO;
        }

        [Route("Account/Settings")]
        [HttpPost]
        public async Task<IAccountSettingsDTO> UpdateAccountSettingsAsync([FromBody] UpdateAccountSettingsParameters parameters, [FromHeader(Name = "x-requestid")] string requestId)
        {
            var query = this.Request.Query;

            var result = await this.client.AccountSettings.UpdateAccountSettingsAsync(parameters);

            return result.AccountSettingsDTO;
        }
    }
}
