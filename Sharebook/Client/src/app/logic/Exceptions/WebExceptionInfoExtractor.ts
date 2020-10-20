import {IWebExceptionInfoExtractor} from "../../core/Core/Exceptions/IWebExceptionInfoExtractor";
import {ITwitterExceptionInfo} from "../../core/Core/Exceptions/ITwitterExceptionInfo";
import {Stream} from "stream";
import {LogicResources} from "../Properties/logic-resources";

export class WebExceptionInfoExtractor implements IWebExceptionInfoExtractor
    {
        private readonly _jObjectStaticWrapper: IJObjectStaticWrapper;
        private readonly _twitterExceptionInfoUnityFactory: IFactory<ITwitterExceptionInfo>;

        constructor(jObjectStaticWrapper: IJObjectStaticWrapper, twitterExceptionInfoUnityFactory: IFactory<ITwitterExceptionInfo>)
        {
            this._jObjectStaticWrapper = jObjectStaticWrapper;
            this._twitterExceptionInfoUnityFactory = twitterExceptionInfoUnityFactory;
        }

        public  getWebExceptionStatusNumber(wex: WebException): number
        {
            return GetWebExceptionStatusNumber(wex, -1);
        }

        public  getWebExceptionStatusNumber(wex: WebException, defaultStatusCode: number): number
        {
            if (wex.Response is HttpWebResponse wexResponse)
            {
                return (int)wexResponse.StatusCode;
            }

            return defaultStatusCode;
        }

        public  getStatusCodeDescription(statusCode: number): string
        {
            return LogicResources.GetResourceByName(`ExceptionDescription_${statusCode}`);
        }

        public getTwitterExceptionInfo(wex: WebException): ITwitterExceptionInfo[]
{
            var wexResponse = wex.Response as HttpWebResponse;

            if (wexResponse == null)
            {
                return new ITwitterExceptionInfo[0];
            }

            try
            {
                return GetStreamInfo(wexResponse);
            }
            catch (WebException) { }

            return new ITwitterExceptionInfo[0];
        }

        private  GetStreamInfo(wexResponse: HttpWebResponse): ITwitterExceptionInfo[]
        {
            using (var stream = wexResponse.GetResponseStream())
            {
                return GetTwitterExceptionInfosFromStream(stream);
            }
        }

        public getTwitterExceptionInfosFromStream(stream: Stream):  ITwitterExceptionInfo[]
        {
            if (stream == null) {
                return null;
            }

            let twitterExceptionInfo: string = null;
            try
            {
                using (var reader = new StreamReader(stream))
                {
                    twitterExceptionInfo = reader.ReadToEnd();
                    var jObject = _jObjectStaticWrapper.GetJobjectFromJson(twitterExceptionInfo);
                    return _jObjectStaticWrapper.ToObject<ITwitterExceptionInfo[]>(jObject["errors"]);
                }
            }
            catch (Exception)
            {
                var twitterInfo = _twitterExceptionInfoUnityFactory.Create();
                twitterInfo.Message = twitterExceptionInfo;
                return new[] {twitterInfo};
            }
        }
    }
