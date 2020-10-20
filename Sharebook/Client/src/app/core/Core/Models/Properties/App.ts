import {IApp} from "../../../Public/Models/Interfaces/IApp";

export class App implements IApp {
  // [JsonProperty("id")]
  public id: number;

  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("url")]
  public url: string;
}
