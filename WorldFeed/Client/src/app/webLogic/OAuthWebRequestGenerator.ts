
// using HttpMethod = Tweetinvi.Models.HttpMethod;

import { IOAuthWebRequestGenerator } from '../core/Core/Web/IOAuthWebRequestGenerator';
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import DateTime from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {IWebHelper} from "../core/Core/Helpers/IWebHelper";
import { Dictionary } from '../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary';
import {HttpMethod} from "../core/Public/Models/Enum/HttpMethod";
import Uri from "../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";
import { IOAuthQueryParameter } from '../core/Core/Web/IOAuthQueryParameter';
import ICollection from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/ICollection";
import {OAuthQueryParameter} from "./OAuthQueryParameter";
import {IReadOnlyConsumerCredentials} from "../core/Core/Models/Authentication/ReadOnlyConsumerCredentials";
import {IAuthenticationRequest} from "../core/Public/Models/Authentication/IAuthenticationRequest";
import {IReadOnlyTwitterCredentials} from "../core/Core/Models/Authentication/ReadOnlyTwitterCredentials";
import {ITwitterQuery} from "../core/Public/Models/Interfaces/ITwitterQuery";
import KeyValuePair from "../c#-objects/TypeScript.NET-Core/packages/Core/source/KeyValuePair";


    export interface IOAuthWebRequestGeneratorFactory
    {
         Create(): IOAuthWebRequestGenerator;
         Create(request: ITwitterRequest): IOAuthWebRequestGenerator;
    }

    export class OAuthWebRequestGeneratorFactory implements IOAuthWebRequestGeneratorFactory
    {
        private readonly _webHelper: IWebHelper;

        constructor(webHelper: IWebHelper)
        {
            this._webHelper = webHelper;
        }

        public  Create(): IOAuthWebRequestGenerator
        {
            return new OAuthWebRequestGenerator(this._webHelper, () =>
            {
                return DateTime.UtcNow;
            });
        }

        public  Create(request: ITwitterRequest): IOAuthWebRequestGenerator
        {
            return new OAuthWebRequestGenerator(this._webHelper, request.executionContext.GetUtcDateTime);
        }
    }

    public class OAuthWebRequestGenerator implements IOAuthWebRequestGenerator
    {
        private readonly _webHelper: IWebHelper;
        private readonly _getUtcDateTime: () => DateTime;

        constructor(webHelper: IWebHelper, getUtcDateTime: () => DateTime)
        {
            this._webHelper = webHelper;
            this._getUtcDateTime = getUtcDateTime;
        }

        // #region Algorithms

        private  GenerateSignature(uri: Uri, httpMethod: HttpMethod,
                                   queryParameters: Array<IOAuthQueryParameter>,
                                   urlParameters: Dictionary<string, string>): string
        {
            let oAuthQueryParameters = queryParameters.ToArray();
            let signatureParameters = GetSignatureParameters(oAuthQueryParameters, urlParameters);
            let formattedUrlParameters = CreateFormattedUrlParameters(signatureParameters);
            let oAuthRequest = CreateOAuthRequest(uri, httpMethod, formattedUrlParameters);
            let oAuthSecretKey = CreateOAuthSecretKey(oAuthQueryParameters);

            let hmacsha1Generator = new HMACSHA1Generator();
            return StringFormater.UrlEncode(Convert.ToBase64String(hmacsha1Generator.ComputeHash(oAuthRequest, oAuthSecretKey, Encoding.UTF8)));
        }

        private static GetSignatureParameters(queryParameters: Array<IOAuthQueryParameter>, urlParameters: Dictionary<string, string>):  IEnumerable<KeyValuePair<string, string>>
    {
            let signatureParameters = urlParameters.OrderBy(x => x.Key).ToList();
            let queryParametersRequiredForSignature = queryParameters.Where(x => x.RequiredForSignature);

            queryParametersRequiredForSignature.ForEach(x => { signatureParameters.Add(new KeyValuePair<string, string>(x.Key, x.Value)); });

            return signatureParameters;
        }

        private static  CreateFormattedUrlParameters(signatureParameters: Array<KeyValuePair<string, string>>): string
        {
            let orderedParameters = signatureParameters.OrderBy(x => x.Key);
            return string.Join("&", orderedParameters.Select(x => `${x.Key}=${x.Value}));
        }

        private static  CreateOAuthSecretKey(oAuthQueryParameters: IEnumerable<IOAuthQueryParameter>): string
        {
            var oAuthSecretKeyHeaders = oAuthQueryParameters.Where(x => x.IsPartOfOAuthSecretKey)
                .OrderBy(x => x.Key)
                .Select(x => StringFormater.UrlEncode(x.Value));

            return string.Join("&", oAuthSecretKeyHeaders);
        }

        private static  CreateOAuthRequest(uri: Uri, httpMethod: HttpMethod, urlParametersFormatted: string): string
        {
            var url = uri.Query == "" ? uri.AbsoluteUri : uri.AbsoluteUri.Replace(uri.Query, "");
            var encodedUrl = StringFormater.UrlEncode(url);
            var encodedParameters = StringFormater.UrlEncode(urlParametersFormatted);

            return `${httpMethod}&${encodedUrl}&${encodedParameters}`;
        }

        private  GenerateHeader(
          uri: Uri,
          httpMethod: HttpMethod,
          queryParameters: ICollection<IOAuthQueryParameter>,
          urlParameters: Dictionary<string, string>): string
        {
            var signature = GenerateSignature(uri, httpMethod, queryParameters, urlParameters);
            var oAuthSignature = new OAuthQueryParameter("oauth_signature", signature, false, false, false);
            queryParameters.Add(oAuthSignature);

            var parametersFormattedForHeader = CreateParametersFormattedForHeader(queryParameters);
            var headerSignature = `oauth_signature=\`${signature}\"`;

            return `OAuth ${parametersFormattedForHeader},${headerSignature}`;
        }

        private static  CreateParametersFormattedForHeader(queryParameters: ICollection<IOAuthQueryParameter>): string
        {
            let parametersForHeader = queryParameters.filter(x => x.RequiredForHeader)
                .OrderBy(x => x.Key)
                .Select(param => `${param.Key}=\"${param.Value}\"`);

            return string.join(",", parametersForHeader);
        }

        /// <summary>
        /// Method Allowing to initialize a SortedDictionnary to enable oAuth query to be generated with
        /// these parameters
        /// </summary>
        /// <returns>Call the method defined in the _generateDelegate and return a string result
        /// This result will be the header of the WebRequest.</returns>
        private  GenerateAdditionalHeaderParameters(queryParameters: Array<IOAuthQueryParameter>): Array<IOAuthQueryParameter>
        {
            let result = queryParameters.ToList();

            let dateTime = _getUtcDateTime();
            let ts = dateTime - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            let oauthTimestamp = Convert.ToInt64(ts.TotalSeconds).ToString(CultureInfo.InvariantCulture);
            let oauthNonce = new Random().Next(123400, 9999999).ToString(CultureInfo.InvariantCulture);

            // Required information
            result.Add(new OAuthQueryParameter("oauth_nonce", oauthNonce, true, true, false));
            result.Add(new OAuthQueryParameter("oauth_timestamp", oauthTimestamp, true, true, false));
            result.Add(new OAuthQueryParameter("oauth_version", "1.0", true, true, false));
            result.Add(new OAuthQueryParameter("oauth_signature_method", "HMAC-SHA1", true, true, false));

            return result;
        }

       // #endregion

        private static GenerateConsumerParameters(consumerCredentials: IReadOnlyConsumerCredentials): Array<IOAuthQueryParameter>
    {
            var consumerHeaders = new Array<IOAuthQueryParameter>();

            // Add Header for every connection to a Twitter Application
            if (consumerCredentials != null &&
                !string.IsNullOrEmpty(consumerCredentials.consumerKey) &&
                !string.IsNullOrEmpty(consumerCredentials.consumerSecret))
            {
                consumerHeaders.Add(new OAuthQueryParameter("oauth_consumer_key", StringFormater.UrlEncode(consumerCredentials.consumerKey), true, true, false));
                consumerHeaders.Add(new OAuthQueryParameter("oauth_consumer_secret", StringFormater.UrlEncode(consumerCredentials.consumerSecret), false, false, true));
            }

            return consumerHeaders;
        }

        public generateApplicationParameters(
          temporaryCredentials: IReadOnlyConsumerCredentials,
          authRequest: IAuthenticationRequest = null,
          additionalParameters: Array<IOAuthQueryParameter> = null): Array<IOAuthQueryParameter>
    {
            let headers = GenerateConsumerParameters(temporaryCredentials).ToList();

            // Add Header for authenticated connection to a Twitter Application
            if (authRequest != null &&
                !string.IsNullOrEmpty(authRequest.authorizationKey) &&
                !string.IsNullOrEmpty(authRequest.authorizationSecret))
            {
                headers.Add(new OAuthQueryParameter("oauth_token", StringFormater.UrlEncode(authRequest.authorizationKey), true, true, false));
                headers.Add(new OAuthQueryParameter("oauth_token_secret", StringFormater.UrlEncode(authRequest.authorizationSecret), false, false, true));
            }
            else
            {
                headers.Add(new OAuthQueryParameter("oauth_token", "", false, false, true));
            }

            if (additionalParameters != null)
            {
                headers.AddRange(additionalParameters);
            }

            return headers;
        }

        public generateParameters(credentials: IReadOnlyTwitterCredentials, additionalParameters: Array<IOAuthQueryParameter> = null): IEnumerable<IOAuthQueryParameter>
    {
            let headers = GenerateConsumerParameters(credentials).ToList();

            // Add Header for authenticated connection to a Twitter Application
            if (credentials != null &&
                !string.IsNullOrEmpty(credentials.accessToken) &&
                !string.IsNullOrEmpty(credentials.accessTokenSecret))
            {
                headers.Add(new OAuthQueryParameter("oauth_token", StringFormater.UrlEncode(credentials.accessToken), true, true, false));
                headers.Add(new OAuthQueryParameter("oauth_token_secret", StringFormater.UrlEncode(credentials.accessTokenSecret), false, false, true));
            }
            else
            {
                headers.Add(new OAuthQueryParameter("oauth_token", "", false, false, true));
            }

            if (additionalParameters != null)
            {
                headers.AddRange(additionalParameters);
            }

            return headers;
        }

        public  generateParameter(key: string, value: string, requiredForSignature: boolean, requiredForHeader: boolean, isPartOfOAuthSecretKey: boolean): IOAuthQueryParameter
        {
            return new OAuthQueryParameter(key, StringFormater.UrlEncode(value), requiredForSignature, requiredForHeader, isPartOfOAuthSecretKey);
        }

        public  generateAuthorizationHeader(uri: Uri, httpMethod: HttpMethod, parameters: Array<IOAuthQueryParameter>): string
        {
            let queryParameters = GenerateAdditionalHeaderParameters(parameters);
            let urlParameters = _webHelper.GetUriParameters(uri);
            return GenerateHeader(uri, httpMethod, queryParameters, urlParameters);
        }

        public async  generateAuthorizationHeaderAsync(
          uri: Uri,
          queryContent: HttpContent,
          httpMethod: HttpMethod,
          parameters: Array<IOAuthQueryParameter>): Promise<string>
        {
            var queryParameters = GenerateAdditionalHeaderParameters(parameters);
            var urlParameters = _webHelper.GetUriParameters(uri);

            if (queryContent != null)
            {
                var query = await queryContent.ReadAsStringAsync().ConfigureAwait(false);
                var additionalParameters = _webHelper.GetQueryParameters(query);

                additionalParameters.ForEach(x => { urlParameters.Add(x.Key, x.Value); });
            }

            return GenerateHeader(uri, httpMethod, queryParameters, urlParameters);
        }

        public async setTwitterQueryAuthorizationHeaderAsync(twitterQuery: ITwitterQuery):  Promise<string>
    {
            var credentials = twitterQuery.twitterCredentials;

            if (!string.IsNullOrEmpty(credentials.accessToken) && !string.IsNullOrEmpty(credentials.accessTokenSecret))
            {
                let uri = new Uri(twitterQuery.url);
                let credentialsParameters = GenerateParameters(twitterQuery.twitterCredentials);

                if (twitterQuery.httpContent != null && twitterQuery.isHttpContentPartOfQueryParams)
                {
                    twitterQuery.authorizationHeader = await GenerateAuthorizationHeaderAsync(uri, twitterQuery.httpContent, twitterQuery.httpMethod, credentialsParameters).ConfigureAwait(false);
                }
                else
                {
                    twitterQuery.authorizationHeader = GenerateAuthorizationHeader(uri, twitterQuery.httpMethod, credentialsParameters);
                }
            }
            else
            {
                twitterQuery.authorizationHeader = `Bearer ${credentials.bearerToken}`;
            }

            return twitterQuery.authorizationHeader;
        }
    }
