namespace WorldFeed.Message.Domain.Exceptions
{
    using System;

    public class MessageDomainException : Exception
    {
        public MessageDomainException()
        {

        }

        public MessageDomainException(string message)
            : base(message)
        {

        }

        public MessageDomainException(string message, Exception innerException)
            : base(message, innerException)
        {

        }
    }
}
