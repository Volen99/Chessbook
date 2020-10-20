namespace Sharebook.Message.DTO.QueryDTO.Cursor
{
    using System.Collections.Generic;

    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Message.DTO.Events;

    public interface IMessageCursorQueryResultDTO : IBaseCursorQueryDTO<IMessageEventDTO>
    {
        IMessageEventDTO[] MessageEvents { get; set; }

        Dictionary<long, IApp> Apps { get; set; }
    }
}
