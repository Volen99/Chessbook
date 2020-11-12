import {InjectionToken} from "@angular/core";
import {TwitterResponse} from "../../../webLogic/TwitterResponse";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";
import {Observable} from "rxjs";

export abstract class WebRequestResultExtension {
  public static toJson(/*this*/ twitterResponse: ITwitterResponse): string {
    let resultStream = twitterResponse.resultStream;
    if (resultStream != null) {
      let responseReader = null; // new StreamReader(resultStream);
      let json = responseReader; // responseReader.ReadLine();

      return json;
    }

    return null;
  }

  public static toBinary(/*this*/ twitterResponse: ITwitterResponse): number[] {
    let stream = twitterResponse.resultStream;

    if (stream == null) {
      return null;
    }

    let binary: number[];

    // using (var tempMemStream = new MemoryStream())
    // {
    //     byte[] buffer = new byte[128];
    //
    //     while (true)
    //     {
    //         int read = stream.Read(buffer, 0, buffer.Length);
    //
    //         if (read <= 0)
    //         {
    //             binary = tempMemStream.ToArray(); break;
    //         }
    //
    //         tempMemStream.Write(buffer, 0, read);
    //     }
    // }

    return binary;
  }
}

export interface ITwitterResponse {
  // Query url.
  URL: string;

  // Resulting stream to retrieve the data.
  resultStream: Observable<any>;                 // Stream ResultStream { get; set; }

  // Status Code of the query execution.
  statusCode: number;

  // Inform whether the query has succeeded.
  isSuccessStatusCode: boolean;

  // Headers of the response.
  headers: Dictionary<string, Array<string>>;

  binary: ArrayBuffer;
  content: string;
}

export const ITwitterResponseToken = new InjectionToken<ITwitterResponse>('ITwitterResponse', {
  providedIn: 'root',
  factory: () => new TwitterResponse(),
});
