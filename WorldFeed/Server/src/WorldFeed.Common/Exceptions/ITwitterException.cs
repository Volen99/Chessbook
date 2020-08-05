namespace WorldFeed.Common.Exceptions
{
    using System;
    using System.Net;

    using WorldFeed.Common.Public.Models.Interfaces;

    public interface ITwitterException
    {
        WebException WebException { get; }

        string URL { get; }

        int StatusCode { get; }

        string TwitterDescription { get; }

        DateTime CreationDate { get; }

        ITwitterExceptionInfo[] TwitterExceptionInfos { get; }

        ITwitterQuery TwitterQuery { get; }
    }
}
