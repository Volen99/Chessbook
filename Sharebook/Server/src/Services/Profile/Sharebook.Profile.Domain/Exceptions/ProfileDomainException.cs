namespace Sharebook.Profile.Domain.Exceptions
{
    using System;

    public class ProfileDomainException : Exception
    {
        public ProfileDomainException()
        {

        }

        public ProfileDomainException(string message)
            : base(message)
        {

        }

        public ProfileDomainException(string message, Exception innerException)
            : base(message, innerException)
        {

        }
    }
}
