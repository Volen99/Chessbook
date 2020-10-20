import Task from "../c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task";
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import {IWebHelper} from "../core/Core/Helpers/IWebHelper";
import {Stream} from "stream";
import Uri from "../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";
import Dictionary from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";

export class WebHelper implements IWebHelper {
  constructor(request: ITwitterRequest): Task<Stream> {
    let httpClient = new HttpClient();
    return httpClient.GetStreamAsync(request.query.url);
  }

        public getURLParameters(url: string): Dictionary<string, string>
  {
            return GetUriParameters(new Uri(url));
        }

        public  getUriParameters(uri: Uri): Dictionary<string, string>
        {
            return GetQueryParameters(uri.Query);
        }

        public getQueryParameters(queryUrl: string):  Dictionary<string, string>
  {
            var uriParameters = new Dictionary<string, string>();

            if (!string.IsNullOrEmpty(queryUrl))
            {
                foreach (Match variable in Regex.Matches(queryUrl, @"(?<varName>[^&?=]+)=(?<value>[^&?=]*)"))
                {
                    uriParameters.Add(variable.Groups["varName"].Value, variable.Groups["value"].Value);
                }
            }

            return uriParameters;
        }

        public  getBaseURL(url: string): string
        {
            if (string.IsNullOrWhiteSpace(url))
            {
                return null;
            }

            if (Uri.TryCreate(url, UriKind.Absolute, out var uri))
            {
                return GetBaseURL(uri);
            }

            return null;
        }

        public  getBaseURL(uri: Uri): string
        {
            if (string.IsNullOrEmpty(uri.Query))
            {
                return uri.AbsoluteUri;
            }

            return uri.AbsoluteUri.Replace(uri.Query, string.Empty);
        }
    }
