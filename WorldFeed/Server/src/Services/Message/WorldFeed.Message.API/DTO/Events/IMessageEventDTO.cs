namespace WorldFeed.Message.DTO.Events
{
    using System;

    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public interface IMessageEventDTO
    {
        EventType Type { get; set; }

        long Id { get; set; }

        DateTime CreatedAt { get; set; }

        IEventInitiatedViaDTO InitiatedVia { get; set; }

        IMessageCreateDTO MessageCreate { get; set; }
    }
}
