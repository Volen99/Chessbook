import Dictionary from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IMediaEntitySize} from "../../Entities/IMediaEntitySize";

export interface ITwitterConfiguration {
  charactersReservedPerMedia: number;

  messageTextCharacterLimit: number;

  maxMediaPerUpload: number;

  nonUsernamePaths: string[];

  photoSizeLimit: number;

  photoSizes: Dictionary<string, IMediaEntitySize>;

  shortURLLength: number;

  shortURLLengthHttps: number;
}
