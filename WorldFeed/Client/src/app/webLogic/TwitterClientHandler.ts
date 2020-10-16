import {ITwitterClientHandler} from "../core/Core/Web/ITwitterClientHandler";
import {Action, Func} from "../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
import {IOAuthWebRequestGenerator} from "../core/Core/Web/IOAuthWebRequestGenerator";
import { ITwitterQuery } from '../core/Public/Models/Interfaces/ITwitterQuery';

export class TwitterClientHandler extends HttpClientHandler implements ITwitterClientHandler
    {
        private readonly _action: Action<ITwitterQuery, HttpRequestMessage>;
        private readonly _func: Func<ITwitterQuery, HttpRequestMessage, string>;
        protected WebRequestGenerator: IOAuthWebRequestGenerator

        private _twitterQuery: ITwitterQuery;

        public TwitterClientHandler(oAuthWebRequestGenerator: IOAuthWebRequestGenerator)
        {
            UseCookies = false;
            UseDefaultCredentials = false;

            WebRequestGenerator = oAuthWebRequestGenerator;
        }

        public TwitterClientHandler(IOAuthWebRequestGenerator oAuthWebRequestGenerator, Action<ITwitterQuery, HttpRequestMessage> action) : this(oAuthWebRequestGenerator)
        {
            _action = action;
        }

        public TwitterClientHandler(IOAuthWebRequestGenerator oAuthWebRequestGenerator, Func<ITwitterQuery, HttpRequestMessage, string> func) : this(oAuthWebRequestGenerator)
        {
            _func = func;
        }

        public ITwitterQuery twitterQuery
        {
            get => _twitterQuery;
            set
            {
                _twitterQuery = value;

                if (value != null)
                {
                    Proxy = value.ProxyConfig;

                    if (Proxy != null)
                    {
                        UseProxy = true;
                    }
                }
                else
                {
                    Proxy = null;
                    UseProxy = false;
                }
            }
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return SendAsync(_twitterQuery, request, cancellationToken);
        }

        protected virtual async Task<HttpResponseMessage> SendAsync(ITwitterQuery twitterQuery, HttpRequestMessage request, CancellationToken cancellationToken)
        {
            _action?.Invoke(twitterQuery, request);

            if (twitterQuery.AuthorizationHeader == null)
            {
                if (_func != null)
                {
                    twitterQuery.AuthorizationHeader = _func(twitterQuery, request);
                }
                else
                {
                    await WebRequestGenerator.SetTwitterQueryAuthorizationHeaderAsync(twitterQuery).ConfigureAwait(false);
                }
            }

            return await SendAsync(request, cancellationToken, twitterQuery.AuthorizationHeader).ConfigureAwait(false);
        }

        protected Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken, string authorizationHeader)
        {
            request.Headers.Add("User-Agent", "Tweetinvi/5.0.0-beta-1");
            request.Headers.ExpectContinue = false;
            request.Headers.CacheControl = new CacheControlHeaderValue { NoCache = true };
            request.Headers.Add("Authorization", authorizationHeader);
            request.Version = new Version("1.1");

            _twitterQuery?.AcceptHeaders.ForEach(contentType =>
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(contentType));
            });

            _twitterQuery?.CustomHeaders.ForEach(customHeader =>
            {
                if (customHeader.Behaviour == CustomHeaderWill.RemoveGeneratedHeaders)
                {
                    request.Headers.Remove(customHeader.Key);
                    return;
                }

                if (customHeader.Behaviour == CustomHeaderWill.OverrideGeneratedHeaders)
                {
                    if (request.Headers.Contains(customHeader.Key))
                    {
                        request.Headers.Remove(customHeader.Key);
                    }
                }

                request.Headers.TryAddWithoutValidation(customHeader.Key, customHeader.Values);
            });

            return base.SendAsync(request, cancellationToken);
        }
    }
