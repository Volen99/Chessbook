import {ITwitterResponse} from "../core/Core/Web/ITwitterResponse";
import {Stream} from "stream";
import Dictionary from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import IEnumerable from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";

export class TwitterResponse implements ITwitterResponse {
  public URL: string;
  public resultStream: Stream;
  public statusCode: number;
  public isSuccessStatusCode: boolean;
  public headers: Dictionary<string, IEnumerable<string>>;
  public binary: number[];
  public content: string;
}
