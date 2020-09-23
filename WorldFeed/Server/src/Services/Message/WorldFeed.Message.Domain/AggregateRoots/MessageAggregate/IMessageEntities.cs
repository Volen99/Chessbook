namespace WorldFeed.Message.Domain.AggregateRoots.MessageAggregate
{
    using System.Collections.Generic;

    public interface IMessageEntities : IObjectEntities
    {
        /// <summary>
        /// Collection of medias associated with a Message.
        /// Note that this isn't considered an entity by Twitter on a DM and is instead an attachment.
        /// It is included in Message.Entities for convenience.
        /// </summary>
        new List<IMediaEntity> Medias { get; set; }
    }
}
