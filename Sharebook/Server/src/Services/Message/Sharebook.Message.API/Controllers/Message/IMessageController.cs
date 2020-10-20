namespace Sharebook.Message.Controllers
{
    using System.Threading.Tasks;

    using Sharebook.Common.Iterators;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Common.Public.Parameters.MessageClient;

    public interface IMessageController
    {
        Task<ITwitterResult<ICreateMessageDTO>> PublishMessageAsync(IPublishMessageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> DestroyMessageAsync(IDeleteMessageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IGetMessageDTO>> GetMessageAsync(IGetMessageParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>> GetMessagesIterator(IGetMessagesParameters parameters, ITwitterRequest request);
    }
}
