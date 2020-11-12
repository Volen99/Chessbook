import {Injectable} from "@angular/core";

import {ITwitterResponse} from "../core/Core/Web/ITwitterResponse";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

@Injectable({
  providedIn: 'root',
})
export class TwitterResponse implements ITwitterResponse {
  public URL: string;
  public resultStream: Promise<any>;
  public statusCode: number;
  public isSuccessStatusCode: boolean;
  public headers: Dictionary<string, Array<string>>;
  public binary: ArrayBuffer;
  public content: string;
}
