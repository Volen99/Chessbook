namespace WorldFeed.Common.Public.Models.Interfaces.DTO.Events
{
    using System;

    using WorldFeed.Common.Public.Models.Enums;

    public interface IMessageEventDTO
    {
        EventType Type { get; set; }

        long Id { get; set; }

        DateTime CreatedAt { get; set; }

        IEventInitiatedViaDTO InitiatedVia { get; set; }

        IMessageCreateDTO MessageCreate { get; set; }
    }
}
