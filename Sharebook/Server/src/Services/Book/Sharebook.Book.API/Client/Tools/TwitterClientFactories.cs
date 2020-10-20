namespace Sharebook.Book.Client.Tools
{
    using System.Collections.Generic;
    using System.Linq;

    using Sharebook.Book.DTO;
    using Sharebook.Book.Models;
    using Sharebook.Common.Helpers;

    public class TwitterClientFactories : ITwitterClientFactories
    {
        private readonly ITwitterClient client;
        private readonly IJsonObjectConverter jsonObjectConverter;

        public TwitterClientFactories(ITwitterClient client, IJsonObjectConverter jsonObjectConverter)
        {
            this.client = client;
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public ITwitterList CreateTwitterList(string json)
        {
            var listDTO = this.jsonObjectConverter.Deserialize<ITwitterListDTO>(json);
            return CreateTwitterList(listDTO);
        }

        public ITwitterList CreateTwitterList(ITwitterListDTO twitterListDTO)
        {
            if (twitterListDTO == null)
            {
                return null;
            }

            return new TwitterList(twitterListDTO, this.client);
        }

        public ITwitterList[] CreateTwitterLists(IEnumerable<ITwitterListDTO> listDTOs)
        {
            return listDTOs?.Select(CreateTwitterList).ToArray();
        }
    }
}
