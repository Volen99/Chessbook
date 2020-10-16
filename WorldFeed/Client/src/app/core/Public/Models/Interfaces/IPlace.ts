import {PlaceType} from 'src/app/components/models/settings/place-type.model';
import {IGeo} from "./IGeo";
import Dictionary from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";

export interface IPlace {
  idStr: string;
  name: string;
  fullName: string;

  url: string;
  placeType: PlaceType;
  country: string;
  countryCode: string;

  attributes: Dictionary<string, string>;

  containedWithin: Array<IPlace>;

  boundingBox: IGeo;
  geometry: IGeo;
}
