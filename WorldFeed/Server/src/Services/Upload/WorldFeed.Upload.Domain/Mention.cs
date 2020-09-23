namespace WorldFeed.Upload.Domain
{
    using WorldFeed.Common.Settings;
    using WorldFeed.Upload.Domain.AggregatesModel.TweetAggregate;

    public class Mention // : Tweet
    {
        //public Mention(ITweetDTO tweetDTO, TweetMode? tweetMode, ITwitterClient client)
        //    : base(tweetDTO, tweetMode, client)
        //{
        //    // Default constructor inheriting from the default Tweet constructor
        //}

        public string Annotations { get; set; }
    }
}
