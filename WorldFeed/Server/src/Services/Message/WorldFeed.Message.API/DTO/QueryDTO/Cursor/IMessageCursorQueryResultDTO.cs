namespace WorldFeed.Message.DTO.QueryDTO.Cursor
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Message.DTO.Events;

    public interface IMessageCursorQueryResultDTO : IBaseCursorQueryDTO<IMessageEventDTO>
    {
        IMessageEventDTO[] MessageEvents { get; set; }

        Dictionary<long, IApp> Apps { get; set; }
    }
}
