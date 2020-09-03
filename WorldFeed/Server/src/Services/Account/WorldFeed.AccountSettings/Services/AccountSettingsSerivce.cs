namespace WorldFeed.AccountSettings.Services
{
    using System;
    using System.Threading.Tasks;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.DTO;
    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.AccountSettings.Data;

    using TimeZone = Common.Models.Properties.TimeZone;

    public class AccountSettingsSerivce : IAccountSettingsSerivce
    {
        private readonly AccountSettingsContext context;        // TODO: implement repository pattern

        public AccountSettingsSerivce(AccountSettingsContext context)
        {
            this.context = context;
        }

        public async Task<IAccountSettingsDTO> GetAccountSettingsAsync(string userId)
        {
            var accountCurrent = await this.context.Accounts.Where(a => a.UserId == userId).FirstOrDefaultAsync();

            if (accountCurrent == null)
            {
                return null;
            }

            // TODO: Use automapper
            var accountSettings = new AccountSettingsDTO()
            {
                AlwaysUseHttps = accountCurrent.AlwaysUseHttps,
                DiscoverableByEmail = accountCurrent.DiscoverableByEmail,
                GeoEnabled = accountCurrent.GeoEnabled,
                Language = accountCurrent.Language,                // Enum.Parse<Language>(accountCurrent.Language.GetDisplayName()),
                PrivacyMode = accountCurrent.PrivacyMode,          // (PrivacyMode)Enum.ToObject(typeof(PrivacyMode), 1),
                ScreenName = accountCurrent.ScreenName,
                TimeZone = new TimeZone
                {
                    Name = accountCurrent.TimeZone.Name,
                    TzinfoName = accountCurrent.TimeZone.TzinfoName,
                    UtcOffset = accountCurrent.TimeZone.UtcOffset,
                },
                TrendLocations = new[]
               {
                    new TrendLocation
                    {
                        Country = accountCurrent.Language.GetDisplayName(),
                        CountryCode = accountCurrent.Language.GetLanguageCode(),
                        Name = accountCurrent.TrendLocations.FirstOrDefault()?.Name,
                        ParentId = 23424977,
                        PlaceType = PlaceType.Town,
                        Url = "http://where.yahooapis.com/v1/place/2357024",
                        WoeId = 2357024,
                    },
                },
                UseCookiePersonalization = accountCurrent.UseCookiePersonalization,
                AllowContributorRequest = Enum.Parse<AllowContributorRequestMode>("All"),
            };

            return accountSettings;
        }
    }
}
