import {Injectable} from "@angular/core";

import {IPublishTweetParameters} from "./parameters/publish-tweet-parameters";
import {IDestroyTweetParameters} from "./parameters/destroy-tweet-parameters";
import {IGetUserFavoriteTweetsParameters} from "./parameters/get-favorite-tweets-Parameters";
import {IGetRetweetsParameters} from "./parameters/get-retweets-parameters";
import {IPublishRetweetParameters} from "./parameters/publish-retweet-parameters";
import {IDestroyRetweetParameters} from "./parameters/destroy-retweet-parameters";
import {IGetRetweeterIdsParameters} from "./parameters/get-retweeter-ids-parameters";
import {IFavoriteTweetParameters} from "./parameters/favorite-tweet-parameters";
import {IUnfavoriteTweetParameters} from "./parameters/unfavorite-tweet-parameters";
import {IGetOEmbedTweetParameters} from "./parameters/get-OEmbed-tweet-parameters";
import {ITweetIdentifier} from "./models/tweet-identifier";
import {IGetTweetParameters} from "./parameters/get-tweet-parameters";
import {HttpParams} from "@angular/common/http";
import {RestService} from "../../core/rest/rest.service";
import {IGetTweetsParameters} from "./parameters/get-tweets-parameters";
import {UserQueryParameterGeneratorService} from "../services/user-query-parameter-generator.service";


@Injectable()
export class TweetQueryGeneratorService {

  constructor(private userQueryParameterGeneratorService: UserQueryParameterGeneratorService, private restService: RestService) {
  }

  // Get Tweet
  public getTweetQuery(parameters: IGetTweetParameters): HttpParams {
    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, "id", parameters.tweet?.id.toString() ?? parameters.tweet?.idStr);
    params = this.restService.addParameterToQuery(params, "include_card_uri", parameters.includeCardUri);
    params = this.restService.addParameterToQuery(params, "include_entities", parameters.includeEntities);
    params = this.restService.addParameterToQuery(params, "include_ext_alt_text", parameters.includeExtAltText);
    params = this.restService.addParameterToQuery(params, "include_my_retweet", parameters.includeMyRetweet);
    params = this.restService.addParameterToQuery(params, "trim_user", parameters.trimUser);
    // params = this.restService.addParameterToQuery(params, "tweet_mode", tweetMode);

    this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  public getTweetsQuery(parameters: IGetTweetsParameters): HttpParams {
    let params = new HttpParams();

    let validTweetIdentifiers = parameters.tweets.filter(x => this.getTweetId(x) != null);
    let tweetIds = validTweetIdentifiers.map(this.getTweetId);

    params = this.restService.addParameterToQuery(params, "id", tweetIds.join(', '));
    params = this.restService.addParameterToQuery(params, "include_card_uri", parameters.includeCardUri);
    params = this.restService.addParameterToQuery(params, "include_entities", parameters.includeEntities);
    params = this.restService.addParameterToQuery(params, "include_ext_alt_text", parameters.includeExtAltText);
    params = this.restService.addParameterToQuery(params, "trim_user", parameters.trimUser);
    // params = this.restService.addParameterToQuery(params, "tweet_mode", tweetMode);

    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  // Publish Tweet
  public getPublishTweetQuery(parameters: IPublishTweetParameters): HttpParams {
    let text = parameters.text;
    let useExtendedTweetMode = true; // tweetMode === null || tweetMode.implicitOperator() === TweetMode.Extended;

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

    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, "status", text);
    params = this.restService.addParameterToQuery(params, "auto_populate_reply_metadata", parameters.autoPopulateReplyMetadata);
    params = this.restService.addParameterToQuery(params, "attachment_url", attachmentUrl);
    params = this.restService.addParameterToQuery(params, "card_uri", parameters.cardUri);
    params = this.restService.addParameterToQuery(params, "display_coordinates", parameters.displayExactCoordinates);

    if (parameters.excludeReplyUserIds != null) {
      params = this.restService.addParameterToQuery(params, "exclude_reply_user_ids", parameters.excludeReplyUserIds.join(',')); // string.Join(",", parameters.excludeReplyUserIds));
    }

    params = this.restService.addParameterToQuery(params, "in_reply_to_status_id", this.getTweetId(parameters.inReplyToTweet));
    params = this.restService.addParameterToQuery(params, "lat", parameters.coordinates?.latitude.toString(/*CultureInfo.InvariantCulture*/));
    params = this.restService.addParameterToQuery(params, "long", parameters.coordinates?.longitude.toString(/*CultureInfo.InvariantCulture*/));

    if (parameters.mediaIds.length > 0) {
      let mediaIdsParameter = parameters.mediaIds.map(x => x.toString(/*CultureInfo.InvariantCulture*/)).join(', ');
      params = this.restService.addParameterToQuery(params, "media_ids", mediaIdsParameter);
    }

    params = this.restService.addParameterToQuery(params, "place_id", parameters.placeId);
    params = this.restService.addParameterToQuery(params, "possibly_sensitive", parameters.possiblySensitive);
    params = this.restService.addParameterToQuery(params, "trim_user", parameters.trimUser);
    // params = this.restService.addParameterToQuery(params, "tweet_mode", tweetMode);

    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  private getQuotedTweetUrl(parameters: IPublishTweetParameters): string {
    if (parameters.quotedTweet?.createdBy?.screenName == null) {
      return null;
    }

    let quotedTweetId = this.getTweetId(parameters.quotedTweet);
    return `https://sharebook.com/${parameters.quotedTweet.createdBy.screenName}/status/${quotedTweetId}`;
  }

  public getDestroyTweetQuery(parameters: IDestroyTweetParameters): HttpParams {
    let params = new HttpParams(); // new StringBuilder(format(Resources.Tweet_Destroy, this._queryParameterGenerator.generateTweetIdentifier(parameters.tweet)));

    params = this.restService.addParameterToQuery(params, "trim_user", parameters.TrimUser);
    // params = this.restService.addParameterToQuery(params, "tweet_mode", tweetMode);

    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  public getFavoriteTweetsQuery(parameters: IGetUserFavoriteTweetsParameters): HttpParams {
    let userParameter = this.userQueryParameterGeneratorService.generateIdOrScreenNameParameter(parameters.user);
    let params = new HttpParams();  // StringBuilder(Resources.User_GetFavorites + userParameter);

    params = this.restService.addParameterToQuery(params, "include_entities", parameters.includeEntities);
    this.restService.addMinMaxQueryParameters(params, parameters);

    // params = this.restService.addParameterToQuery(params, "tweet_mode", tweetMode);
    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  public getRetweetsQuery(parameters: IGetRetweetsParameters): HttpParams {
    let tweetId = this.getTweetId(parameters.tweet);
    let params = new HttpParams(); // new StringBuilder(`https://api.twitter.com/1.1/statuses/retweets/${tweetId}.json`);

    params = this.restService.addParameterToQuery(params, "count", parameters.pageSize);
    params = this.restService.addParameterToQuery(params, "trim_user", parameters.trimUser);

    // params = this.restService.addParameterToQuery(params, "tweet_mode", tweetMode);
    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  public getPublishRetweetQuery(parameters: IPublishRetweetParameters): HttpParams {
    let tweetId = this.getTweetId(parameters.tweet);
    let params = new HttpParams(); // new StringBuilder(format(Resources.Tweet_Retweet_Publish, tweetId));

    params = this.restService.addParameterToQuery(params, "trim_user", parameters.trimUser);

    // params = this.restService.addParameterToQuery(params, "tweet_mode", tweetMode);
    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  public getDestroyRetweetQuery(parameters: IDestroyRetweetParameters): HttpParams {
    let tweetId = this.getTweetId(parameters.tweet);
    let params = new HttpParams(); // new StringBuilder(format(Resources.Tweet_DestroyRetweet, tweetId));

    params = this.restService.addParameterToQuery(params, "trim_user", parameters.trimUser);
    // params = this.restService.addParameterToQuery(params, "tweet_mode", tweetMode);

    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  public getRetweeterIdsQuery(parameters: IGetRetweeterIdsParameters): HttpParams {
    let params = new HttpParams();  // new StringBuilder(Resources.Tweet_GetRetweeters);

    params = this.restService.addParameterToQuery(params, "id", this.getTweetId(parameters.tweet));
    this.restService.appendCursorParameters(params, parameters);

    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  // Favorites
  public getCreateFavoriteTweetQuery(parameters: IFavoriteTweetParameters): HttpParams {
    let params = new HttpParams(); // new StringBuilder(Resources.Tweet_Favorite_Create);

    params = this.restService.addParameterToQuery(params, "id", this.getTweetId(parameters.tweet));
    params = this.restService.addParameterToQuery(params, "rate_type", parameters.rateType.toString());
    params = this.restService.addParameterToQuery(params, "include_entities", parameters.includeEntities);
    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }

  public getUnfavoriteTweetQuery(parameters: IUnfavoriteTweetParameters): HttpParams {
    let params = new HttpParams(); // new StringBuilder(Resources.Tweet_Favorite_Destroy);

    params = this.restService.addParameterToQuery(params, "id", this.getTweetId(parameters.tweet));
    params = this.restService.addParameterToQuery(params, "include_entities", parameters.includeEntities);
    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }




  public getVotePostQuery(parameters: IFavoriteTweetParameters): HttpParams {
    let params = new HttpParams(); // new StringBuilder(Resources.Tweet_Favorite_Create);

    params = this.restService.addParameterToQuery(params, "id", this.getTweetId(parameters.tweet));
    params = this.restService.addParameterToQuery(params, "include_entities", parameters.includeEntities);
    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
  }






  public getOEmbedTweetQuery(parameters: IGetOEmbedTweetParameters): HttpParams {
    let params = new HttpParams(); // StringBuilder(Resources.Tweet_GenerateOEmbed);

    params = this.restService.addParameterToQuery(params, "id", this.getTweetId(parameters.tweet));
    params = this.restService.addParameterToQuery(params, "maxwidth", parameters.maxWidth);
    params = this.restService.addParameterToQuery(params, "hide_media", parameters.hideMedia);
    params = this.restService.addParameterToQuery(params, "hide_thread", parameters.hideThread);
    params = this.restService.addParameterToQuery(params, "omit_script", parameters.omitScript);
    params = this.restService.addParameterToQuery(params, "align", this.restService.generateOEmbedAlignmentParameter(parameters.alignment));
                                                                                                                // string.Join(",", parameters.relatedUsernames ?? new string[0]));
    params = this.restService.addParameterToQuery(params, "related", parameters.relatedUsernames.join(', ') ?? new Array<string>(0).join(', '));
    // params = this.restService.addFormattedParameterToQuery(params, this.restService.generateLanguageParameter(parameters.language));
    params = this.restService.addParameterToQuery(params, "theme", this.restService.generateOEmbedThemeParameter(parameters.theme));
    params = this.restService.addParameterToQuery(params, "link_color", parameters.linkColor);
    params = this.restService.addParameterToQuery(params, "widget_type", parameters.widgetType);
    params = this.restService.addParameterToQuery(params, "dnt", parameters.enablePersonalisationAndSuggestions);

    params = this.restService.addFormattedParameterToQuery(params, parameters.formattedCustomQueryParameters);

    return params;
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
