namespace Sharebook.Services.Data.Services.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Sharebook.Data.Common.Repositories;
    using Sharebook.Data.Models.Post.Entities;
    using Sharebook.Services.Mapping;

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
                MediaURL = "https://64.media.tumblr.com/98a9402a02b986cbc2660f8fc3cf3335/cdbda670422f23fa-5d/s640x960/cae66e4d77a314ab10ca98b0e771e12bfe36aaf6.jpg",
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
