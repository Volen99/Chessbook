using System.Threading.Tasks;
using Chessbook.Web.Models.APIs;

namespace Chessbook.Services.APIs
{
    public interface ITwitchService
    {
        Task<TDTO> ExecuteRequest<TDTO>(string url, string accessToken = null);

        Task<GetTwitchClipOrVideoData> GetTwitchClipImage(string slug);

        Task<GetTwitchClipOrVideoData> GetTwitchVideoImage(string id);
    }
}
