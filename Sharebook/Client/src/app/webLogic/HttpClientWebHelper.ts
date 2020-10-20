import {IHttpClientWebHelper} from "../core/Core/Helpers/IHttpClientWebHelper";
import {ITwitterQuery} from "../core/Public/Models/Interfaces/ITwitterQuery";
import ArgumentException from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import {ITwitterClientHandler} from "../core/Core/Web/ITwitterClientHandler";
import {IOAuthWebRequestGeneratorFactory} from "./OAuthWebRequestGenerator";
import HttpMethod from "../c#-objects/TypeScript.NET-Core/packages/Web/source/Net/Http/HttpMethod";
import {TwitterClientHandler} from "./TwitterClientHandler";

export class HttpClientWebHelper implements IHttpClientWebHelper
    {
        private readonly _oAuthWebRequestGeneratorFactory: IOAuthWebRequestGeneratorFactory;

        constructor(oAuthWebRequestGeneratorFactory: IOAuthWebRequestGeneratorFactory)
        {
            this._oAuthWebRequestGeneratorFactory = oAuthWebRequestGeneratorFactory;
        }

        public async  getHttpResponseAsync(twitterQuery: ITwitterQuery, handler: ITwitterClientHandler = null): Promise<HttpResponseMessage>
        {
            using (var client = GetHttpClient(twitterQuery, handler))
            {
                client.Timeout = twitterQuery.timeout;

                var httpMethod = new HttpMethod(twitterQuery.httpMethod.toString());

                if (twitterQuery.httpContent == null)
                {
                    return await client.SendAsync(new HttpRequestMessage(httpMethod, twitterQuery.url)).ConfigureAwait(false);
                }
                else
                {
                    if (httpMethod !== HttpMethod.POST)
                    {
                        throw new ArgumentException("Cannot send HttpContent in a WebRequest that is not POST.");
                    }

                    return await client.PostAsync(twitterQuery.url, twitterQuery.httpContent).ConfigureAwait(false);
                }
            }
        }

        public  getHttpClient(twitterQuery: ITwitterQuery, twitterHandler: ITwitterClientHandler = null): HttpClient
        {
            let oAuthWebRequestGenerator = this._oAuthWebRequestGeneratorFactory.create();
            let handler = (twitterHandler as TwitterClientHandler) ?? new TwitterClientHandler(oAuthWebRequestGenerator);
            handler.twitterQuery = twitterQuery;

            let client = new HttpClient(handler);
            client.Timeout = twitterQuery.timeout;

            return client;
        }
    }
