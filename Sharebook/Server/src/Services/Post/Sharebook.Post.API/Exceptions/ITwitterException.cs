namespace Sharebook.Post.API.Exceptions
{
    using System;
    using System.Net;

    using Sharebook.Common.Exceptions;
    using Sharebook.Storage.Application.Query;

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
