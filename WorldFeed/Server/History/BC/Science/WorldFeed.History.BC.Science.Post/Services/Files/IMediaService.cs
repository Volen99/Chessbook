namespace WorldFeed.History.BC.Science.Post.Services.Photos
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using WorldFeed.History.BC.Science.Post.Data.Models;
    using WorldFeed.History.BC.Science.Post.Data.Models.Enums;

    public interface IMediaService
    {
        Task<Media> CreateMediaAsync(string directory, string path, string fileExtension, string postId, long size, int? width = null, int? height = null);

        Media GetById(string id);

        Media GetByPostId(string postId);

        IEnumerable<T> GetAll<T>(int? count = null);

        IEnumerable<Media> GetAllByPostId(string postId, int? count = null);

        Task<T> Update<T>(string imageUrl, long size, string postId);

        Task ChangeAllStatus(string postId, Status status);

        Task RemoveMedia(string mediaId);
    }
}
