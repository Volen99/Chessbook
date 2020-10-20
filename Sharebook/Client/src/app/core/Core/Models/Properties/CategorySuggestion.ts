import {ICategorySuggestion} from "../../../Public/Models/Interfaces/ICategorySuggestion";

export class CategorySuggestion implements ICategorySuggestion {
  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("slug")]
  public slug: string;

  // [JsonProperty("size")]
  public size: number;
}
