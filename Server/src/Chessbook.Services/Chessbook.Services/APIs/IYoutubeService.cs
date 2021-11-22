using Chessbook.Core.Domain.Videos;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chessbook.Services.APIs
{
    public interface IYoutubeService
    {
        Task<YoutubeVideo> AddVideo(string id, string title, string description, int userId);

        Task<IList<YoutubeVideo>> GetAllVideos(int userId = 0);

        Task<YoutubeVideo> GetById(int id);

        Task<IList<YoutubeVideo>> GetVideosByUserId(int userId);

        Task Edit(YoutubeVideo video);

        Task Delete(YoutubeVideo video);

        /// <summary>
        /// Delete videos
        /// </summary>
        /// <param name="posts">Videos</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task DeleteVideosAsync(IList<YoutubeVideo> posts);
    }
}
