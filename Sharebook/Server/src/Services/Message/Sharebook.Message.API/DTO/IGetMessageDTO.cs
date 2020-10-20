namespace Sharebook.Message.DTO
{
    using System.Collections.Generic;

    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Public.Models.Interfaces.DTO.Events;

    public interface IGetMessageDTO
    {
        IMessageEventDTO MessageEvent { get; set; }

        Dictionary<long, IApp> Apps { get; set; }
    }
}
