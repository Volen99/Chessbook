//namespace WorldFeed.Science.Upload.Services.Files
//{
//    using System.Collections.Generic;
//    using System.Threading.Tasks;

//    using WorldFeed.Science.Upload.Data.Models;

//    public interface IMediaService
//    {
//        Task<Media> CreateMediaAsync(string directory, string path, string fileExtension, long size, int? width = null, int? height = null);

//        Media GetById(int id);

//        Media GetByPostId(int postId);

//        IEnumerable<T> GetAll<T>(int? count = null);

//        IEnumerable<Media> GetAllByPostId(int postId, int? count = null);

//        Task<T> Update<T>(string imageUrl, long size, int postId);

//        Task RemoveMedia(int mediaId);
//    }
//}
