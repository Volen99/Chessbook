import {ISearchMetadata} from "../../Public/Models/Interfaces/DTO/ISearchMetadata";

export class SearchMetadata implements ISearchMetadata {
  // [JsonProperty("completed_in")]
  public completedIn: number;

  // [JsonProperty("max_id")]
  public maxId: number;

  // [JsonProperty("max_id_str")]
  public maxIdStr: string;

  // [JsonProperty("next_results")]
  public nextResults: string;

  // [JsonProperty("query")]
  public query: string;

  // [JsonProperty("refresh_url")]
  public refreshURL: string;

  // [JsonProperty("count")]
  public count: number;

  // [JsonProperty("since_id")]
  public sinceId: number;

  // [JsonProperty("since_id_str")]
  public sinceIdStr: string;
}
