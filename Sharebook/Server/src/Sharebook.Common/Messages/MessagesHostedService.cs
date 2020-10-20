namespace Sharebook.Common.Messages
{
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Hangfire;
    using MassTransit;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Hosting;
    using Sharebook.Common.Data;

    public class MessagesHostedService : IHostedService
    {
        private readonly IRecurringJobManager recurringJob;
        private readonly DbContext data;
        private readonly IBus publisher;

        public MessagesHostedService(IRecurringJobManager recurringJob, DbContext data, IBus publisher)
        {
            this.recurringJob = recurringJob;
            this.data = data;
            this.publisher = publisher;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            this.recurringJob.AddOrUpdate(
                nameof(MessagesHostedService),
                () => this.ProcessPendingMessages(),
                "*/5 * * * * *"); // Cron expression

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
            => Task.CompletedTask;

        public void ProcessPendingMessages()
        {
            var messages = this.data
                .Set<Message>()
                .Where(m => !m.Published)
                .OrderBy(m => m.Id)        // first to publsh the oldest ones
                .ToList();

            foreach (var message in messages)
            {
                this.publisher.Publish(message.Data, message.Type);
                message.MarkAsPublished();

                this.data.SaveChanges();
            }
        }
    }
}
