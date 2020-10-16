import {ITweetQueryGenerator} from "../../core/Core/QueryGenerators/ITweetQueryGenerator";
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";
import {ITweetIdentifier} from "../../core/Public/Models/Interfaces/ITweetIdentifier";
import {TweetMode} from "../../core/Public/Settings/TweetinviSettings";

export class TweetQueryGenerator implements ITweetQueryGenerator {
  private readonly _queryParameterGenerator: IQueryParameterGenerator;
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;

  constructor(queryParameterGenerator: IQueryParameterGenerator, userQueryParameterGenerator: IUserQueryParameterGenerator) {
    this._queryParameterGenerator = queryParameterGenerator;
    this._userQueryParameterGenerator = userQueryParameterGenerator;
  }

  // Get Tweet
  public getTweetQuery(parameters: IGetTweetParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Tweet_Get);

    query.addParameterToQuery("id", parameters.Tweet?.id.ToString() ?? parameters.Tweet?.idStr);
    query.addParameterToQuery("include_card_uri", parameters.IncludeCardUri);
    query.addParameterToQuery("include_entities", parameters.IncludeEntities);
    query.addParameterToQuery("include_ext_alt_text", parameters.IncludeExtAltText);
    query.addParameterToQuery("include_my_retweet", parameters.IncludeMyRetweet);
    query.addParameterToQuery("trim_user", parameters.TrimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public getTweetsQuery(parameters: IGetTweetsParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Tweet_Lookup);

    let validTweetIdentifiers = parameters.Tweets.Where(x => GetTweetId(x) != null);
    let tweetIds = validTweetIdentifiers.Select(GetTweetId);

    query.addParameterToQuery("id", string.Join(",", tweetIds));
    query.addParameterToQuery("include_card_uri", parameters.IncludeCardUri);
    query.addParameterToQuery("include_entities", parameters.IncludeEntities);
    query.addParameterToQuery("include_ext_alt_text", parameters.IncludeExtAltText);
    query.addParameterToQuery("trim_user", parameters.TrimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  // Publish Tweet
  public getPublishTweetQuery(parameters: IPublishTweetParameters, tweetMode: ComputedTweetMode): string {
    var text = parameters.Text;
    var useExtendedTweetMode = tweetMode === null || tweetMode === TweetMode.Extended;

    var quotedTweetUrl = GetQuotedTweetUrl(parameters);
    var attachmentUrl = parameters.QuotedTweetUrl;

    if (quotedTweetUrl != null) {
      // if there is a quoted tweet we need to pass the url in the text or attachment url
      // attachment_url is only available under tweetMode
      if (useExtendedTweetMode && attachmentUrl == null) {
        attachmentUrl = quotedTweetUrl;
      } else {
        text = text.TrimEnd() + " " + quotedTweetUrl;
      }
    }

    var query = new StringBuilder(Resources.Tweet_Publish);

    query.addParameterToQuery("status", text);
    query.addParameterToQuery("auto_populate_reply_metadata", parameters.AutoPopulateReplyMetadata);
    query.addParameterToQuery("attachment_url", attachmentUrl);
    query.addParameterToQuery("card_uri", parameters.CardUri);
    query.addParameterToQuery("display_coordinates", parameters.DisplayExactCoordinates);

    if (parameters.ExcludeReplyUserIds != null) {
      query.addParameterToQuery("exclude_reply_user_ids", string.Join(",", parameters.ExcludeReplyUserIds));
    }

    query.addParameterToQuery("in_reply_to_status_id", GetTweetId(parameters.InReplyToTweet));
    query.addParameterToQuery("lat", parameters.Coordinates?.latitude.ToString(CultureInfo.InvariantCulture));
    query.addParameterToQuery("long", parameters.Coordinates?.longitude.ToString(CultureInfo.InvariantCulture));

    if (parameters.MediaIds.Count > 0) {
      var mediaIdsParameter = string.Join(",", parameters.MediaIds.Select(x => x.ToString(CultureInfo.InvariantCulture)));
      query.addParameterToQuery("media_ids", mediaIdsParameter);
    }

    query.addParameterToQuery("place_id", parameters.PlaceId);
    query.addParameterToQuery("possibly_sensitive", parameters.PossiblySensitive);
    query.addParameterToQuery("trim_user", parameters.TrimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  private GetQuotedTweetUrl(parameters: IPublishTweetParameters): string {
    if (parameters.QuotedTweet?.createdBy?.screenName == null) {
      return null;
    }

    var quotedTweetId = GetTweetId(parameters.QuotedTweet);
    return `https://twitter.com/${parameters.QuotedTweet.createdBy.screenName}/status/${quotedTweetId}`;
  }

  public getDestroyTweetQuery(parameters: IDestroyTweetParameters, tweetMode: ComputedTweetMode): string {
    var query = new StringBuilder(string.Format(Resources.Tweet_Destroy, this._queryParameterGenerator.GenerateTweetIdentifier(parameters.Tweet)));

    query.addParameterToQuery("trim_user", parameters.TrimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public getFavoriteTweetsQuery(parameters: IGetUserFavoriteTweetsParameters, tweetMode: ComputedTweetMode): string {
    var userParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.User);
    var query = new StringBuilder(Resources.User_GetFavorites + userParameter);

    query.addParameterToQuery("include_entities", parameters.IncludeEntities);
    this._queryParameterGenerator.AddMinMaxQueryParameters(query, parameters);

    query.addParameterToQuery("tweet_mode", tweetMode);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public getRetweetsQuery(parameters: IGetRetweetsParameters, tweetMode: ComputedTweetMode): string {
    var tweetId = GetTweetId(parameters.Tweet);
    var query = new StringBuilder(string.Format(Resources.Tweet_Retweet_GetRetweets, tweetId));

    query.addParameterToQuery("count", parameters.PageSize);
    query.addParameterToQuery("trim_user", parameters.TrimUser);

    query.addParameterToQuery("tweet_mode", tweetMode);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public getPublishRetweetQuery(parameters: IPublishRetweetParameters, tweetMode: ComputedTweetMode): string {
    var tweetId = GetTweetId(parameters.Tweet);
    var query = new StringBuilder(string.Format(Resources.Tweet_Retweet_Publish, tweetId));

    query.addParameterToQuery("trim_user", parameters.TrimUser);

    query.addParameterToQuery("tweet_mode", tweetMode);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public getDestroyRetweetQuery(parameters: IDestroyRetweetParameters, tweetMode: ComputedTweetMode): string {
    var tweetId = GetTweetId(parameters.Tweet);
    var query = new StringBuilder(string.Format(Resources.Tweet_DestroyRetweet, tweetId));

    query.addParameterToQuery("trim_user", parameters.TrimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public getRetweeterIdsQuery(parameters: IGetRetweeterIdsParameters): string {
    var query = new StringBuilder(Resources.Tweet_GetRetweeters);

    query.addParameterToQuery("id", GetTweetId(parameters.Tweet));
    _queryParameterGenerator.AppendCursorParameters(query, parameters);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  // Favorites
  public getCreateFavoriteTweetQuery(parameters: IFavoriteTweetParameters): string {
    var query = new StringBuilder(Resources.Tweet_Favorite_Create);

    query.addParameterToQuery("id", GetTweetId(parameters.Tweet));
    query.addParameterToQuery("include_entities", parameters.IncludeEntities);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public getUnfavoriteTweetQuery(parameters: IUnfavoriteTweetParameters): string {
    var query = new StringBuilder(Resources.Tweet_Favorite_Destroy);

    query.addParameterToQuery("id", GetTweetId(parameters.Tweet));
    query.addParameterToQuery("include_entities", parameters.IncludeEntities);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public getOEmbedTweetQuery(parameters: IGetOEmbedTweetParameters): string {
    let query = new StringBuilder(Resources.Tweet_GenerateOEmbed);

    query.addParameterToQuery("id", GetTweetId(parameters.Tweet));
    query.addParameterToQuery("maxwidth", parameters.MaxWidth);
    query.addParameterToQuery("hide_media", parameters.HideMedia);
    query.addParameterToQuery("hide_thread", parameters.HideThread);
    query.addParameterToQuery("omit_script", parameters.OmitScript);
    query.addParameterToQuery("align", _queryParameterGenerator.GenerateOEmbedAlignmentParameter(parameters.Alignment));
    query.addParameterToQuery("related", string.Join(",", parameters.RelatedUsernames ?? new string[0]));
    query.addFormattedParameterToQuery(_queryParameterGenerator.GenerateLanguageParameter(parameters.Language));
    query.addParameterToQuery("theme", _queryParameterGenerator.GenerateOEmbedThemeParameter(parameters.Theme));
    query.addParameterToQuery("link_color", parameters.LinkColor);
    query.addParameterToQuery("widget_type", parameters.WidgetType);
    query.addParameterToQuery("dnt", parameters.EnablePersonalisationAndSuggestions);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  private GetTweetId(tweetIdentifier: ITweetIdentifier): string {
    if (tweetIdentifier == null) {
      return null;
    }

    let tweetId = tweetIdentifier.idStr;
    if (!tweetId) {
      tweetId = tweetIdentifier.id.toString(CultureInfo.InvariantCulture);
    }

    return tweetId;
  }

}
