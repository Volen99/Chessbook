namespace WorldFeed.Identity.Domain.Exceptions
{
    using System;

    public class IdentityDomainException : Exception
    {
        public IdentityDomainException()
        {

        }

        public IdentityDomainException(string message)
            : base(message)
        {

        }

        public IdentityDomainException(string message, Exception innerException)
            : base(message, innerException)
        {

        }
    }
}
