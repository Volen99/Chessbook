import {IUserMentionEntity} from "../../../Public/Models/Entities/IUserMentionEntity";

// Object storing information related with an user mention on Twitter
export class UserMentionEntity implements IUserMentionEntity {
  // [JsonProperty("id")]
  public id: number; // long?

  // [JsonProperty("id_str")]
  public idStr: string;

  // [JsonProperty("screen_name")]
  public screenName: string;

  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("indices")]
  public indices: Array<number>;

  public equals(other: IUserMentionEntity): boolean {
    if (other == null || !this.id || !other.id) {
      return false;
    }

    if (this.id !== other.id) {
      return false;
    }

    if (this.indices == null || other.indices == null) {
      return this.indices === other.indices;      // this.Equals(this.indices, other.indices);
    }

    return this.indices.containsSameObjectsAs(other.indices, true);
  }

  public toString(): string {
    return `@${(this.screenName)}`;
  }
}
