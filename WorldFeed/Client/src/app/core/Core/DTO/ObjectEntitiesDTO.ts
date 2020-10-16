import {IObjectEntities} from "../../Public/Models/Entities/IObjectEntities";
import {IUrlEntity} from "../../Public/Models/Entities/IUrlEntity";
import {IUserMentionEntity} from "../../Public/Models/Entities/IUserMentionEntity";
import {IHashtagEntity} from "../../Public/Models/Entities/IHashTagEntity";
import {ISymbolEntity} from "../../Public/Models/Entities/ISymbolEntity";
import {IMediaEntity} from "../../Public/Models/Entities/IMediaEntity";

export class ObjectEntitiesDTO implements IObjectEntities {
  // [JsonProperty("urls")]
  public urls: Array<IUrlEntity>;

  // [JsonProperty("user_mentions")]
  public userMentions: Array<IUserMentionEntity>;

  // [JsonProperty("hashtags")]
  public hashtags: Array<IHashtagEntity>;

  // [JsonProperty("symbols")]
  public symbols: Array<ISymbolEntity>;

  // [JsonProperty("media")]
  public medias: Array<IMediaEntity>;
}
