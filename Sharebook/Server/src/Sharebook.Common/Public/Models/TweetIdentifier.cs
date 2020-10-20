namespace Sharebook.Common.Public.Models
{
    using System.Globalization;

    using Sharebook.Common.Public.Models.Interfaces;

    public class TweetIdentifier : ITweetIdentifier
    {
        public TweetIdentifier(long tweetId)
        {
            Id = tweetId;
            IdStr = tweetId.ToString(CultureInfo.InvariantCulture);
        }

        public long Id { get; set; }
        public string IdStr { get; set; }

        public override string ToString()
        {
            return IdStr ?? Id.ToString();
        }
    }
}
