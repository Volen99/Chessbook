namespace Sharebook.Post.DTO
{
    using Sharebook.Common.Public.Models.Entities;
    public interface IExtendedTweet
    {
        string Text { get; set; }

        string FullText { get; set; }

        int[] DisplayTextRange { get; set; }

        ITweetEntities LegacyEntities { get; set; }

        ITweetEntities ExtendedEntities { get; set; }
    }
}
