namespace WorldFeed.Common.Helpers
{
    using System;
    using System.Threading.Tasks;

    public interface ITaskDelayer
    {
        Task Delay(TimeSpan timeSpan);
    }

    public class TaskDelayer : ITaskDelayer
    {
        public Task Delay(TimeSpan timeSpan)
        {
            return Task.Delay(timeSpan);
        }
    }
}
