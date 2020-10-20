namespace Sharebook.Upload.Domain.AggregatesModel.PostAggregate.Entities
{
    public interface IUserEntities
    {
        /// <summary>
        /// Website metadata
        /// </summary>
        IWebsiteEntity Website { get; set; }

        /// <summary>
        /// User description
        /// </summary>
        IDescriptionEntity Description { get; set; }
    }
}
