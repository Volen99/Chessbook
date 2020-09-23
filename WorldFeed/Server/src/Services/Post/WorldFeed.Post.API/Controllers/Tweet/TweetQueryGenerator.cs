namespace WorldFeed.Post.API.Controllers.Tweet
{
    using System.Globalization;
    using System.Linq;
    using System.Text;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.QueryGenerators.User;
    using WorldFeed.Common.Settings;
    using WorldFeed.Post.API.Shared;
    using WorldFeed.Post.Application.Parameters.TweetsClient;
    using WorldFeed.Post.API.Properties;

    public class TweetQueryGenerator : ITweetQueryGenerator
    {
        private readonly IQueryParameterGenerator queryParameterGenerator;
        private readonly IUserQueryParameterGenerator userQueryParameterGenerator;

        public TweetQueryGenerator(IQueryParameterGenerator queryParameterGenerator, IUserQueryParameterGenerator userQueryParameterGenerator)
        {
            this.queryParameterGenerator = queryParameterGenerator;
            this.userQueryParameterGenerator = userQueryParameterGenerator;
        }

        // Get Tweet
        public string GetTweetQuery(IGetTweetParameters parameters, TweetMode? requestTweetMode)
        {
            var query = new StringBuilder(Resources.Tweet_Get);

            query.AddParameterToQuery("id", parameters.Tweet?.Id.ToString() ?? parameters.Tweet?.IdStr);
            query.AddParameterToQuery("include_card_uri", parameters.IncludeCardUri);
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddParameterToQuery("include_ext_alt_text", parameters.IncludeExtAltText);
            query.AddParameterToQuery("include_my_retweet", parameters.IncludeMyRetweet);
            query.AddParameterToQuery("trim_user", parameters.TrimUser);

            this.queryParameterGenerator.AppendTweetModeParameter(query, parameters.TweetMode ?? requestTweetMode);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetTweetsQuery(IGetTweetsParameters parameters, TweetMode? requestTweetMode)
        {
            var query = new StringBuilder(Resources.Tweet_Lookup);

            var validTweetIdentifiers = parameters.Tweets.Where(x => GetTweetId(x) != null);
            var tweetIds = validTweetIdentifiers.Select(GetTweetId);

            query.AddParameterToQuery("id", string.Join(",", tweetIds));
            query.AddParameterToQuery("include_card_uri", parameters.IncludeCardUri);
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddParameterToQuery("include_ext_alt_text", parameters.IncludeExtAltText);
            query.AddParameterToQuery("trim_user", parameters.TrimUser);

            this.queryParameterGenerator.AppendTweetModeParameter(query, parameters.TweetMode ?? requestTweetMode);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        //private string GetQuotedTweetUrl(IPublishTweetParameters parameters)
        //{
        //    if (parameters.QuotedTweet?.CreatedBy?.ScreenName == null)
        //    {
        //        return null;
        //    }

        //    var quotedTweetId = GetTweetId(parameters.QuotedTweet);
        //    return $"https://twitter.com/{parameters.QuotedTweet.CreatedBy.ScreenName}/status/{quotedTweetId}";
        //}

        public string GetDestroyTweetQuery(IDestroyTweetParameters parameters, TweetMode? requestTweetMode)
        {
            var query = new StringBuilder(string.Format(Resources.Tweet_Destroy, this.queryParameterGenerator.GenerateTweetIdentifier(parameters.Tweet)));

            query.AddParameterToQuery("trim_user", parameters.TrimUser);

            this.queryParameterGenerator.AppendTweetModeParameter(query, parameters.TweetMode ?? requestTweetMode);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetFavoriteTweetsQuery(IGetUserFavoriteTweetsParameters parameters, TweetMode? requestTweetMode)
        {
            var userParameter = this.userQueryParameterGenerator.GenerateIdOrScreenNameParameter(parameters.User);
            var query = new StringBuilder(Resources.User_GetFavorites + userParameter);

            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            this.queryParameterGenerator.AddMinMaxQueryParameters(query, parameters);

            this.queryParameterGenerator.AppendTweetModeParameter(query, parameters.TweetMode ?? requestTweetMode);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetRetweetsQuery(IGetRetweetsParameters parameters, TweetMode? requestTweetMode)
        {
            var tweetId = GetTweetId(parameters.Tweet);
            var query = new StringBuilder(string.Format(Resources.Tweet_Retweet_GetRetweets, tweetId));

            query.AddParameterToQuery("count", parameters.PageSize);
            query.AddParameterToQuery("trim_user", parameters.TrimUser);

            this.queryParameterGenerator.AppendTweetModeParameter(query, parameters.TweetMode ?? requestTweetMode);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetDestroyRetweetQuery(IDestroyRetweetParameters parameters, TweetMode? requestTweetMode)
        {
            var tweetId = GetTweetId(parameters.Tweet);
            var query = new StringBuilder(string.Format(Resources.Tweet_DestroyRetweet, tweetId));

            query.AddParameterToQuery("trim_user", parameters.TrimUser);

            this.queryParameterGenerator.AppendTweetModeParameter(query, parameters.TweetMode ?? requestTweetMode);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetRetweeterIdsQuery(IGetRetweeterIdsParameters parameters)
        {
            var query = new StringBuilder(Resources.Tweet_GetRetweeters);

            query.AddParameterToQuery("id", GetTweetId(parameters.Tweet));
            this.queryParameterGenerator.AppendCursorParameters(query, parameters);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        // Favorites
        public string GetCreateFavoriteTweetQuery(IFavoriteTweetParameters parameters)
        {
            var query = new StringBuilder(Resources.Tweet_Favorite_Create);

            query.AddParameterToQuery("id", GetTweetId(parameters.Tweet));
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetUnfavoriteTweetQuery(IUnfavoriteTweetParameters parameters)
        {
            var query = new StringBuilder(Resources.Tweet_Favorite_Destroy);

            query.AddParameterToQuery("id", GetTweetId(parameters.Tweet));
            query.AddParameterToQuery("include_entities", parameters.IncludeEntities);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        public string GetOEmbedTweetQuery(IGetOEmbedTweetParameters parameters)
        {
            var query = new StringBuilder(Resources.Tweet_GenerateOEmbed);

            query.AddParameterToQuery("id", GetTweetId(parameters.Tweet));
            query.AddParameterToQuery("maxwidth", parameters.MaxWidth);
            query.AddParameterToQuery("hide_media", parameters.HideMedia);
            query.AddParameterToQuery("hide_thread", parameters.HideThread);
            query.AddParameterToQuery("omit_script", parameters.OmitScript);
            query.AddParameterToQuery("align", this.queryParameterGenerator.GenerateOEmbedAlignmentParameter(parameters.Alignment));
            query.AddParameterToQuery("related", string.Join(",", parameters.RelatedUsernames ?? new string[0]));
            query.AddFormattedParameterToQuery(this.queryParameterGenerator.GenerateLanguageParameter(parameters.Language));
            query.AddParameterToQuery("theme", this.queryParameterGenerator.GenerateOEmbedThemeParameter(parameters.Theme));
            query.AddParameterToQuery("link_color", parameters.LinkColor);
            query.AddParameterToQuery("widget_type", parameters.WidgetType);
            query.AddParameterToQuery("dnt", parameters.EnablePersonalisationAndSuggestions);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        private string GetTweetId(ITweetIdentifier tweetIdentifier)
        {
            if (tweetIdentifier == null)
            {
                return null;
            }

            var tweetId = tweetIdentifier.IdStr;
            if (string.IsNullOrEmpty(tweetId))
            {
                tweetId = tweetIdentifier.Id.ToString(CultureInfo.InvariantCulture);
            }

            return tweetId;
        }

    }
}
