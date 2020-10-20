import IEnumerable from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
import {IUserEntities} from "../../Public/Models/Entities/IUserEntities";
import {UserIdentifierDTO} from "./UserIdentifierDTO";
import {IUserDTO} from "../../Public/Models/Interfaces/DTO/IUserDTO";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export class UserDTO extends UserIdentifierDTO implements IUserDTO {
  // Verify : ProfileImageTile

  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("status")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public status: ITweetDTO;

  // [JsonProperty("description")]
  public description: string;

  // [JsonProperty("created_at")]
  // [JsonConverter(typeof(JsonTwitterDateTimeOffsetConverter))]
  public createdAt: DateTime;  // DateTimeOffset;

  // [JsonProperty("location")]
  public location: string;

  // [JsonProperty("geo_enabled")]
  public geoEnabled?: boolean;

  // [JsonProperty("url")]
  public url: string;

  // [JsonProperty("email")]
  public email: string;

  // [JsonProperty("statuses_count")]
  public statusesCount: number;

  // [JsonProperty("followers_count")]
  public followersCount: number;

  // [JsonProperty("friends_count")]
  public friendsCount: number;

  // [JsonProperty("following")]
  public following?: boolean;

  // [JsonProperty("protected")]
  public protected: boolean;

  // [JsonProperty("verified")]
  public verified: boolean;

  // [JsonProperty("entities")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public entities: IUserEntities;

  // [JsonProperty("notifications")]
  public notifications?: boolean;

  // [JsonProperty("profile_image_url")]
  public profileImageUrlHttp: string;

  // [JsonProperty("profile_image_url_https")]
  public profileImageUrl: string;

  // [JsonProperty("follow_request_sent")]
    public followRequestSent?: boolean;

  // [JsonProperty("default_profile")]
  public defaultProfile: boolean;

  // [JsonProperty("default_profile_image")]
  public defaultProfileImage: boolean;

  // [JsonProperty("favourites_count")]
  public favoritesCount?: number;

  // [JsonProperty("listed_count")]
  public listedCount: number;

  // [JsonProperty("profile_sidebar_fill_color")]
  public profileSidebarFillColor: string;

  // [JsonProperty("profile_sidebar_border_color")]
  public profileSidebarBorderColor: string;

  // [JsonProperty("profile_background_tile")]
  public profileBackgroundTile: boolean;

  // [JsonProperty("profile_background_color")]
  public profileBackgroundColor: string;

  // [JsonProperty("profile_background_image_url")]
  public profileBackgroundImageUrl: string;

  // [JsonProperty("profile_background_image_url_https")]
  public profileBackgroundImageUrlHttps: string;

  // [JsonProperty("profile_banner_url")]
  public profileBannerURL: string;

  // [JsonProperty("profile_text_color")]
  public profileTextColor: string;

  // [JsonProperty("profile_link_color")]
  public profileLinkColor: string;

  // [JsonProperty("profile_use_background_image")]
  public profileUseBackgroundImage: boolean;

  // [JsonProperty("is_translator")]
  public isTranslator?: boolean;

  // [JsonProperty("contributors_enabled")]
  public contributorsEnabled?: boolean;

  // [JsonProperty("utc_offset")]
  public utcOffset?: number;

  // [JsonProperty("time_zone")]
  public timeZone: string;

  // [JsonProperty("withheld_in_countries")]
  public withheldInCountries: IEnumerable<string>;

  // [JsonProperty("withheld_scope")]
  public withheldScope: string;

  public toString(): string {
    return super.screenName;
  }
}
