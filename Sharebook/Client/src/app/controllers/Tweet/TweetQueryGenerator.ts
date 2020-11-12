import {ITweetQueryGenerator} from "../../core/Core/QueryGenerators/ITweetQueryGenerator";
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {Resources} from "../../properties/resources";
import {ITweetIdentifier} from "../../core/Public/Models/Interfaces/ITweetIdentifier";
import {TweetMode} from "../../core/Public/Settings/SharebookSettings";
import {IQueryParameterGenerator, IQueryParameterGeneratorToken} from "../Shared/QueryParameterGenerator";
import {
  IUserQueryParameterGenerator,
  IUserQueryParameterGeneratorToken
} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
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
import {Inject, Injectable} from "@angular/core";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";
import {format} from "typescript-dotnet-commonjs/System/Text/Utility";

@Injectable({
  providedIn: 'root',
})
export class TweetQueryGenerator implements ITweetQueryGenerator {
  private readonly _queryParameterGenerator: IQueryParameterGenerator;
  private readonly _userQueryParameterGenerator: IUserQueryParameterGenerator;

  constructor(@Inject(IQueryParameterGeneratorToken) queryParameterGenerator: IQueryParameterGenerator,
              @Inject(IUserQueryParameterGeneratorToken) userQueryParameterGenerator: IUserQueryParameterGenerator) {
    this._queryParameterGenerator = queryParameterGenerator;
    this._userQueryParameterGenerator = userQueryParameterGenerator;
  }

  // Get Tweet
  public getTweetQuery(parameters: IGetTweetParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Tweet_Get);

    StringBuilderExtensions.addParameterToQuery(query, "id", parameters.tweet?.id.toString() ?? parameters.tweet?.idStr);
    StringBuilderExtensions.addParameterToQuery(query, "include_card_uri", parameters.includeCardUri);
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "include_ext_alt_text", parameters.includeExtAltText);
    StringBuilderExtensions.addParameterToQuery(query, "include_my_retweet", parameters.includeMyRetweet);
    StringBuilderExtensions.addParameterToQuery(query, "trim_user", parameters.trimUser);
    StringBuilderExtensions.addParameterToQuery(query, "tweet_mode", tweetMode);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getTweetsQuery(parameters: IGetTweetsParameters, tweetMode: ComputedTweetMode): string {
    let query = new StringBuilder(Resources.Tweet_Lookup);

    let validTweetIdentifiers = parameters.tweets.filter(x => this.getTweetId(x) != null);
    let tweetIds = validTweetIdentifiers.map(this.getTweetId);

    StringBuilderExtensions.addParameterToQuery(query, "id", tweetIds.join(', '));
    StringBuilderExtensions.addParameterToQuery(query, "include_card_uri", parameters.includeCardUri);
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "include_ext_alt_text", parameters.includeExtAltText);
    StringBuilderExtensions.addParameterToQuery(query, "trim_user", parameters.trimUser);
    StringBuilderExtensions.addParameterToQuery(query, "tweet_mode", tweetMode);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // Publish Tweet
  public getPublishTweetQuery(parameters: IPublishTweetParameters, tweetMode: ComputedTweetMode): string {
    let text = parameters.text;
    let useExtendedTweetMode = tweetMode === null || tweetMode.implicitOperator() === TweetMode.Extended;

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

    StringBuilderExtensions.addParameterToQuery(query, "status", text);
    StringBuilderExtensions.addParameterToQuery(query, "auto_populate_reply_metadata", parameters.autoPopulateReplyMetadata);
    StringBuilderExtensions.addParameterToQuery(query, "attachment_url", attachmentUrl);
    StringBuilderExtensions.addParameterToQuery(query, "card_uri", parameters.cardUri);
    StringBuilderExtensions.addParameterToQuery(query, "display_coordinates", parameters.displayExactCoordinates);

    if (parameters.excludeReplyUserIds != null) {
      StringBuilderExtensions.addParameterToQuery(query, "exclude_reply_user_ids", parameters.excludeReplyUserIds.join(',')); // string.Join(",", parameters.excludeReplyUserIds));
    }

    StringBuilderExtensions.addParameterToQuery(query, "in_reply_to_status_id", this.getTweetId(parameters.inReplyToTweet));
    StringBuilderExtensions.addParameterToQuery(query, "lat", parameters.coordinates?.latitude.toString(/*CultureInfo.InvariantCulture*/));
    StringBuilderExtensions.addParameterToQuery(query, "long", parameters.coordinates?.longitude.toString(/*CultureInfo.InvariantCulture*/));

    if (parameters.mediaIds.length > 0) {
      let mediaIdsParameter = parameters.mediaIds.map(x => x.toString(/*CultureInfo.InvariantCulture*/)).join(', ');
      StringBuilderExtensions.addParameterToQuery(query, "media_ids", mediaIdsParameter);
    }

    StringBuilderExtensions.addParameterToQuery(query, "place_id", parameters.placeId);
    StringBuilderExtensions.addParameterToQuery(query, "possibly_sensitive", parameters.possiblySensitive);
    StringBuilderExtensions.addParameterToQuery(query, "trim_user", parameters.trimUser);
    StringBuilderExtensions.addParameterToQuery(query, "tweet_mode", tweetMode);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

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
    let query = new StringBuilder(format(Resources.Tweet_Destroy, this._queryParameterGenerator.generateTweetIdentifier(parameters.tweet)));

    StringBuilderExtensions.addParameterToQuery(query, "trim_user", parameters.TrimUser);
    StringBuilderExtensions.addParameterToQuery(query, "tweet_mode", tweetMode);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getFavoriteTweetsQuery(parameters: IGetUserFavoriteTweetsParameters, tweetMode: ComputedTweetMode): string {
    let userParameter = this._userQueryParameterGenerator.generateIdOrScreenNameParameter(parameters.user);
    let query = new StringBuilder(Resources.User_GetFavorites + userParameter);

    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    this._queryParameterGenerator.addMinMaxQueryParameters(query, parameters);

    StringBuilderExtensions.addParameterToQuery(query, "tweet_mode", tweetMode);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRetweetsQuery(parameters: IGetRetweetsParameters, tweetMode: ComputedTweetMode): string {
    let tweetId = this.getTweetId(parameters.tweet);
    let query = new StringBuilder(`https://api.twitter.com/1.1/statuses/retweets/${tweetId}.json`);

    StringBuilderExtensions.addParameterToQuery(query, "count", parameters.pageSize);
    StringBuilderExtensions.addParameterToQuery(query, "trim_user", parameters.trimUser);

    StringBuilderExtensions.addParameterToQuery(query, "tweet_mode", tweetMode);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getPublishRetweetQuery(parameters: IPublishRetweetParameters, tweetMode: ComputedTweetMode): string {
    let tweetId = this.getTweetId(parameters.tweet);
    let query = new StringBuilder(format(Resources.Tweet_Retweet_Publish, tweetId));

    StringBuilderExtensions.addParameterToQuery(query, "trim_user", parameters.trimUser);

    StringBuilderExtensions.addParameterToQuery(query, "tweet_mode", tweetMode);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getDestroyRetweetQuery(parameters: IDestroyRetweetParameters, tweetMode: ComputedTweetMode): string {
    let tweetId = this.getTweetId(parameters.tweet);
    let query = new StringBuilder(format(Resources.Tweet_DestroyRetweet, tweetId));

    StringBuilderExtensions.addParameterToQuery(query, "trim_user", parameters.trimUser);
    StringBuilderExtensions.addParameterToQuery(query, "tweet_mode", tweetMode);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRetweeterIdsQuery(parameters: IGetRetweeterIdsParameters): string {
    let query = new StringBuilder(Resources.Tweet_GetRetweeters);

    StringBuilderExtensions.addParameterToQuery(query, "id", this.getTweetId(parameters.tweet));
    this._queryParameterGenerator.appendCursorParameters(query, parameters);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  // Favorites
  public getCreateFavoriteTweetQuery(parameters: IFavoriteTweetParameters): string {
    let query = new StringBuilder(Resources.Tweet_Favorite_Create);

    StringBuilderExtensions.addParameterToQuery(query, "id", this.getTweetId(parameters.tweet));
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUnfavoriteTweetQuery(parameters: IUnfavoriteTweetParameters): string {
    let query = new StringBuilder(Resources.Tweet_Favorite_Destroy);

    StringBuilderExtensions.addParameterToQuery(query, "id", this.getTweetId(parameters.tweet));
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getOEmbedTweetQuery(parameters: IGetOEmbedTweetParameters): string {
    let query = new StringBuilder(Resources.Tweet_GenerateOEmbed);

    StringBuilderExtensions.addParameterToQuery(query, "id", this.getTweetId(parameters.tweet));
    StringBuilderExtensions.addParameterToQuery(query, "maxwidth", parameters.maxWidth);
    StringBuilderExtensions.addParameterToQuery(query, "hide_media", parameters.hideMedia);
    StringBuilderExtensions.addParameterToQuery(query, "hide_thread", parameters.hideThread);
    StringBuilderExtensions.addParameterToQuery(query, "omit_script", parameters.omitScript);
    StringBuilderExtensions.addParameterToQuery(query, "align", this._queryParameterGenerator.generateOEmbedAlignmentParameter(parameters.alignment));
    StringBuilderExtensions.addParameterToQuery(query, "related", parameters.relatedUsernames.join(', ') ?? new Array<string>(0).join(', ')); // string.Join(",", parameters.relatedUsernames ?? new string[0]));
    StringBuilderExtensions.addFormattedParameterToQuery(query, this._queryParameterGenerator.generateLanguageParameter(parameters.language));
    StringBuilderExtensions.addParameterToQuery(query, "theme", this._queryParameterGenerator.generateOEmbedThemeParameter(parameters.theme));
    StringBuilderExtensions.addParameterToQuery(query, "link_color", parameters.linkColor);
    StringBuilderExtensions.addParameterToQuery(query, "widget_type", parameters.widgetType);
    StringBuilderExtensions.addParameterToQuery(query, "dnt", parameters.enablePersonalisationAndSuggestions);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  private getTweetId(tweetIdentifier: ITweetIdentifier): string {
    if (tweetIdentifier == null) {
      return null;
    }

    let tweetId = tweetIdentifier.idStr;
    if (!tweetId) {
      tweetId = tweetIdentifier.id.toString(/*CultureInfo.InvariantCulture*/);
    }

    return tweetId;
  }
}
