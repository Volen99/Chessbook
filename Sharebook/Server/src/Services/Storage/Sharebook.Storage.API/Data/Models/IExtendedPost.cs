using Sharebook.Storage.API.Data.Models.TwitterEntities;

namespace Sharebook.Storage.API.Data.Models
{

    public interface IExtendedPost
    {
        string Text { get; set; }

        string FullText { get; set; }

        int[] DisplayTextRange { get; set; }

        TweetEntities LegacyEntities { get; set; }

        TweetEntities ExtendedEntities { get; set; }
    }
}
