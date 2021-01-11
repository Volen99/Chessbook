import {IPlace} from "../../../Public/Models/Interfaces/IPlace";
import {IGeo} from "../../../Public/Models/Interfaces/IGeo";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";
import {PlaceType} from "../../../Public/Models/Enum/PlaceType";

export class Place implements IPlace {
  // [JsonProperty("id")]
  public idStr: string;

  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("full_name")]
  public fullName: string;

  // [JsonProperty("url")]
  public url: string;

  // [JsonProperty("place_type")]
  public placeType: PlaceType;

  // [JsonProperty("country")]
  public country: string;

  // [JsonProperty("country_code")]
  public countryCode: string;

  // [JsonProperty("attributes")]
  public attributes: Dictionary<string, string>;

  // [JsonProperty("contained_within")]
  public containedWithin: Array<IPlace>;

  // [JsonProperty("bounding_box")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public boundingBox: IGeo;

  // [JsonProperty("geometry")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public geometry: IGeo;
}
