import {IWoeIdLocation} from "../../../Public/Models/Interfaces/IWoeIdLocation";

export class WoeIdLocation implements IWoeIdLocation {
  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("woeid")]
  public woeId: number;
}
