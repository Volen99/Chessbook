namespace WorldFeed.Common.Events
{
    using System;

    /// <summary>
    /// Event to inform that the limit of tweets that can be received by the application has been reached.
    /// </summary>
    public class LimitReachedEventArgs : EventArgs
    {
        public LimitReachedEventArgs(int numberOfTweetsNotReceived)
        {
            this.NumberOfTweetsNotReceived = numberOfTweetsNotReceived;
        }

        public int NumberOfTweetsNotReceived { get; }
    }
}
