namespace Sharebook.Common.Exceptions
{
    using System.IO;
    using System.Net;

    public interface IWebExceptionInfoExtractor
    {
        int GetWebExceptionStatusNumber(WebException wex);

        int GetWebExceptionStatusNumber(WebException wex, int defaultStatusCode);

        string GetStatusCodeDescription(int statusCode);

        ITwitterExceptionInfo[] GetTwitterExceptionInfo(WebException wex);

        ITwitterExceptionInfo[] GetTwitterExceptionInfosFromStream(Stream stream);
    }
}
