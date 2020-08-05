namespace WorldFeed.Common.Public.Parameters.ListsClient
{
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Parameters.ListsClient.Interfaces;

    public class ListMetadataParameters : CustomRequestParameters, IListMetadataParameters
    {
        public ListMetadataParameters()
        {
        }

        public ListMetadataParameters(IListMetadataParameters parameters)
        {
            Name = parameters?.Name;
            Description = parameters?.Description;
            PrivacyMode = parameters?.PrivacyMode;
        }

        /// <inheritdoc />
        public string Name { get; set; }

        /// <inheritdoc />
        public string Description { get; set; }

        /// <inheritdoc />
        public PrivacyMode? PrivacyMode { get; set; }
    }
}
