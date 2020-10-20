namespace Sharebook.Post.Helpers
{
    using System.Collections.Generic;
    using System.Linq;

    using Sharebook.Common.Public.Models.Interfaces.DTO;

    public interface ITweetHelper
    {
        long GetOldestTweetId(IEnumerable<ITweetDTO> tweetDTOs);
    }

    public class TweetHelper : ITweetHelper
    {
        public long GetOldestTweetId(IEnumerable<ITweetDTO> tweetDTOs)
        {
            return long.Parse(tweetDTOs.Min(x => x.IdStr));
        }
    }
}
