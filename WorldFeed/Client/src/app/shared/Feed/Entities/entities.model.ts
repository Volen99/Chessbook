import { Hashtag } from './hashtag.model';
import { Url } from './url.model';
import { UserMention } from './user-mention.model';
import { SymbolModel } from './symbol.model';
import { Media } from './media/media.model';

export interface Entities {
  hashtags: Array<Hashtag>;
  symbols: Array<SymbolModel>;
  userMentions: Array<UserMention>;
  urls: Array<Url>;
  media?: Array<Media>;

}
