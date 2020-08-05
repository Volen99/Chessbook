namespace WorldFeed.Common.Public.Events.AccountActivity
{
    using System;

    /// <summary>
    /// Twitter account event
    /// </summary>
    public class AccountActivityEvent
    {
        public AccountActivityEvent()
        {
            this.EventDate = new DateTime();
        }

        public long AccountUserId { get; set; }

        public DateTime EventDate { get; set; }

        public string Json { get; set; }
    }


    public class AccountActivityEvent<T> : AccountActivityEvent
    {
        public AccountActivityEvent(T args)
        {
            this.Args = args;
        }

        public T Args { get; set; }
    }
}
