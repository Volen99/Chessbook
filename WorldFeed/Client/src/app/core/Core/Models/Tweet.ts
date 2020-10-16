import {ITweetEntities} from "../../Public/Models/Entities/ITweetEntities";
import {TweetEntities} from "./TwitterEntities/TweetEntities";
import {TweetMode} from "../../Public/Settings/TweetinviSettings";
import {UnicodeHelper} from '../Helpers/UnicodeHelper';
import {ICoordinates} from "../../Public/Models/Interfaces/ICoordinates";
import {ITweetIdentifier} from "../../Public/Models/Interfaces/ITweetIdentifier";
import Dictionary from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary';
import {IHashtagEntity} from "../../Public/Models/Entities/IHashTagEntity";
import {IUrlEntity} from "../../Public/Models/Entities/IUrlEntity";
import {IMediaEntity} from "../../Public/Models/Entities/IMediaEntity";
import {IUserMentionEntity} from "../../Public/Models/Entities/IUserMentionEntity";
import {ITweet} from "../../Public/Models/Interfaces/ITweet";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";
import {ITwitterClient} from "../../Public/ITwitterClient";
import {IUser} from "../../Public/Models/Interfaces/IUser";
import {IExtendedTweet} from "../../Public/Models/Interfaces/DTO/IExtendedTweet";
import {Language} from '../../Public/Models/Enum/Language';
import {IPlace} from "../../Public/Models/Interfaces/IPlace";
import {IOEmbedTweet} from "../../Public/Models/Interfaces/IOEmbedTweet";
import DateTime from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime';

// Class representing a Tweet. https://dev.twitter.com/docs/api/1/get/statuses/show/%3Aid
export class Tweet implements ITweet {
  private _tweetDTO: ITweetDTO;
  public client: ITwitterClient;

  // #region Public Attributes

  private _createdBy: IUser;
  private _entities: ITweetEntities;

  private DTOUpdated(): void {
    this._createdBy = this._tweetDTO == null ? null : this.client.Factories.createUser(this._tweetDTO.createdBy);
    this._entities = this._tweetDTO == null ? null : new TweetEntities(this._tweetDTO, this.tweetMode);
  }

  constructor(tweetDTO: ITweetDTO, tweetMode: TweetMode, client: ITwitterClient) {
    this.client = client;

    // IMPORTANT: POSITION MATTERS! Look line below!
    this.tweetMode = tweetMode ?? TweetMode.Extended;

    // IMPORTANT: Make sure that the TweetDTO is set up after the TweetMode because it uses the TweetMode to initialize the Entities
    this.tweetDTO = tweetDTO;
  }

  get tweetDTO(): ITweetDTO {
    return this._tweetDTO;
  }

  set tweetDTO(value: ITweetDTO) {
    this._tweetDTO = value;
    this.DTOUpdated();
  }

  // #region Twitter API Attributes

  get id(): number {
    return this._tweetDTO.id;
  }

  set id(value: number) {
    this._tweetDTO.id = value;
  }

  get idStr(): string {
    return this._tweetDTO.idStr;
  }

  set idStr(value: string) {
    this._tweetDTO.idStr = value;
  }

  get text(): string {
    if (this._tweetDTO.text != null) {
      return this._tweetDTO.text;
    }

    if (this._tweetDTO.fullText == null) {
      return null;
    }

    if (this.displayTextRange == null) {
      return this._tweetDTO.fullText;
    }

    let contentStartIndex: number = (this.displayTextRange)[0];
    let contentEndIndex: number = (this.displayTextRange)[1];

    return UnicodeHelper.substringByTextElements(this._tweetDTO.fullText, contentStartIndex, contentEndIndex - contentStartIndex);
  }

  set text(value: string) {
    this._tweetDTO.text = value;
  }

  get prefix(): string {
    let text = this._tweetDTO.extendedTweet?.fullText ?? this._tweetDTO.fullText;

    if (text != null && this.displayTextRange != null) {
      let prefixEndIndex = (this.displayTextRange)[0];
      return text.substr(0, prefixEndIndex);
    }

    return null;
  }

  get suffix(): string {
    let text = this._tweetDTO.extendedTweet?.fullText ?? this._tweetDTO.fullText;

    if (text != null && this.displayTextRange != null) {
      let suffixStartIndex = (this.displayTextRange)[1];
      return UnicodeHelper.substringByTextElements(text, suffixStartIndex);
    }

    return null;
  }

  get fullText(): string {
    return this._tweetDTO.extendedTweet?.fullText ?? this._tweetDTO.fullText ?? this._tweetDTO.text;
  }

  set fullText(value: string) {
    this._tweetDTO.fullText = value;
  }

  get displayTextRange(): number[] {
    return this._tweetDTO.extendedTweet?.displayTextRange ?? this._tweetDTO.displayTextRange;
  }

  get safeDisplayTextRange(): number[] {
    return this.displayTextRange ?? [0, this.fullText.length]; // new[] { 0, this.FullText.length };
  }

  get extendedTweet(): IExtendedTweet {
    return this._tweetDTO.extendedTweet;
  }

  set extendedTweet(value: IExtendedTweet) {
    this._tweetDTO.extendedTweet = value;
  }

  get favorited(): boolean {
    return this._tweetDTO.favorited;
  }

  get favoriteCount(): number {
    return this._tweetDTO.favoriteCount ?? 0;
  }

  get coordinates(): ICoordinates {
    return this._tweetDTO.coordinates;
  }

  set coordinates(value: ICoordinates) {
    this._tweetDTO.coordinates = value;
  }

  get entities(): ITweetEntities {
    return this._entities;
  }

  get createdBy(): IUser {
    return this._createdBy;
  }

  get currentUserRetweetIdentifier(): ITweetIdentifier {
    return this._tweetDTO.currentUserRetweetIdentifier;
  }

  get createdAt(): DateTime { // DateTimeOffset
    return this._tweetDTO.createdAt;
  }

  get source(): string {
    return this._tweetDTO.source;
  }

  set source(value: string) {
    this._tweetDTO.source = value;
  }

  get truncated(): boolean {
    return this._tweetDTO.truncated;
  }

  get replyCount(): number {
    return this._tweetDTO.replyCount;
  }

  set replyCount(value: number) {
    this._tweetDTO.quoteCount = value;
  }

  get inReplyToStatusId(): number { // long?
    return this._tweetDTO.inReplyToStatusId;
  }

  set inReplyToStatusId(value: number) {
    this._tweetDTO.inReplyToStatusId = value;
  }

  get inReplyToStatusIdStr(): string {
    return this._tweetDTO.inReplyToStatusIdStr;
  }

  set inReplyToStatusIdStr(value: string) {
    this._tweetDTO.inReplyToStatusIdStr = value;
  }

  get inReplyToUserId(): number { // long?
    return this._tweetDTO.inReplyToUserId;
  }

  set inReplyToUserId(value: number) {
    this._tweetDTO.inReplyToUserId = value;
  }

  get inReplyToUserIdStr(): string {
    return this._tweetDTO.inReplyToUserIdStr;
  }

  set inReplyToUserIdStr(value: string) {
    this._tweetDTO.inReplyToUserIdStr = value;
  }

  get inReplyToScreenName(): string {
    return this._tweetDTO.inReplyToScreenName;
  }

  set inReplyToScreenName(value: string) {
    this._tweetDTO.inReplyToScreenName = value;
  }

  get contributorsIds(): number[] {
    return this._tweetDTO.contributorsIds;
  }

  get contributors(): Array<number> {
    return this._tweetDTO.contributors;
  }

  get retweetCount(): number {
    return this._tweetDTO.retweetCount;
  }

  get retweeted(): boolean {
    return this._tweetDTO.retweeted;
  }

  get isRetweet(): boolean {
    return this._tweetDTO.retweetedTweetDTO != null;
  }

  private _retweetedTweet: ITweet;

  get retweetedTweet(): ITweet {
    if (this._retweetedTweet == null) {
      this._retweetedTweet = this.client.Factories.createTweet(this._tweetDTO.retweetedTweetDTO);
    }

    return this._retweetedTweet;
  }

  get quoteCount(): number {  // int?
    return this._tweetDTO.quoteCount;
  }

  set quoteCount(value: number) {
    this._tweetDTO.quoteCount = value;
  }

  get quotedStatusId(): number {  // long?
    return this._tweetDTO.quotedStatusId;
  }

  get quotedStatusIdStr(): string {
    return this._tweetDTO.quotedStatusIdStr;
  }

  private _quotedTweet: ITweet;

  get quotedTweet(): ITweet {
    if (this._quotedTweet == null) {
      this._quotedTweet = this.client.Factories.createTweet(this._tweetDTO.quotedTweetDTO);
    }

    return this._quotedTweet;
  }

  get possiblySensitive(): boolean {
    return this._tweetDTO.possiblySensitive;
  }


  get language(): Language {
    return this._tweetDTO.language;
  }

  get place(): IPlace {
    return this._tweetDTO.place;
  }

  get scopes(): Dictionary<string, object> {
    return this._tweetDTO.scopes;
  }

  get filterLevel(): string {
    return this._tweetDTO.filterLevel;
  }

  get withheldCopyright(): boolean {
    return this._tweetDTO.withheldCopyright;
  }

  get withheldInCountries(): Array<string> {
    return this._tweetDTO.withheldInCountries;
  }

  get withheldScope(): string {
    return this._tweetDTO.withheldScope;
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

  get userMentions(): Array<IUserMentionEntity> {
    if (this.entities != null) {
      return this.entities.userMentions;
    }

    return null;
  }

  // #endregion

  // #region Tweetinvi API Attributes

  get url(): string {
    return `https://twitter.com/${this.createdBy?.screenName}/status/${this.id.toString(CultureInfo.InvariantCulture).toLocaleLowerCase()}`;
  }

  public tweetMode: TweetMode;

  // #endregion

  // #endregion

  public publishRetweetAsync(): Promise<ITweet> {
    return this.client.Tweets.publishRetweetAsync(this);
  }

  public getRetweetsAsync(): Promise<ITweet[]> {
    return this.client.Tweets.getRetweetsAsync(this);
  }

  public destroyRetweetAsync(): Promise<void> {
    return this.client.Tweets.destroyTweetAsync(this);
  }

  public generateOEmbedTweetAsync(): Promise<IOEmbedTweet> {
    return this.client.Tweets.getOEmbedTweetAsync(this);
  }

  public destroyAsync(): Promise<void> {
    return this.client.Tweets.destroyTweetAsync(this);
  }

  public favoriteAsync(): Promise<void> {
    return this.client.Tweets.favoriteTweetAsync(this);
  }

  public unfavoriteAsync(): Promise<void> {
    return this.client.Tweets.unfavoriteTweetAsync(this);
  }

  public ToString(): string {
    return this.fullText;
  }

  public equals(other: ITweet): boolean {
    if (other == null) {
      return false;
    }

    // Equals is currently used to compare only if 2 tweets are the same
    // We do not look for the tweet version (DateTime)

    return this._tweetDTO.equals(other.tweetDTO);
  }
}
