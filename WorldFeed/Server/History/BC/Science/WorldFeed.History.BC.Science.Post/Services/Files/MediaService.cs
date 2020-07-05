namespace WorldFeed.History.BC.Science.Post.Services.Photos
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using MassTransit;

    using WorldFeed.Common.Messages.Uploads;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Common.Services.Mapping;
    using WorldFeed.History.BC.Science.Post.Data.Models;

    public class MediaService : IMediaService
    {
        private IDeletableEntityRepository<Media> photosRepository;
        private readonly IBus publisher;

        public MediaService(IDeletableEntityRepository<Media> photosRepository, IBus publisher)
        {
            this.photosRepository = photosRepository;
            this.publisher = publisher;
        }
        public async Task<Media> CreateMediaAsync(string directory, string path, string fileExtension, string postId, long size, int? width = null, int? height = null)
        {
            var mediaNew = new Media()
            {
                Directory = directory,
                Path = path,
                FileExtension = fileExtension,
                Size = size,
                PostId = postId,
                Width = width,
                Height = height,
            };

            mediaNew.IsDeleted = true;

            await this.photosRepository.AddAsync(mediaNew);
            await this.photosRepository.SaveChangesAsync();

            await this.publisher.Publish(new UploadMediaCreatedMessage
            {
                UploadId = mediaNew.Id,
                Type = fileExtension.Split('/')[0], // TODO: use automapper
            });

            return mediaNew;
        }

        public IEnumerable<T> GetAll<T>(int? count = null)
        {
            throw new System.NotImplementedException();
        }

        public Media GetById(string id)
        {
            throw new System.NotImplementedException();
        }

        public Media GetByPostId(string postId)
        {
            throw new System.NotImplementedException();
        }

        public Task<T> Update<T>(string imageUrl, long size, string postId)
        {
            throw new System.NotImplementedException();
        }

        public async Task SetIsDeleted(string postId)
        {
            var medias = this.GetAllByPostId(postId); // TODO: change Media

            if (medias.Count() > 4)
            {
                throw new ArgumentException();
            }

            foreach (var media in medias)
            {
                media.IsDeleted = false;
            }

            await this.photosRepository.SaveChangesAsync();
        }

        public IEnumerable<Media> GetAllByPostId(string postId, int? count = null)
        {
            var medias = this.photosRepository.AllWithDeleted()
                .Where(m => m.PostId == postId);

            if (count.HasValue)
            {
                medias = medias.Take(count.Value);
            }

            return medias.ToList();
        }
    }
}