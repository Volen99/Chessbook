namespace WorldFeed.Book.Application.Parameters.ListsClient
{
    using WorldFeed.Book.Application.Parameters.ListsClient.Interfaces;
    using WorldFeed.Common.Public.Parameters;

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
