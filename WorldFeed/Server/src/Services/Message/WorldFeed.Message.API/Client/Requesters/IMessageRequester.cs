namespace WorldFeed.Message.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Public.Parameters.MessageClient;

    public interface IMessageRequester
    {
        /// <summary>
        /// Publishes a private message
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/new-event </para>
        /// <returns>Twitter result containing the published message</returns>
        Task<ITwitterResult<ICreateMessageDTO>> PublishMessageAsync(IPublishMessageParameters parameters);

        /// <summary>
        /// Destroy a specific message
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/guides/direct-message-migration </para>
        Task<ITwitterResult> DestroyMessageAsync(IDeleteMessageParameters parameters);

        /// <summary>
        /// Gets a specific message
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/get-event </para>
        /// <returns>Twitter result containing the requested message</returns>
        Task<ITwitterResult<IGetMessageDTO>> GetMessageAsync(IGetMessageParameters parameters);

        /// <summary>
        /// Gets latest messages
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/api-reference/list-events </para>
        /// <returns>An iterator to list the recent messages of the user</returns>
        ITwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>> GetMessagesIterator(IGetMessagesParameters parameters);
    }
}
