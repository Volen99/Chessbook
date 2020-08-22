namespace WorldFeed.Science.Upload.Domain.Exceptions
{
    using System;

    public class ScienceDomainException : Exception
    {
        public ScienceDomainException()
        {

        }

        public ScienceDomainException(string message)
            : base(message)
        {

        }

        public ScienceDomainException(string message, Exception innerException)
            : base(message, innerException)
        {

        }
    }
}
