namespace WorldFeed.Identity.API.Models.AccountViewModels.Settings
{
    /// <summary>
    /// https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/manage-account-settings/api-reference/post-account-settings
    /// </summary>
    public class SleepTime
    {
        public bool Enabled { get; set; }

        public int EndTime { get; set; }

        public string StartTime { get; set; }
    }
}
