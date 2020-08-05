namespace WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models.Interfaces.DTO.Events;

    public interface IMessageCursorQueryResultDTO : IBaseCursorQueryDTO<IMessageEventDTO>
    {
        IMessageEventDTO[] MessageEvents { get; set; }

        Dictionary<long, IApp> Apps { get; set; }
    }
}
