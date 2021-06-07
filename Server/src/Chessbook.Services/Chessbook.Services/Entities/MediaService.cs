namespace Chessbook.Services.Data.Services.Entities
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Drawing;

    using Chessbook.Data;
    using Chessbook.Data.Models.Post.Entities;
    using Chessbook.Services.Mapping;

    public class MediaService : IMediaService
    {
        private readonly IRepository<MediaEntity> mediaEntityRepository;
        private readonly IRepository<MediaEntitySize> mediaEntitySizeRepository;

        public MediaService(IRepository<MediaEntity> mediaEntityRepository, IRepository<MediaEntitySize> mediaEntitySizeRepository)
        {
            this.mediaEntityRepository = mediaEntityRepository;
            this.mediaEntitySizeRepository = mediaEntitySizeRepository;
        }

        public async Task WriteToDb(string directory, string imageUrl, string mediaType, long size)
        {
            var mediaEntityNew = new MediaEntity
            {
                Directory = directory,
                MediaURL = $"https://localhost:5001{imageUrl.Remove(0, 1).Replace('\\', '/')}",
                Size = size,
            };

            await this.mediaEntityRepository.InsertAsync(mediaEntityNew);

            Bitmap img = new Bitmap(@$"C:\Users\volen\OneDrive\Desktop\Chessbook\Server\src\Web\Chessbook.WebApi\{imageUrl.Remove(0, 1).Replace('\\', '/')}");

            var sizes = new List<MediaEntitySize>();

            sizes.Add(new MediaEntitySize
            {
                MediaId = mediaEntityNew.Id,
                Variant = "thumb",
                Width = img.Width,
                Height = img.Height,
                Resize = "crop",
            });

            sizes.Add(new MediaEntitySize
            {
                MediaId = mediaEntityNew.Id,
                Variant = "medium",
                Width = img.Width,
                Height = img.Height,
                Resize = "fit",
            });

            sizes.Add(new MediaEntitySize
            {
                MediaId = mediaEntityNew.Id,
                Variant = "large",
                Width = img.Width,
                Height = img.Height,
                Resize = "fit",
            });

            sizes.Add(new MediaEntitySize
            {
                MediaId = mediaEntityNew.Id,
                Variant = "small",
                Width = img.Width,
                Height = img.Height,
                Resize = "fit",
            });

            foreach (var mediaSize in sizes)
            {
                await this.mediaEntitySizeRepository.InsertAsync(mediaSize);
            }

        }

        public async Task<T> GetMediaById<T>(int mediaId)
        {
            return await this.mediaEntityRepository.Table
                .Where(m => m.Id == mediaId)
                .To<T>()
                .FirstOrDefaultAsyncExt();
        }


        public long? GetLastId()
        {
            var lastMedia = this.mediaEntityRepository
                .Table
                .OrderByDescending(i => i.Id)
                .FirstOrDefault();

            return lastMedia?.Id;

        }

        public async Task<IEnumerable<T>> GetMediaSize<T>(int mediaId)
        {
            var mediaSize = await this.mediaEntitySizeRepository.Table.Where(m => m.MediaId == mediaId)
                .To<T>()
                .ToListAsync();

            return mediaSize;
        }
    }
}
