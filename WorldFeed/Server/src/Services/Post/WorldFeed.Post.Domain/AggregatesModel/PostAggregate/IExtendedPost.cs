namespace WorldFeed.Post.Domain.AggregatesModel.PostAggregate
{
    using WorldFeed.Upload.Domain.AggregatesModel.PostAggregate.Entities;

    public interface IExtendedPost
    {
        string Text { get; set; }

        string FullText { get; set; }

        int[] DisplayTextRange { get; set; }

        ITweetEntities LegacyEntities { get; set; }

        ITweetEntities ExtendedEntities { get; set; }
    }
}
