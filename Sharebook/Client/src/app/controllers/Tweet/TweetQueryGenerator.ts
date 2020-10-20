import {ITweetQueryGenerator} from "../../core/Core/QueryGenerators/ITweetQueryGenerator";
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {Resources} from "../../properties/resources";
import {ITweetIdentifier} from "../../core/Public/Models/Interfaces/ITweetIdentifier";
import {TweetMode} from "../../core/Public/Settings/TweetinviSettings";
import {IQueryParameterGenerator} from "../Shared/QueryParameterGenerator";
import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {IGetTweetParameters} from "../../core/Public/Parameters/TweetsClient/GetTweetParameters";
import {IGetTweetsParameters} from "../../core/Public/Parameters/TweetsClient/GetTweetsParameters";
import {IGetOEmbedTweetParameters} from "../../core/Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {IUnfavoriteTweetParameters} from "../../core/Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IFavoriteTweetParameters} from "../../core/Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {IGetRetweeterIdsParameters} from "../../core/Public/Parameters/TweetsClient/GetRetweeterIdsParameters";
import {IDestroyRetweetParameters} from "../../core/Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IPublishRetweetParameters} from "../../core/Public/Parameters/TweetsClient/PublishRetweetParameters";
import {IGetRetweetsParameters} from "../../core/Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IGetUserFavoriteTweetsParameters} from "../../core/Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {IDestroyTweetParameters} from "../../core/Public/Parameters/TweetsClient/DestroyTweetParameters";
import {IPublishTweetParameters} from "../../core/Public/Parameters/TweetsClient/PublishTweetParameters";

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

    query.addParameterToQuery("id", parameters.tweet?.id.ToString() ?? parameters.tweet?.idStr);
    query.addParameterToQuery("include_card_uri", parameters.includeCardUri);
    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("include_ext_alt_text", parameters.includeExtAltText);
    query.addParameterToQuery("include_my_retweet", parameters.includeMyRetweet);
    query.addParameterToQuery("trim_user", parameters.trimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getTweetsQuery(parameters: IGetTweetsParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Tweet_Lookup);

    let validTweetIdentifiers = parameters.tweets.filter(x => GetTweetId(x) != null);
    let tweetIds = validTweetIdentifiers.Select(GetTweetId);

    query.addParameterToQuery("id", string.Join(",", tweetIds));
    query.addParameterToQuery("include_card_uri", parameters.includeCardUri);
    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("include_ext_alt_text", parameters.includeExtAltText);
    query.addParameterToQuery("trim_user", parameters.trimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // Publish Tweet
  public getPublishTweetQuery(parameters: IPublishTweetParameters, tweetMode: ComputedTweetMode): string {
    let text = parameters.text;
    let useExtendedTweetMode = tweetMode === null || tweetMode === TweetMode.Extended;

    let quotedTweetUrl = this.getQuotedTweetUrl(parameters);
    let attachmentUrl = parameters.quotedTweetUrl;

    if (quotedTweetUrl != null) {
      // if there is a quoted tweet we need to pass the url in the text or attachment url
      // attachment_url is only available under tweetMode
      if (useExtendedTweetMode && attachmentUrl == null) {
        attachmentUrl = quotedTweetUrl;
      } else {
        text = text.trim() + " " + quotedTweetUrl;
      }
    }

    let query = new StringBuilder(Resources.Tweet_Publish);

    query.addParameterToQuery("status", text);
    query.addParameterToQuery("auto_populate_reply_metadata", parameters.autoPopulateReplyMetadata);
    query.addParameterToQuery("attachment_url", attachmentUrl);
    query.addParameterToQuery("card_uri", parameters.cardUri);
    query.addParameterToQuery("display_coordinates", parameters.displayExactCoordinates);

    if (parameters.excludeReplyUserIds != null) {
      query.addParameterToQuery("exclude_reply_user_ids", parameters.excludeReplyUserIds.join(',')); // string.Join(",", parameters.excludeReplyUserIds));
    }

    query.addParameterToQuery("in_reply_to_status_id", this.getTweetId(parameters.inReplyToTweet));
    query.addParameterToQuery("lat", parameters.coordinates?.latitude.toString(CultureInfo.InvariantCulture));
    query.addParameterToQuery("long", parameters.coordinates?.longitude.toString(CultureInfo.InvariantCulture));

    if (parameters.mediaIds.length > 0) {
      let mediaIdsParameter = string.Join(",", parameters.mediaIds.map(x => x.toString(CultureInfo.InvariantCulture)));
      query.addParameterToQuery("media_ids", mediaIdsParameter);
    }

    query.addParameterToQuery("place_id", parameters.placeId);
    query.addParameterToQuery("possibly_sensitive", parameters.possiblySensitive);
    query.addParameterToQuery("trim_user", parameters.trimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  private getQuotedTweetUrl(parameters: IPublishTweetParameters): string {
    if (parameters.quotedTweet?.createdBy?.screenName == null) {
      return null;
    }

    let quotedTweetId = this.getTweetId(parameters.quotedTweet);
    return `https://twitter.com/${parameters.quotedTweet.createdBy.screenName}/status/${quotedTweetId}`;
  }

  public getDestroyTweetQuery(parameters: IDestroyTweetParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(`https://api.twitter.com/1.1/statuses/destroy/${this._queryParameterGenerator.generateTweetIdentifier(parameters.tweet)}.json`); // string.Format(Resources.Tweet_Destroy, this._queryParameterGenerator.generateTweetIdentifier(parameters.tweet)));

    query.addParameterToQuery("trim_user", parameters.TrimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getFavoriteTweetsQuery(parameters: IGetUserFavoriteTweetsParameters, tweetMode: ComputedTweetMode): string {
    let userParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user);
    let query = new StringBuilder(Resources.User_GetFavorites + userParameter);

    query.addParameterToQuery("include_entities", parameters.includeEntities);
    this._queryParameterGenerator.addMinMaxQueryParameters(query, parameters);

    query.addParameterToQuery("tweet_mode", tweetMode);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRetweetsQuery(parameters: IGetRetweetsParameters, tweetMode: ComputedTweetMode): string {
    let tweetId = this.getTweetId(parameters.tweet);
    let query = new StringBuilder(`https://api.twitter.com/1.1/statuses/retweets/${tweetId}.json`);

    query.addParameterToQuery("count", parameters.pageSize);
    query.addParameterToQuery("trim_user", parameters.trimUser);

    query.addParameterToQuery("tweet_mode", tweetMode);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getPublishRetweetQuery(parameters: IPublishRetweetParameters, tweetMode: ComputedTweetMode): string {
    let tweetId = this.getTweetId(parameters.tweet);
    let query = new StringBuilder(`https://api.twitter.com/1.1/statuses/retweet/${tweetId}.json`);

    query.addParameterToQuery("trim_user", parameters.trimUser);

    query.addParameterToQuery("tweet_mode", tweetMode);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getDestroyRetweetQuery(parameters: IDestroyRetweetParameters, tweetMode: ComputedTweetMode): string {
    let tweetId = this.getTweetId(parameters.tweet);
    let query = new StringBuilder(`https://api.twitter.com/1.1/statuses/unretweet/${tweetId}.json`);

    query.addParameterToQuery("trim_user", parameters.trimUser);
    query.addParameterToQuery("tweet_mode", tweetMode);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRetweeterIdsQuery(parameters: IGetRetweeterIdsParameters): string {
    let query = new StringBuilder(Resources.Tweet_GetRetweeters);

    query.addParameterToQuery("id", this.getTweetId(parameters.tweet));
    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // Favorites
  public getCreateFavoriteTweetQuery(parameters: IFavoriteTweetParameters): string {
    let query = new StringBuilder(Resources.Tweet_Favorite_Create);

    query.addParameterToQuery("id", this.getTweetId(parameters.tweet));
    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUnfavoriteTweetQuery(parameters: IUnfavoriteTweetParameters): string {
    let query = new StringBuilder(Resources.Tweet_Favorite_Destroy);

    query.addParameterToQuery("id", this.getTweetId(parameters.tweet));
    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getOEmbedTweetQuery(parameters: IGetOEmbedTweetParameters): string {
    let query = new StringBuilder(Resources.Tweet_GenerateOEmbed);

    query.addParameterToQuery("id", this.getTweetId(parameters.tweet));
    query.addParameterToQuery("maxwidth", parameters.maxWidth);
    query.addParameterToQuery("hide_media", parameters.hideMedia);
    query.addParameterToQuery("hide_thread", parameters.hideThread);
    query.addParameterToQuery("omit_script", parameters.omitScript);
    query.addParameterToQuery("align", this._queryParameterGenerator.generateOEmbedAlignmentParameter(parameters.alignment));
    query.addParameterToQuery("related", parameters.relatedUsernames.join(', ') ?? new Array<string>(0).join(', ')); // string.Join(",", parameters.relatedUsernames ?? new string[0]));
    query.addFormattedParameterToQuery(this._queryParameterGenerator.generateLanguageParameter(parameters.language));
    query.addParameterToQuery("theme", this._queryParameterGenerator.generateOEmbedThemeParameter(parameters.theme));
    query.addParameterToQuery("link_color", parameters.linkColor);
    query.addParameterToQuery("widget_type", parameters.widgetType);
    query.addParameterToQuery("dnt", parameters.enablePersonalisationAndSuggestions);

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  private getTweetId(tweetIdentifier: ITweetIdentifier): string {
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
