namespace WorldFeed.Post.API.Controllers.Timeline
{
    using System.Text;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.QueryGenerators.User;
    using WorldFeed.Common.Settings;
    using WorldFeed.Post.Application.Parameters.TimelineClient;
    using WorldFeed.Post.API.Properties;
    using WorldFeed.Post.API.Shared;

    public interface ITimelineQueryGenerator
    {
        string GetHomeTimelineQuery(IGetHomeTimelineParameters parameters, TweetMode? tweetMode);

        string GetUserTimelineQuery(IGetUserTimelineParameters parameters, TweetMode? requestTweetMode);

        // Mention Timeline
        string GetMentionsTimelineQuery(IGetMentionsTimelineParameters getMentionsTimelineParameters, TweetMode? tweetMode);

        // Retweets of Me Timeline
        string GetRetweetsOfMeTimelineQuery(IGetRetweetsOfMeTimelineParameters parameters, TweetMode? requestTweetMode);
    }

    public class TimelineQueryGenerator : ITimelineQueryGenerator
    {
        private readonly IUserQueryParameterGenerator userQueryParameterGenerator;
        private readonly IQueryParameterGenerator queryParameterGenerator;

        public TimelineQueryGenerator(IUserQueryParameterGenerator userQueryParameterGenerator, IQueryParameterGenerator queryParameterGenerator)
        {
            this.userQueryParameterGenerator = userQueryParameterGenerator;
            this.queryParameterGenerator = queryParameterGenerator;
        }

        // Home Timeline
        public string GetHomeTimelineQuery(IGetHomeTimelineParameters parameters, TweetMode? requestTweetMode)
        {
            var query = new StringBuilder(Resources.Timeline_GetHomeTimeline);

            this.queryParameterGenerator.AddTimelineParameters(query, parameters, requestTweetMode);

            query.AddParameterToQuery("exclude_replies", parameters.ExcludeReplies);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // User Timeline
        public string GetUserTimelineQuery(IGetUserTimelineParameters parameters, TweetMode? requestTweetMode)
        {
            var query = new StringBuilder(Resources.Timeline_GetUserTimeline);

            query.AddFormattedParameterToQuery(this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User));

            this.queryParameterGenerator.AddTimelineParameters(query, parameters, requestTweetMode);

            query.AddParameterToQuery("exclude_replies", parameters.ExcludeReplies);
            query.AddParameterToQuery("include_rts", parameters.IncludeRetweets);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // Mentions Timeline
        public string GetMentionsTimelineQuery(IGetMentionsTimelineParameters parameters, TweetMode? requestTweetMode)
        {
            var query = new StringBuilder(Resources.Timeline_GetMentionsTimeline);

            this.queryParameterGenerator.AddTimelineParameters(query, parameters, requestTweetMode);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // Retweets of Me Timeline
        public string GetRetweetsOfMeTimelineQuery(IGetRetweetsOfMeTimelineParameters parameters, TweetMode? requestTweetMode)
        {
            var query = new StringBuilder(Resources.Timeline_GetRetweetsOfMeTimeline);

            this.queryParameterGenerator.AddTimelineParameters(query, parameters, requestTweetMode);

            query.AddParameterToQuery("include_user_entities", parameters.IncludeUserEntities);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }
    }
}
