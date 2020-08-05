using System.Threading.Tasks;

using WorldFeed.Common.Iterators;
using WorldFeed.Common.Public.Models.Interfaces;
using WorldFeed.Common.Public.Models.Interfaces.DTO;
using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
using WorldFeed.Common.Public.Parameters.MessageClient;
using WorldFeed.Common.Web;

namespace WorldFeed.Core.Controllers
{
    public interface IMessageController
    {
        Task<ITwitterResult<ICreateMessageDTO>> PublishMessageAsync(IPublishMessageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> DestroyMessageAsync(IDeleteMessageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IGetMessageDTO>> GetMessageAsync(IGetMessageParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IMessageCursorQueryResultDTO>> GetMessagesIterator(IGetMessagesParameters parameters, ITwitterRequest request);
    }
}
