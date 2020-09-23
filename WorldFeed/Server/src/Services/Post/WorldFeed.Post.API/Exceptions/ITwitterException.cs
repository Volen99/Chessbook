namespace WorldFeed.Post.API.Exceptions
{
    using System;
    using System.Net;

    using WorldFeed.Common.Exceptions;
    using WorldFeed.Upload.Application.Query;

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
