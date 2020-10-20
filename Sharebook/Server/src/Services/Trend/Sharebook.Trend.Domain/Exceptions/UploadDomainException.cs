namespace Sharebook.Trends.Domain.Exceptions
{
    using System;

    public class UploadDomainException : Exception
    {
        public UploadDomainException()
        {

        }

        public UploadDomainException(string message)
            : base(message)
        {

        }

        public UploadDomainException(string message, Exception innerException)
            : base(message, innerException)
        {

        }
    }
}
