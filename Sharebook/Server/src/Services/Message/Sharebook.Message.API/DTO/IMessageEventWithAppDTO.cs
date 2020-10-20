namespace Sharebook.Message.DTO
{
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Message.DTO.Events;

    /// <summary>
    /// DTO for encapsulating an MessageEvent and an App together for storage.
    /// Not used for transfer to or from Twitter.
    /// </summary>
    public interface IMessageEventWithAppDTO
    {
        IMessageEventDTO MessageEvent { get; set; }

        IApp App { get; set; }
    }
}
