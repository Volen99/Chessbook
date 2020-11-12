import IDictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/IDictionary";

export interface IWebhooksRequestInfoRetriever {
  getPath(): string;

  getQuery(): IDictionary<string, string[]>;

  getHeaders(): IDictionary<string, string[]>;
}

export interface IWebhooksRequest extends IWebhooksRequestInfoRetriever {
  getJsonFromBodyAsync(): Promise<string>;

  setResponseStatusCode(statusCode: number): void;

  writeInResponseAsync(content: string, contentType: string): Promise<void>;
}
