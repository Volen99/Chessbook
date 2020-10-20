namespace Sharebook.Post.Domain.Exceptions
{
    using System;

    public class PostDomainException : Exception
    {
        public PostDomainException()
        {

        }

        public PostDomainException(string message)
            : base(message)
        {

        }

        public PostDomainException(string message, Exception innerException)
            : base(message, innerException)
        {

        }
    }
}
