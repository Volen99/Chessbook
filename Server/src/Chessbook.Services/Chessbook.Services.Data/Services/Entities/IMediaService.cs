namespace Chessbook.Services.Data.Services.Entities
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Chessbook.Data.Models.Post.Entities;

    public interface IMediaService
    {
        Task WriteToDb(string directory, string imageUrl, string mediaType, long size);

        Task<T> GetMediaById<T>(int postId);

        Task<IEnumerable<T>> GetMediaSize<T>(int mediaId);

        long? GetLastId();
    }
}
