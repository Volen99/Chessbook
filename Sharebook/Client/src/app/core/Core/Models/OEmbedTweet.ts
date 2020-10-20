import {IOEmbedTweet} from "../../Public/Models/Interfaces/IOEmbedTweet";
import {IOEmbedTweetDTO} from "../../Public/Models/Interfaces/DTO/IOembedTweetDTO";

export class OEmbedTweet implements IOEmbedTweet {
  constructor(oEmbedTweetDTO: IOEmbedTweetDTO) {
    this.oembedTweetDTO = oEmbedTweetDTO;
  }

  public oembedTweetDTO: IOEmbedTweetDTO;

  get authorName(): string {
    return this.oembedTweetDTO.authorName;
  }

  get authorURL(): string {
    return this.oembedTweetDTO.authorURL;
  }

  get HTML(): string {
    return this.oembedTweetDTO.HTML;
  }

  get URL(): string {
    return this.oembedTweetDTO.URL;
  }

  get providerURL(): string {
    return this.oembedTweetDTO.providerURL;
  }

  get width(): number {
    return this.oembedTweetDTO.width;
  }

  get height(): number {
    return this.oembedTweetDTO.height;
  }

  get version(): string {
    return this.oembedTweetDTO.version;
  }

  get type(): string {
    return this.oembedTweetDTO.type;
  }

  get cacheAge(): string {
    return this.oembedTweetDTO.cacheAge;
  }
}
