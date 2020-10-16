import {IHashtagEntity} from "./IHashTagEntity";
import {IUrlEntity} from "./IUrlEntity";
import {IMediaEntity} from "./IMediaEntity";
import {ISymbolEntity} from "./ISymbolEntity";
import {IUserMentionEntity} from "./IUserMentionEntity";

export interface IObjectEntities {
  // Collection of urls associated with a Tweet
  urls: Array<IUrlEntity>;

  // Collection of tweets mentioning this Tweet
  userMentions: Array<IUserMentionEntity>;

  // Collection of hashtags associated with a Tweet
  hashtags: Array<IHashtagEntity>;

  // Collection of symbols associated with a Tweet
  symbols: Array<ISymbolEntity>;

  // Collection of medias associated with a Tweet
  medias: Array<IMediaEntity>;
}
