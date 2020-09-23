namespace WorldFeed.Upload.Exceptions
{
    using System;
    using System.IO;
    using System.Net;

    using WorldFeed.Common.Exceptions;
    using WorldFeed.Common.Wrappers;
    using WorldFeed.Upload.Infrastructure.Inject.Contracts;
    using WorldFeed.Upload.Properties;

    public class WebExceptionInfoExtractor : IWebExceptionInfoExtractor
    {
        private readonly IJObjectStaticWrapper jObjectStaticWrapper;
        private readonly IFactory<ITwitterExceptionInfo> twitterExceptionInfoUnityFactory;

        public WebExceptionInfoExtractor(IJObjectStaticWrapper jObjectStaticWrapper, IFactory<ITwitterExceptionInfo> twitterExceptionInfoUnityFactory)
        {
            this.jObjectStaticWrapper = jObjectStaticWrapper;
            this.twitterExceptionInfoUnityFactory = twitterExceptionInfoUnityFactory;
        }

        public int GetWebExceptionStatusNumber(WebException wex)
        {
            return GetWebExceptionStatusNumber(wex, -1);
        }

        public int GetWebExceptionStatusNumber(WebException wex, int defaultStatusCode)
        {
            if (wex.Response is HttpWebResponse wexResponse)
            {
                return (int)wexResponse.StatusCode;
            }

            return defaultStatusCode;
        }

        public string GetStatusCodeDescription(int statusCode)
        {
            return Resources.GetResourceByName($"ExceptionDescription_{statusCode}");
        }

        public ITwitterExceptionInfo[] GetTwitterExceptionInfo(WebException wex)
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

        private ITwitterExceptionInfo[] GetStreamInfo(HttpWebResponse wexResponse)
        {
            using (var stream = wexResponse.GetResponseStream())
            {
                return GetTwitterExceptionInfosFromStream(stream);
            }
        }

        public ITwitterExceptionInfo[] GetTwitterExceptionInfosFromStream(Stream stream)
        {
            if (stream == null)
            {
                return null;
            }

            string twitterExceptionInfo = null;
            try
            {
                using (var reader = new StreamReader(stream))
                {
                    twitterExceptionInfo = reader.ReadToEnd();
                    var jObject = this.jObjectStaticWrapper.GetJobjectFromJson(twitterExceptionInfo);
                    return this.jObjectStaticWrapper.ToObject<ITwitterExceptionInfo[]>(jObject["errors"]);
                }
            }
            catch (Exception)
            {
                var twitterInfo = this.twitterExceptionInfoUnityFactory.Create();
                twitterInfo.Message = twitterExceptionInfo;
                return new[] { twitterInfo };
            }
        }
    }
}
