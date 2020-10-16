import {IPlace} from "../IPlace";

export class SearchGeoSearchResultDTO {
  public GeoSearchResultDTO = class {
    // [JsonProperty("places")]
    public places: IPlace[];
  };

  // [JsonProperty("result")]
  public result: any; // GeoSearchResultDTO
}
