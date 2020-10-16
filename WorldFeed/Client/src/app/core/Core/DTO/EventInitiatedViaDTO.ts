import {IEventInitiatedViaDTO} from "../../Public/Models/Interfaces/DTO/IEventInitiatedViaDTO";

export class EventInitiatedViaDTO implements IEventInitiatedViaDTO {
  // [JsonProperty("tweet_id")]
  public tweetId: number;

  // [JsonProperty("welcome_message_id")]
  public welcomeMessageId?: number;
}
