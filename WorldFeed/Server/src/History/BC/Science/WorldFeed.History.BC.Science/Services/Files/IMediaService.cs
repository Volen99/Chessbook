namespace WorldFeed.History.BC.Science.Services.Photos
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using WorldFeed.History.BC.Science.Data.Models;

    public interface IMediaService
    {
        Task<Media> CreateMediaAsync(int mediaId, string directory, string path, string fileExtension, int postId, long size, int? width = null, int? height = null);

        Media GetById(int id);

        Media GetByPostId(int postId);

        IEnumerable<T> GetAll<T>(int? count = null);

        IEnumerable<Media> GetAllByPostId(int postId, int? count = null);

        Task<T> Update<T>(string imageUrl, long size, int postId);
    }
}
