using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core.Domain.Videos;
using Chessbook.Data;

namespace Chessbook.Services.APIs
{
    // 11/15/2021, Monday, 23:00 | New Indie Folk; June 2020
    public class YoutubeService : IYoutubeService
    {
        private readonly IRepository<YoutubeVideo> youtubeVideoRepository;

        public YoutubeService(IRepository<YoutubeVideo> youtubeVideoRepository)
        {
            this.youtubeVideoRepository = youtubeVideoRepository;
        }

        public async Task<YoutubeVideo> AddVideo(string id, string title, string description, int userId)
        {
            var videoNew = new YoutubeVideo
            {
                VideoId = id,
                Title = title,
                Description = description,
                UserId = userId,
                ThumbUrl = $"https://i.ytimg.com/vi/{id}/mq1.jpg",
                CreatedAt = DateTime.UtcNow,
            };

            await this.youtubeVideoRepository.InsertAsync(videoNew);

            return videoNew;
        }

        public async Task<IList<YoutubeVideo>> GetAllVideos(int userId = 0)
        {
            return await this.youtubeVideoRepository.GetAllAsync(query =>
            {
                if (userId > 0)
                    query = query.Where(comment => comment.UserId == userId);

                return query;
            });
        }

        public async Task<YoutubeVideo> GetById(int id)
        {
            return await youtubeVideoRepository.GetByIdAsync(id, cache => default);
        }

        public async Task<IList<YoutubeVideo>> GetVideosByUserId(int userId)
        {
            var videos = await this.youtubeVideoRepository.GetAllAsync(query =>
            {
                query = query.Where(v => v.UserId == userId);

                return query;

            });

            return videos;
        }

        public async Task Edit(YoutubeVideo video)
        {
            await this.youtubeVideoRepository.UpdateAsync(video);
        }

        public async Task Delete(YoutubeVideo video)
        {
            await this.youtubeVideoRepository.DeleteAsync(video);
        }

        public async Task DeleteVideosAsync(IList<YoutubeVideo> posts)
        {
            await this.youtubeVideoRepository.DeleteAsync(posts);
        }
    }
}
