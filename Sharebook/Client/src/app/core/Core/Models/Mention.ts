import {TweetMode} from "../../Public/Settings/SharebookSettings";
import {Tweet} from "./Tweet";
import {IMention} from "../../Public/Models/Interfaces/IMention";
import {ITwitterClient} from "../../Public/ITwitterClient";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";

export class Mention extends Tweet implements IMention {
  constructor(tweetDTO: ITweetDTO, tweetMode: TweetMode, client: ITwitterClient) {
    super(tweetDTO, tweetMode, client);
    // Default constructor inheriting from the default Tweet constructor
  }

  public annotations: string;
}
