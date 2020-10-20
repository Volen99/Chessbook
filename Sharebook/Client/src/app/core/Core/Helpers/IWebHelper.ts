import Uri from "../../../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";
import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {Stream} from "stream";
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";

export interface IWebHelper {
  getResponseStreamAsync(request: ITwitterRequest): Promise<Stream>;

  getUriParameters(uri: Uri): Dictionary<string, string>;

  getURLParameters(url: string): Dictionary<string, string>;

  getQueryParameters(queryUrl: string): Dictionary<string, string>;

  getBaseURL(url: string): string;

  getBaseURL(uri: Uri): string;
}
