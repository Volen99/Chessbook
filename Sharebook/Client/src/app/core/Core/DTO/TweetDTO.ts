import {JsonObject, JsonProperty, Any} from "json2typescript";

import {ITweetIdentifier} from "../../Public/Models/Interfaces/ITweetIdentifier";
import {ICoordinates} from "../../Public/Models/Interfaces/ICoordinates";
import {ITweetEntities} from "../../Public/Models/Entities/ITweetEntities";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";
import {IExtendedTweet} from "../../Public/Models/Interfaces/DTO/IExtendedTweet";
import {IUserDTO} from "../../Public/Models/Interfaces/DTO/IUserDTO";
import {IPlace} from "../../Public/Models/Interfaces/IPlace";
import {Language} from "../Attributes/Language";
import {ExtendedTweet} from "./ExtendedTweet";
import {Place} from "../Models/Properties/Place";
import {TweetEntities} from "../Models/TwitterEntities/TweetEntities";
import {Coordinates} from "../../Public/Models/Coordinates";
import {TweetIdentifier} from "../../Public/Models/TweetIdentifier";
import {UserDTO} from "./UserDTO";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

@JsonObject('TweetDTO')
export class TweetDTO implements ITweetDTO {
  // [JsonProperty("id")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("id", Number)
  public id: number;

  @JsonProperty("idStr", String)
  public idStr: string;

  @JsonProperty("text", String)
  public text: string;

  @JsonProperty("fullText", String)
  public fullText: string;

  @JsonProperty("displayTextRange", [Number])
  public displayTextRange: number[];

  // [JsonProperty("extended_tweet")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("extendedTweet", ExtendedTweet)
  public extendedTweet: IExtendedTweet;

  @JsonProperty("favorited", Boolean)
  public favorited: boolean;

  @JsonProperty("favoriteCount", Number)
  public favoriteCount?: number;

  // [JsonProperty("user")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("createdBy", UserDTO)
  public createdBy: IUserDTO;

  // [JsonProperty("current_user_retweet")]
  //     [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("currentUserRetweetIdentifier", TweetIdentifier)
  public currentUserRetweetIdentifier: ITweetIdentifier;

  // [JsonProperty("coordinates")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("coordinates", Coordinates)
  public coordinates: ICoordinates;

  // [JsonProperty("entities")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("legacyEntities", TweetEntities)
  public legacyEntities: ITweetEntities;

  // [JsonProperty("extended_entities")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("entities", TweetEntities)
  public entities: ITweetEntities;

  // [JsonProperty("created_at")]
  // [JsonConverter(typeof(JsonTwitterDateTimeOffsetConverter))]
  @JsonProperty("createdAt", DateTime)
  public createdAt: DateTime;  // DateTimeOffset;

  @JsonProperty("truncated", Boolean)
  public truncated: boolean;

  @JsonProperty("replyCount", Number)
  public replyCount?: number;

  @JsonProperty("inReplyToStatusId", Number)
  public inReplyToStatusId?: number;

  @JsonProperty("inReplyToStatusIdStr", String)
  public inReplyToStatusIdStr: string;

  @JsonProperty("inReplyToUserId", Number)
  public inReplyToUserId?: number;

  @JsonProperty("inReplyToUserIdStr", String)
  public inReplyToUserIdStr: string;

  @JsonProperty("inReplyToScreenName", String)
  public inReplyToScreenName: string;

  @JsonProperty("quoteCount", Number)
  public quoteCount?: number;

  @JsonProperty("quotedStatusId", Number)
  public quotedStatusId?: number;

  @JsonProperty("quotedStatusIdStr", String)
  public quotedStatusIdStr: string;

  // [JsonProperty("quoted_status")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("quotedTweetDTO", TweetDTO)
  public quotedTweetDTO: ITweetDTO;

  // [JsonProperty("retweet_count")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("retweetCount", Number)
  public retweetCount: number;

  // [JsonProperty("retweeted")]
  @JsonProperty("retweeted", Boolean)
  public retweeted: boolean;

  // [JsonProperty("retweeted_status")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("retweetedTweetDTO", TweetDTO)
  public retweetedTweetDTO: ITweetDTO;

  // [JsonProperty("possibly_sensitive")]
  @JsonProperty("possiblySensitive", Boolean)
  public possiblySensitive: boolean;

  // [JsonProperty("lang")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  @JsonProperty("language", Language)
  public language?: Language;

  @JsonProperty("contributorsIds", [Number])
  public contributorsIds: number[];

  @JsonProperty("contributors", [Number])
  public contributors: Array<number>;

  @JsonProperty("source", String)
  public source: string;

  @JsonProperty("place", Place)
  public place: IPlace;

  @JsonProperty("scopes", Any)
  public scopes: Dictionary<string, object>;

  @JsonProperty("filterLevel", String)
  public filterLevel: string;

  @JsonProperty("withheldCopyright", Boolean)
  public withheldCopyright: boolean;

  // [JsonProperty("withheld_in_countries")]
  @JsonProperty("withheldInCountries", [String])
  public withheldInCountries: Array<string>;

  @JsonProperty("withheldScope", String)
  public withheldScope: string;
}
