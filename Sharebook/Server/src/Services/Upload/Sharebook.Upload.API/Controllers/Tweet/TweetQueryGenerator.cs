namespace Sharebook.Upload.API.Controllers.Tweet
{
    using System.Globalization;
    using System.Linq;
    using System.Text;

    using Sharebook.Common.Extensions;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.QueryGenerators.User;
    using Sharebook.Common.Settings;
    using Sharebook.Upload.API.Shared;
    using Sharebook.Upload.Application.Parameters.TweetsClient;
    using Sharebook.Upload.Properties;

    public class TweetQueryGenerator : ITweetQueryGenerator
    {
        private readonly IQueryParameterGenerator _queryParameterGenerator;
        private readonly IUserQueryParameterGenerator _userQueryParameterGenerator;

        public TweetQueryGenerator(IQueryParameterGenerator queryParameterGenerator, IUserQueryParameterGenerator userQueryParameterGenerator)
        {
            _queryParameterGenerator = queryParameterGenerator;         
            _userQueryParameterGenerator = userQueryParameterGenerator;
        }

        // Publish Tweet
        public string GetPublishTweetQuery(IPublishTweetParameters parameters, TweetMode? requestTweetMode)
        {
            var text = parameters.Text;
            var useExtendedTweetMode = requestTweetMode == null || requestTweetMode == TweetMode.Extended;

            var quotedTweetUrl = this.GetQuotedTweetUrl(parameters);
            var attachmentUrl = parameters.QuotedTweetUrl;

            if (quotedTweetUrl != null)
            {
                // if there is a quoted tweet we need to pass the url in the text or attachment url
                // attachment_url is only available under tweetMode
                if (useExtendedTweetMode && attachmentUrl == null)
                {
                    attachmentUrl = quotedTweetUrl;
                }
                else
                {
                    text = text.TrimEnd() + " " + quotedTweetUrl;
                }
            }

            var query = new StringBuilder(Resources.Tweet_Publish);

            query.AddParameterToQuery("status", text);
            query.AddParameterToQuery("auto_populate_reply_metadata", parameters.AutoPopulateReplyMetadata);
            query.AddParameterToQuery("attachment_url", attachmentUrl);
            query.AddParameterToQuery("card_uri", parameters.CardUri);
            query.AddParameterToQuery("display_coordinates", parameters.DisplayExactCoordinates);

            if (parameters.ExcludeReplyUserIds != null)
            {
                query.AddParameterToQuery("exclude_reply_user_ids", string.Join(",", parameters.ExcludeReplyUserIds));
            }

            query.AddParameterToQuery("in_reply_to_status_id", GetTweetId(parameters.InReplyToTweet));
            query.AddParameterToQuery("lat", parameters.Coordinates?.Latitude.ToString(CultureInfo.InvariantCulture));
            query.AddParameterToQuery("long", parameters.Coordinates?.Longitude.ToString(CultureInfo.InvariantCulture));

            if (parameters.MediaIds.Count > 0)
            {
                var mediaIdsParameter = string.Join(",", parameters.MediaIds.Select(x => x.ToString(CultureInfo.InvariantCulture)));
                query.AddParameterToQuery("media_ids", mediaIdsParameter);
            }

            query.AddParameterToQuery("place_id", parameters.PlaceId);
            query.AddParameterToQuery("possibly_sensitive", parameters.PossiblySensitive);
            query.AddParameterToQuery("trim_user", parameters.TrimUser);

            _queryParameterGenerator.AppendTweetModeParameter(query, parameters.TweetMode ?? requestTweetMode);

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }

        private string GetQuotedTweetUrl(IPublishTweetParameters parameters)
        {
            //if (parameters.QuotedTweet?.CreatedBy?.ScreenName == null)
            //{
            //    return null;
            //}

            var quotedTweetId = GetTweetId(parameters.QuotedTweet);
            // return $"https://twitter.com/{parameters.QuotedTweet.CreatedBy.ScreenName}/status/{quotedTweetId}";

            return default;
        }

        public string GetPublishRetweetQuery(IPublishRetweetParameters parameters, TweetMode? requestTweetMode)
        {
            var tweetId = GetTweetId(parameters.Tweet);
            var query = new StringBuilder(string.Format(Resources.Tweet_Retweet_Publish, tweetId));

            query.AddParameterToQuery("trim_user", parameters.TrimUser);

            _queryParameterGenerator.AppendTweetModeParameter(query, parameters.TweetMode ?? requestTweetMode);
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
