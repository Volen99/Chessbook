import {IUrlEntity} from "../../../Public/Models/Entities/IUrlEntity";

// Object storing information related with an URL on twitter
export class UrlEntity implements IUrlEntity {
  // [JsonProperty("url")]
  public URL: string;

  // [JsonProperty("display_url")]
  public displayedURL: string;

  // [JsonProperty("expanded_url")]
  public expandedURL: string;

  // [JsonProperty("indices")]
  public indices: Array<number>;

  public equals(other: IUrlEntity) {
    if (other == null) {
      return false;
    }

    let areUrlDifferent = this.URL !== other.URL ||
      this.expandedURL !== other.expandedURL ||
      this.displayedURL !== other.displayedURL;

    if (areUrlDifferent) {
      return false;
    }

    if (this.indices == null || other.indices == null) {
      return this.indices === other.indices;
    }

    // @ts-ignore
    return this.indices.containsSameObjectsAs(other.indices, true);
  }

  public ToString(): string {
    return this.URL;
  }
}
