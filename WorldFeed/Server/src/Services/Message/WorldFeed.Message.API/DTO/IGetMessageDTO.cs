namespace WorldFeed.Message.DTO
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.Events;

    public interface IGetMessageDTO
    {
        IMessageEventDTO MessageEvent { get; set; }

        Dictionary<long, IApp> Apps { get; set; }
    }
}
