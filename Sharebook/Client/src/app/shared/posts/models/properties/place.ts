import {IPlace} from "./IPlace";
import {PlaceType} from "../../../models/enums/place-type";
import {IGeo} from "./IGeo";

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
    public attributes: Map<string, string>;

    // [JsonProperty("contained_within")]
    public containedWithin: Array<IPlace>;

    // [JsonProperty("bounding_box")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public boundingBox: IGeo;

    // [JsonProperty("geometry")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public geometry: IGeo;
}
