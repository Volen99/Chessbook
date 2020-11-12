import {IMediaEntitySize} from "../../Entities/IMediaEntitySize";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

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
