import {ITrendLocation} from "../../Public/Models/Interfaces/ITrendLocation";
import {PlaceType} from '../../Public/Models/Enum/PlaceType';

export class TrendLocation implements ITrendLocation {
  private PlaceTypeDTO = class PlaceTypeDTO {
    // [JsonProperty("name")]
    public name: string;

    // [JsonProperty("code")]
    public code: number;
  };

  // [JsonProperty("woeid")]
  public woeId: number;

  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("country")]
  public country: string;

  // [JsonProperty("countryCode")]
  public countryCode: string;

  // [JsonProperty("url")]
  public url: string;

  // [JsonProperty("parentid")]
  public parentId: number;

  // [JsonProperty]
  get placeType(): PlaceType {
    if (this._placeTypeDTO == null) {
      return PlaceType.Undefined;
    }

    return this._placeTypeDTO.Code as PlaceType;
  }

  set placeType(value: PlaceType) {
    if (this._placeTypeDTO == null) {
      this._placeTypeDTO = new this.PlaceTypeDTO();
    }

    this._placeTypeDTO.Code = value as number;
  }

  // [JsonProperty("placeType")]
  private _placeTypeDTO: any; // PlaceTypeDTO;
}
