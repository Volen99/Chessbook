namespace WorldFeed.Identity.API.Client.Tools
{
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Models;
    using WorldFeed.Common.Public.Models.RateLimits;
    using WorldFeed.Identity.API.DTO;
    using WorldFeed.Identity.API.Infrastructure.Inject;
    using WorldFeed.Identity.API.Models;
    using WorldFeed.Identity.API.Models.Authentication;
    using WorldFeed.Identity.Domain.AggregatesModel.UserAggregate;

    public class TwitterClientFactories : ITwitterClientFactories
    {
        private readonly ITwitterClient client;
        private readonly IJsonObjectConverter jsonObjectConverter;

        public TwitterClientFactories(ITwitterClient client, IJsonObjectConverter jsonObjectConverter)
        {
            this.client = client;
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public IAccountSettings CreateAccountSettings(IAccountSettingsDTO dto)
        {
            if (dto == null)
            {
                return null;
            }

            return new AccountSettings(dto);
        }

        public IUser CreateUser(string json)
        {
            var tweetDTO = this.jsonObjectConverter.Deserialize<IUserDTO>(json);
            return CreateUser(tweetDTO);
        }

        public IUser CreateUser(IUserDTO userDTO)
        {
            if (userDTO == null)
            {
                return null;
            }

            return new User(userDTO, this.client);
        }

        public IUser[] CreateUsers(IEnumerable<IUserDTO> usersDTO)
        {
            return usersDTO?.Select(CreateUser).ToArray();
        }

        public IAuthenticatedUser CreateAuthenticatedUser(string json)
        {
            var tweetDTO = this.jsonObjectConverter.Deserialize<IUserDTO>(json);
            return CreateAuthenticatedUser(tweetDTO);
        }

        public IAuthenticatedUser CreateAuthenticatedUser(IUserDTO userDTO)
        {
            if (userDTO == null)
            {
                return null;
            }

            return new AuthenticatedUser(userDTO, this.client);
        }

        public ICredentialsRateLimits CreateRateLimits(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<CredentialsRateLimitsDTO>(json);
            return CreateRateLimits(dto);
        }

        public ICredentialsRateLimits CreateRateLimits(CredentialsRateLimitsDTO dto)
        {
            if (dto == null)
            {
                return null;
            }

            return new CredentialsRateLimits(dto);
        }

       
        public IAccountSettings CreateAccountSettings(string json)
        {
            var accountSettingsDTO = this.jsonObjectConverter.Deserialize<IAccountSettingsDTO>(json);

            if (accountSettingsDTO == null)
            {
                return null;
            }

            return new AccountSettings(accountSettingsDTO);
        }

        public ITwitterCredentials CreateTwitterCredentials(string json)
        {
            return this.jsonObjectConverter.Deserialize<TwitterCredentials>(json);
        }

        public IConsumerOnlyCredentials CreateConsumerCredentials(string json)
        {
            return this.jsonObjectConverter.Deserialize<ConsumerOnlyCredentials>(json);
        }
    }
}
