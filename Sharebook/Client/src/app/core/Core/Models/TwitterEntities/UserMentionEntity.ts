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
      return this.equals(Indices, other.indices);
    }

    return this.indices.ContainsSameObjectsAs(other.indices, true);
  }

  public ToString(): string {
    return `@${(this.screenName)}`;
  }
}
