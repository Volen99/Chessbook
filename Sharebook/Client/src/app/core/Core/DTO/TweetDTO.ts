import {ITweetIdentifier} from "../../Public/Models/Interfaces/ITweetIdentifier";
import {ICoordinates} from "../../Public/Models/Interfaces/ICoordinates";
import {ITweetEntities} from "../../Public/Models/Entities/ITweetEntities";
import IEnumerable from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";
import {IExtendedTweet} from "../../Public/Models/Interfaces/DTO/IExtendedTweet";
import {IUserDTO} from "../../Public/Models/Interfaces/DTO/IUserDTO";
import { Language } from '../../Public/Models/Enum/Language';
import {IPlace} from "../../Public/Models/Interfaces/IPlace";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export class TweetDTO implements ITweetDTO {
  // [JsonProperty("id")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public id: number;

  // [JsonProperty("id_str")]
  public idStr: string;

  // [JsonProperty("text")]
  public text: string;

  // [JsonProperty("full_text")]
  public fullText: string;

  // [JsonProperty("display_text_range")]
  public displayTextRange: number[];

  // [JsonProperty("extended_tweet")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public extendedTweet: IExtendedTweet;

  // [JsonProperty("favorited")]
  public favorited: boolean;

  // [JsonProperty("favorite_count")]
  public favoriteCount?: number;

  // [JsonProperty("user")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public createdBy: IUserDTO;

  // [JsonProperty("current_user_retweet")]
  //     [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public currentUserRetweetIdentifier: ITweetIdentifier;

  // [JsonProperty("coordinates")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public coordinates: ICoordinates;

  // [JsonProperty("entities")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public legacyEntities: ITweetEntities;

  // [JsonProperty("extended_entities")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public entities: ITweetEntities;

  // [JsonProperty("created_at")]
  // [JsonConverter(typeof(JsonTwitterDateTimeOffsetConverter))]
  public createdAt: DateTime;  // DateTimeOffset;

  // [JsonProperty("truncated")]
  public truncated: boolean;

  // [JsonProperty("reply_count")]
  public replyCount?: number;

  // [JsonProperty("in_reply_to_status_id")]
  public inReplyToStatusId?: number;

  // [JsonProperty("in_reply_to_status_id_str")]
  public inReplyToStatusIdStr: string;

  // [JsonProperty("in_reply_to_user_id")]
  public inReplyToUserId?: number;

  // [JsonProperty("in_reply_to_user_id_str")]
  public inReplyToUserIdStr: string;

  // [JsonProperty("in_reply_to_screen_name")]
  public inReplyToScreenName: string;

  // [JsonProperty("quote_count")]
  public quoteCount?: number;

  // [JsonProperty("quoted_status_id")]
  public quotedStatusId?: number;

  // [JsonProperty("quoted_status_id_str")]
  public quotedStatusIdStr: string;

  // [JsonProperty("quoted_status")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public quotedTweetDTO: ITweetDTO;

  // [JsonProperty("retweet_count")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public retweetCount: number;

  // [JsonProperty("retweeted")]
  public retweeted: boolean;

  // [JsonProperty("retweeted_status")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public retweetedTweetDTO: ITweetDTO;

  // [JsonProperty("possibly_sensitive")]
  public possiblySensitive: boolean;

  // [JsonProperty("lang")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public language?: Language;

  // [JsonProperty("contributorsIds")]
  public contributorsIds: number[];

  // [JsonProperty("contributors")]
  public contributors: IEnumerable<number>;

  // [JsonProperty("source")]
  public source: string;

  // [JsonProperty("place")]
  public place: IPlace;

  // [JsonProperty("scopes")]
  public scopes: Dictionary<string, object>;

  // [JsonProperty("filter_level")]
  public filterLevel: string;

  // [JsonProperty("withheld_copyright")]
  public withheldCopyright: boolean;

  // [JsonProperty("withheld_in_countries")]
  public withheldInCountries: IEnumerable<string>;

  // [JsonProperty("withheld_scope")]
  public withheldScope: string;
}
