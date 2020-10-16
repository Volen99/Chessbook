import {IHashtagEntity} from "../../../Public/Models/Entities/IHashTagEntity";

/// A hashtag is a keyword prefixed by # and representing a category of tweet
/// This class stores information related with an user mention
export class HashtagEntity implements IHashtagEntity {
  // [JsonProperty("text")]
  public text: string;

  // [JsonProperty("indices")]
  public indices: number[];

  public equals(other: IHashtagEntity): boolean {
    if (other == null || this.text !== other.text) {
      return false;
    }

    if (this.indices == null || other.indices == null) {
      return this.indices === other.indices;
    }

    let arr = ["1", "two"];
    let q = arr.toAddPostfix("fd");

    return this.indices.containsSameObjectsAs(other.indices, true);
  }

  public ToString(): string {
    return `#${this.text}`;
  }
}
