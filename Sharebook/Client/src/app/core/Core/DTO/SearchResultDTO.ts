import {TweetWithSearchMetadataDTO} from "./TweetWithSearchMetadataDTO";
import {ISearchResultsDTO} from "../../Public/Models/Interfaces/DTO/ISearchResultsDTO";
import {ISearchMetadata} from "../../Public/Models/Interfaces/DTO/ISearchMetadata";

export class SearchResultsDTO implements ISearchResultsDTO {
  // [JsonProperty("statuses")]
  public tweetDTOs: TweetWithSearchMetadataDTO[];

  // [JsonProperty("search_metadata")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public searchMetadata: ISearchMetadata;
}
