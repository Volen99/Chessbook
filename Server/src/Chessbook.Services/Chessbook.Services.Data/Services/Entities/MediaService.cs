namespace Chessbook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Chessbook.Data.Common.Repositories;
    using Chessbook.Data.Models.Post.Entities;
    using Chessbook.Services.Mapping;

    public class MediaService : IMediaService
    {
        private readonly IDeletableEntityRepository<MediaEntity> mediaEntityRepository;

        public MediaService(IDeletableEntityRepository<MediaEntity> mediaEntityRepository)
        {
            this.mediaEntityRepository = mediaEntityRepository;
        }

        public async Task WriteToDb(string directory, string imageUrl, string mediaType, long size)
        {
            var mediaEntityNew = new MediaEntity
            {
                CreatedOn = DateTime.Now,
                Directory = directory,
                MediaURL = $"https://localhost:5001{imageUrl.Remove(0, 1).Replace('\\', '/')}",
                MediaType = mediaType,
                Size = size,
            };

            await this.mediaEntityRepository.AddAsync(mediaEntityNew);
            await this.mediaEntityRepository.SaveChangesAsync();
        }

        public MediaEntity GetMediaById(long mediaId)
        {
            return this.mediaEntityRepository.All().Where(m => m.Id == mediaId).FirstOrDefault();
        }


        public long? GetLastId()
        {
            var lastMedia = this.mediaEntityRepository
                .All()
                .OrderByDescending(i => i.Id)
                .FirstOrDefault();

            return lastMedia?.Id;

        }

        
    }
}
