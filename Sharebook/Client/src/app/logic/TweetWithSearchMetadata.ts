import {Tweet} from "../core/Core/Models/Tweet";
import {ITweetWithSearchMetadata} from "../core/Public/Models/Interfaces/ITweetWithSearchMetadata";
import {ITweetWithSearchMetadataDTO} from "../core/Public/Models/Interfaces/DTO/ITweetWithSearchMetadataDTO";
import {TweetMode} from "../core/Public/Settings/SharebookSettings";
import {ITwitterClient} from "../core/Public/ITwitterClient";
import {ITweetFromSearchMetadata} from '../core/Public/Models/Interfaces/DTO/ITweetFromSearchMetadata';

export class TweetWithSearchMetadata extends Tweet implements ITweetWithSearchMetadata {
  private readonly _tweetWithSearchMetadataDTO: ITweetWithSearchMetadataDTO;

  constructor(tweetDTO: ITweetWithSearchMetadataDTO, tweetMode?: TweetMode, client: ITwitterClient) {
    super(tweetDTO, tweetMode, client);
    this._tweetWithSearchMetadataDTO = tweetDTO;
  }

  get searchMetadata(): ITweetFromSearchMetadata {
    return this._tweetWithSearchMetadataDTO.tweetFromSearchMetadata;
  }
}
