namespace WorldFeed.Profile.Client.Tools
{
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Profile.Domain.AggregatesModel.UserAggregate;
    using WorldFeed.Profile.DTO;
    using WorldFeed.Profile.Infrastructure.Inject;
    using WorldFeed.Profile.Models;

    public class TwitterClientFactories : ITwitterClientFactories
    {
        private readonly ITwitterClient client;
        private readonly IJsonObjectConverter jsonObjectConverter;

        public TwitterClientFactories(ITwitterClient client, IJsonObjectConverter jsonObjectConverter)
        {
            this.client = client;
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public IRelationshipState CreateRelationshipState(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<IRelationshipStateDTO>(json);
            return CreateRelationshipState(dto);
        }

        public IRelationshipState CreateRelationshipState(IRelationshipStateDTO relationshipStateDTO)
        {
            return relationshipStateDTO == null ? null : new RelationshipState(relationshipStateDTO);
        }

        public IRelationshipState[] CreateRelationshipStates(IRelationshipStateDTO[] relationshipStateDTOs)
        {
            if (relationshipStateDTOs == null)
            {
                return new IRelationshipState[0];
            }

            return relationshipStateDTOs.Select(dto => this.client.Factories.CreateRelationshipState(dto)).ToArray();
        }

        public IRelationshipDetails CreateRelationshipDetails(string json)
        {
            var dto = this.jsonObjectConverter.Deserialize<IRelationshipDetailsDTO>(json);
            return CreateRelationshipDetails(dto);
        }

        public IRelationshipDetails CreateRelationshipDetails(IRelationshipDetailsDTO dto)
        {
            return dto == null ? null : new RelationshipDetails(dto);
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

        public ITwitterConfiguration CreateTwitterConfiguration(string json)
        {
            return this.jsonObjectConverter.Deserialize<ITwitterConfiguration>(json);
        }
    }
}
