namespace WorldFeed.History.BC.Science.Services.Photos
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using MassTransit;
    using Microsoft.EntityFrameworkCore;
    using WorldFeed.Common.Messages.Uploads;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.History.BC.Science.Data.Models;

    public class MediaService : IMediaService
    {
        private IDeletableEntityRepository<Media> mediaRepository;

        public MediaService(IDeletableEntityRepository<Media> photosRepository)
        {
            this.mediaRepository = photosRepository;
        }

        public async Task<Media> CreateMediaAsync(int mediaId, string directory, string path, string fileExtension, int postId, long size, int? width = null, int? height = null)
        {
            var mediaNew = new Media()
            {
                //Id = mediaId,
                Directory = directory,
                Path = path,
                FileExtension = fileExtension,
                Size = size,
                PostId = postId,
                Width = width,
                Height = height,
            };

            await this.mediaRepository.AddAsync(mediaNew);
            await this.mediaRepository.SaveChangesAsync();

            //await this.publisher.Publish(new UploadMediaCreatedMessage
            //{
            //    UploadId = mediaNew.Id,
            //    Type = fileExtension.Split('/')[0], // TODO: use automapper
            //});

            return mediaNew;
        }

        public IEnumerable<T> GetAll<T>(int? count = null)
        {
            throw new NotImplementedException();
        }

        public Media GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Media GetByPostId(int postId)
        {
            throw new NotImplementedException();
        }

        public Task<T> Update<T>(string imageUrl, long size, int postId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Media> GetAllByPostId(int postId, int? count = null)
        {
            var medias = this.mediaRepository.AllWithDeleted()
                .Where(m => m.PostId == postId);

            if (count.HasValue)
            {
                medias = medias.Take(count.Value);
            }

            return medias.ToList();
        }
    }
}