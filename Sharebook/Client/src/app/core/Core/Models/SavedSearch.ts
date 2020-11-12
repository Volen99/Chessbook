import {ISavedSearchDTO} from "../../Public/Models/Interfaces/DTO/ISavedSearchDTO";
import {ISavedSearch} from "../../Public/Models/Interfaces/ISavedSearch";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export class SavedSearch implements ISavedSearch {
  private _savedSearchDTO: ISavedSearchDTO;

  constructor(savedSearchDTO: ISavedSearchDTO) {
    this._savedSearchDTO = savedSearchDTO;
  }

  get savedSearchDTO(): ISavedSearchDTO {
    return this._savedSearchDTO;
  }

  set savedSearchDTO(value: ISavedSearchDTO) {
    this._savedSearchDTO = value;
  }

  get id(): number {
    return this._savedSearchDTO.id;
  }

  get idStr(): string {
    return this._savedSearchDTO.idStr;
  }

  get name(): string {
    return this._savedSearchDTO.name;
  }

  set name(value: string) {
    this._savedSearchDTO.name = value;
  }

  get query(): string {
    return this._savedSearchDTO.query;
  }

  set query(value: string) {
    this._savedSearchDTO.query = value;
  }

  get createdAt(): DateTime {   // DateTimeOffset
    return this._savedSearchDTO.createdAt;
  }
}
