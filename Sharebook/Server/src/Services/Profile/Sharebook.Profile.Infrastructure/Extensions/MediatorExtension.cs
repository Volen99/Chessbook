//namespace WorldFeed.Post.Infrastructure.Extensions
//{
//    using System.Linq;
//    using System.Threading.Tasks;
//    using Microsoft.EntityFrameworkCore;
//    using MediatR;

//    using WorldFeed.Upload.Domain.Common;
//    using WorldFeed.Upload.Infrastructure.Data.Dbs;

//    static class MediatorExtension
//    {
//        public static async Task DispatchDomainEventsAsync(this IMediator mediator, DbContext ctx)
//        {
//            var domainEntities = ctx.ChangeTracker
//                .Entries<Entity>()
//                .Where(x => x.Entity.DomainEvents != null && x.Entity.DomainEvents.Any());

//            var domainEvents = domainEntities
//                .SelectMany(x => x.Entity.DomainEvents)
//                .ToList();

//            domainEntities.ToList()
//                .ForEach(entity => entity.Entity.ClearDomainEvents());

//            foreach (var domainEvent in domainEvents)
//            {
//                await mediator.Publish(domainEvent);
//            }
//        }
//    }
//}
