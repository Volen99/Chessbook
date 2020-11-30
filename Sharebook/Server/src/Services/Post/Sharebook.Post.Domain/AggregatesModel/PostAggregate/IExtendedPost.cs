namespace Sharebook.Post.Domain.AggregatesModel.PostAggregate
{
    using Sharebook.Storage.Domain.AggregatesModel.PostAggregate.Entities;

    public interface IExtendedPost
    {
        string Text { get; set; }

        string FullText { get; set; }

        int[] DisplayTextRange { get; set; }

        ITweetEntities LegacyEntities { get; set; }

        ITweetEntities ExtendedEntities { get; set; }
    }
}
