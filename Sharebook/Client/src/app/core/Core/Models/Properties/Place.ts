import Dictionary from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IPlace} from "../../../Public/Models/Interfaces/IPlace";
import { PlaceType } from 'src/app/components/models/settings/place-type.model';
import {IGeo} from "../../../Public/Models/Interfaces/IGeo";

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
