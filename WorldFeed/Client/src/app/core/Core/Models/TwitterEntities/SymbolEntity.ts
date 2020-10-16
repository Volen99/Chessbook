import {ISymbolEntity} from "../../../Public/Models/Entities/ISymbolEntity";

export class SymbolEntity implements ISymbolEntity {
  // [JsonProperty("text")]
  public text: string;

  // [JsonProperty("indices")]
  public indices: number[];

  public equals(other: ISymbolEntity): boolean {
    if (other == null) {
      return false;
    }

    if (this.text !== other.text) {
      return false;
    }

    if (this.indices == null || other.indices == null) {
      return this.indices === other.indices;
    }

    return this.indices.ContainsSameObjectsAs(other.indices, true);
  }

  public ToString(): string {
    return `${Text}`;
  }
}
