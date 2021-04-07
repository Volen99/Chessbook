import {IHashtagEntity} from "./IHashTagEntity";
import {IUrlEntity} from "./IUrlEntity";
import {IMediaEntity} from "./IMediaEntity";
import {ISymbolEntity} from "./ISymbolEntity";
import {IUserMentionEntity} from "./IUserMentionEntity";
import {IPoll} from "../../../posts/models/poll/poll";

export interface IObjectEntities {
  // Collection of urls associated with a Post
  urls: Array<IUrlEntity>;

  // Collection of tweets mentioning this Post
  userMentions: Array<IUserMentionEntity>;

  // Collection of hashtags associated with a Post
  hashtags: Array<IHashtagEntity>;

  // Collection of symbols associated with a Post
  symbols: Array<ISymbolEntity>;

  // Collection of medias associated with a Post
  medias: Array<IMediaEntity>;

  poll: IPoll;
}
