import {IPost} from "../../posts/models/tweet";
import {IOEmbedTweet} from "../../posts/models/properties/OEmbed-tweet";
import {ITweetDTO} from "../../posts/models/DTO/tweet-dto";
import {IUser} from "../../../core/interfaces/common/users";
import {ITweetEntities} from "../../post-object/Entities/interfaces/ITweetEntities";
import {ICoordinates} from "../../posts/models/properties/ICoordinates";
import {ITweetIdentifier} from "../../posts/models/tweet-identifier";
import {IPlace} from "../../posts/models/properties/IPlace";
import {IHashtagEntity} from "../../post-object/Entities/interfaces/IHashTagEntity";
import {IUrlEntity} from "../../post-object/Entities/interfaces/IUrlEntity";
import {IMediaEntity} from "../../post-object/Entities/interfaces/IMediaEntity";
import {IUserMentionEntity} from "../../post-object/Entities/interfaces/IUserMentionEntity";
import {IPoll} from "../../posts/models/poll/poll";

export class Post /*implements IPost*/ {
  private _postFromServer: Post;

  // #region Public Attributes

  private _user: IUser;
  private _entities: ITweetEntities;

  constructor(postFromServer: Post) {
    this.postFromServer = postFromServer;
  }

  uuid: string;

  get postFromServer(): Post {
    return this._postFromServer;
  }

  set postFromServer(value: Post) {
    this._postFromServer = value;
  }

  // #region Twitter API Attributes

  get id(): number {
    return this._postFromServer.id;
  }

  set id(value: number) {
    this._postFromServer.id = value;
  }

  get idStr(): string {
    return this._postFromServer.idStr;
  }

  set idStr(value: string) {
    this._postFromServer.idStr = value;
  }

  get text(): string {
    if (this._postFromServer.text != null) {
      return this._postFromServer.text;
    }

    if (this._postFromServer.fullText == null) {
      return null;
    }

    if (this.displayTextRange == null) {
      return this._postFromServer.fullText;
    }

    let contentStartIndex: number = (this.displayTextRange)[0];
    let contentEndIndex: number = (this.displayTextRange)[1];

    return this.text; // UnicodeHelper.substringByTextElements(this._tweetDTO.fullText, contentStartIndex, contentEndIndex - contentStartIndex);
  }


  set text(value: string) {
    this._postFromServer.text = value;
  }

  get prefix(): string {
    let text = this._postFromServer?.fullText ?? this._postFromServer.fullText;

    if (text != null && this.displayTextRange != null) {
      let prefixEndIndex = (this.displayTextRange)[0];
      return text.substr(0, prefixEndIndex);
    }

    return null;
  }

  get suffix(): string {
    let text = this._postFromServer.fullText ?? this._postFromServer.fullText;

    if (text != null && this.displayTextRange != null) {
      let suffixStartIndex = (this.displayTextRange)[1];
      return this.suffix; // UnicodeHelper.substringByTextElements(text, suffixStartIndex);
    }

    return null;
  }

  get fullText(): string {
    return this._postFromServer.fullText ?? this._postFromServer.fullText ?? this._postFromServer.text;
  }

  set fullText(value: string) {
    this._postFromServer.fullText = value;
  }

  get displayTextRange(): number[] {
    return this._postFromServer.displayTextRange ?? this._postFromServer.displayTextRange;
  }

  get safeDisplayTextRange(): number[] {
    return this.displayTextRange ?? [0, this.fullText.length]; // new[] { 0, this.FullText.length };
  }

  get favorited(): boolean {
    return this._postFromServer.favorited;
  }

  get favoriteCount(): number {
    return this._postFromServer.favoriteCount ?? 0;
  }

  // by mi
  set favoriteCount(value: number) {
      this._postFromServer.favoriteCount = value;
  }

  dislikeCount: number;

  get coordinates(): ICoordinates {
    return this._postFromServer.coordinates;
  }

  set coordinates(value: ICoordinates) {
    this._postFromServer.coordinates = value;
  }

  get entities(): ITweetEntities {
    return this._entities;
  }

  get user(): IUser {
    return this._user;
  }

  get currentUserRetweetIdentifier(): ITweetIdentifier {
    return this._postFromServer.currentUserRetweetIdentifier;
  }

  get createdAt(): Date { // DateTimeOffset
    return new Date(this._postFromServer.createdAt.toString()) ;
  }

  get source(): string {
    return this._postFromServer.source;
  }

  set source(value: string) {
    this._postFromServer.source = value;
  }

  get truncated(): boolean {
    return this._postFromServer.truncated;
  }

  get replyCount(): number {
    return this._postFromServer.replyCount;
  }

  set replyCount(value: number) {
    this._postFromServer.quoteCount = value;
  }

  get inReplyToStatusId(): number { // long?
    return this._postFromServer.inReplyToStatusId;
  }

  set inReplyToStatusId(value: number) {
    this._postFromServer.inReplyToStatusId = value;
  }

  get inReplyToStatusIdStr(): string {
    return this._postFromServer.inReplyToStatusIdStr;
  }

  set inReplyToStatusIdStr(value: string) {
    this._postFromServer.inReplyToStatusIdStr = value;
  }

  get inReplyToUserId(): number { // long?
    return this._postFromServer.inReplyToUserId;
  }

  set inReplyToUserId(value: number) {
    this._postFromServer.inReplyToUserId = value;
  }

  get inReplyToUserIdStr(): string {
    return this._postFromServer.inReplyToUserIdStr;
  }

  set inReplyToUserIdStr(value: string) {
    this._postFromServer.inReplyToUserIdStr = value;
  }

  get inReplyToScreenName(): string {
    return this._postFromServer.inReplyToScreenName;
  }

  set inReplyToScreenName(value: string) {
    this._postFromServer.inReplyToScreenName = value;
  }

  get contributorsIds(): number[] {
    return this._postFromServer.contributorsIds;
  }

  get contributors(): Array<number> {
    return this._postFromServer.contributors;
  }

  get retweetCount(): number {
    return this._postFromServer.retweetCount;
  }

  get retweeted(): boolean {
    return this._postFromServer.retweeted;
  }

  // get isRetweet(): boolean {
  //   return this._postFromServer.retweetedTweetDTO != null;
  // }

  private _retweetedTweet: IPost;

  get retweetedTweet(): IPost {
    // if (this._retweetedTweet == null) {
    //   this._retweetedTweet = this.client.factories.createTweet(this._tweetDTO.retweetedTweetDTO);
    // }
    //
    // return this._retweetedTweet;

    return null;
  }

  get quoteCount(): number {  // int?
    return this._postFromServer.quoteCount;
  }

  set quoteCount(value: number) {
    this._postFromServer.quoteCount = value;
  }

  get quotedStatusId(): number {  // long?
    return this._postFromServer.quotedStatusId;
  }

  get quotedStatusIdStr(): string {
    return this._postFromServer.quotedStatusIdStr;
  }

  private _quotedTweet: IPost;

  get quotedTweet(): IPost {
    // if (this._quotedTweet == null) {
    //   this._quotedTweet = this.client.factories.createTweet(this._tweetDTO.quotedTweetDTO);
    // }
    //
    // return this._quotedTweet;

    return null;
  }

  get possiblySensitive(): boolean {
    return this._postFromServer.possiblySensitive;
  }


  // get language(): Language {
  //   return this._tweetDTO.language;
  // }

  get place(): IPlace {
    return this._postFromServer.place;
  }

  get scopes(): Map<string, object> {
    return this._postFromServer.scopes;
  }

  get filterLevel(): string {
    return this._postFromServer.filterLevel;
  }

  get withheldCopyright(): boolean {
    return this._postFromServer.withheldCopyright;
  }

  get withheldInCountries(): Array<string> {
    return this._postFromServer.withheldInCountries;
  }

  get withheldScope(): string {
    return this._postFromServer.withheldScope;
  }

  // #endregion

  // #region Tweetinvi API Accessors

  get hashtags(): Array<IHashtagEntity> {
    if (this.entities != null) {
      return this.entities.hashtags;
    }

    return null;
  }

  get urls(): Array<IUrlEntity> {
    if (this.entities != null) {
      return this.entities.urls;
    }

    return null;
  }

  get media(): Array<IMediaEntity> {
    if (this.entities != null) {
      return this.entities.medias;
    }

    return null;
  }

  get poll(): IPoll {
    if (this.entities != null) {
      return this.entities.poll;
    }

    return null;
  }

  get userMentions(): Array<IUserMentionEntity> {
    if (this.entities != null) {
      return this.entities.userMentions;
    }

    return null;
  }

  // #endregion

  // #region Tweetinvi API Attributes

  get url(): string {
    return `https://twitter.com/${this.user?.screenName}/status/${this.id.toString(/*CultureInfo.InvariantCulture*/).toLocaleLowerCase()}`;
  }

  // #endregion

  // #endregion

  // public publishRetweetAsync(): Promise<ITweet> {
  //   return this.client.tweets.publishRetweetAsync(this);
  // }
  //
  // public getRetweetsAsync(): Promise<ITweet[]> {
  //   return this.client.tweets.getRetweetsAsync(this);
  // }
  //
  // public destroyRetweetAsync(): Promise<void> {
  //   return this.client.tweets.destroyTweetAsync(this);
  // }
  //
  // public generateOEmbedTweetAsync(): Promise<IOEmbedTweet> {
  //   return this.client.tweets.getOEmbedTweetAsync(this);
  // }
  //
  // public destroyAsync(): Promise<void> {
  //   return this.client.tweets.destroyTweetAsync(this);
  // }
  //
  // public favoriteAsync(): Promise<void> {
  //   return this.client.tweets.favoriteTweetAsync(this);
  // }
  //
  // public unfavoriteAsync(): Promise<void> {
  //   return this.client.tweets.unfavoriteTweetAsync(this);
  // }

  blacklisted?: boolean;
  blockedReason?: string;

  static buildClientUrl (videoUUID: string) {
    return '/videos/watch/' + videoUUID;
  }


  public ToString(): string {
    return this.fullText;
  }

  public equals(other: IPost): boolean {
    if (other == null) {
      return false;
    }

    // Equals is currently used to compare only if 2 tweets are the same
    // We do not look for the tweet version (DateTime)
    // return this._postFromServer === other.tweetDTO;   // return _tweetDTO.Equals(other.TweetDTO);
  }
}