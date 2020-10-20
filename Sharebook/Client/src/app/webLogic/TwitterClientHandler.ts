import {ITwitterClientHandler} from "../core/Core/Web/ITwitterClientHandler";
import {IOAuthWebRequestGenerator} from "../core/Core/Web/IOAuthWebRequestGenerator";
import {ITwitterQuery} from '../core/Public/Models/Interfaces/ITwitterQuery';

export class TwitterClientHandler extends HttpClientHandler implements ITwitterClientHandler {
  private readonly _action: (twitterQuery: ITwitterQuery, httpRequestMessage: HttpRequestMessage) => void;
  private readonly _func: (twitterQuery: ITwitterQuery, httpRequestMessage: HttpRequestMessage) => string;
  protected WebRequestGenerator: IOAuthWebRequestGenerator;

  private _twitterQuery: ITwitterQuery;

  constructor(oAuthWebRequestGenerator: IOAuthWebRequestGenerator, func?: (twitterQuery: ITwitterQuery, httpRequestMessage: HttpRequestMessage) => string | void,
              isFuncReturningVoid?: boolean) {
    super();

    if (func) {
      if (isFuncReturningVoid) {
        this._action = func;
      } else {
        this._func = func as ((twitterQuery: ITwitterQuery, httpRequestMessage: HttpRequestMessage) => string);
      }
    }

    super.UseCookies = false;
    super.UseDefaultCredentials = false;

    this.WebRequestGenerator = oAuthWebRequestGenerator;
  }

      get twitterQuery(): ITwitterQuery {
        return this._twitterQuery;
      }

      set twitterQuery(value: ITwitterQuery) {
        this._twitterQuery = value;

        if (value != null) {
          super.Proxy = value.proxyConfig;

          if (Proxy != null) {
            UseProxy = true;
          }
        }
        else {
          super.Proxy = null;
          super.UseProxy = false;
        }
      }

        protected SendAsync(request: HttpRequestMessage, cancellationToken: CancellationToken):  Promise<HttpResponseMessage>
  {
            return SendAsync(this._twitterQuery, request, cancellationToken);
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
