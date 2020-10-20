//namespace WorldFeed.Science.Upload.Domain.Specifications.Feeds
//{
//    using System;
//    using System.Linq.Expressions;

//    using WorldFeed.Message.Domain.AggregatesModel.PostAggregate;

//    // Basically, we need to inherit the base Specification abstract class, and then override ToExpression, in which we must provide the query.
//    // If we need to use the specification in a domain class – we can do it though the IsSatisfiedBy method.
//    public class FeedByIdSpecification : Specification<Post>
//    {
//        private readonly int? id;

//        public FeedByIdSpecification(int? id)
//        {
//            this.id = id;
//        }

//        protected override bool Include => this.id != null;

//        public override Expression<Func<Post, bool>> ToExpression()
//        {
//            return feed => feed.Contributors.Length == this.id;         // just test. both should be id kk
//        }
//    }
//}
