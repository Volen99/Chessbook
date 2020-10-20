namespace Sharebook.Post.API.Client
{
    using Sharebook.Post.Client.Requesters;

    public interface IRawExecutors
    {
        /// <summary>
        /// Client to execute all actions related with timelines
        /// </summary>
        ITimelinesRequester Timelines { get; }

        /// <summary>
        /// Client to execute all actions related with tweets
        /// </summary>
        ITweetsRequester Tweets { get; }
    }
}