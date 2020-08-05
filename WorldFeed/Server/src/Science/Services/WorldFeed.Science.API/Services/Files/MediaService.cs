namespace WorldFeed.Science.API.Services.Files
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using MassTransit;
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.Science.API.Data.Models;

    public class MediaService : IMediaService
    {
        private IDeletableEntityRepository<Media> mediaRepository;
        private readonly IBus publisher;

        public MediaService(IDeletableEntityRepository<Media> photosRepository, IBus publisher)
        {
            this.mediaRepository = photosRepository;
            this.publisher = publisher;
        }
        public async Task<Media> CreateMediaAsync(string directory, string path, string fileExtension, int postId, long size, int? width = null, int? height = null)
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

            //await this.publisher.Publish(new UploadMediaCreatedMessage
            //{
            //    UploadId = mediaNew.Id,
            //    Type = fileExtension.Split('/')[0], // TODO: use automapper
            //});

            //var messageData = new MediaCreatedMessage
            //{
            //    Id = mediaNew.Id,
            //    Directory = mediaNew.Directory,
            //    Path = mediaNew.Path,
            //    FileExtension = mediaNew.FileExtension,
            //    Size = mediaNew.Size,
            //    PostId = mediaNew.PostId,
            //    Width = mediaNew.Width,
            //    Height = mediaNew.Height,
            //    CreatedOn = mediaNew.CreatedOn,
            //};

           // var message = new Message(messageData);

            await this.mediaRepository.AddAsync(mediaNew);
           // await this.mediaRepository.SaveChangesAsync(message);

           // await this.publisher.Publish(messageData);

           // await this.mediaRepository.MarkMessageAsPublished(message.Id);

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

        public async Task RemoveMedia(int mediaId)
        {
            var mediaCurrent = await this.mediaRepository.All()
                .Where(x => x.Id == mediaId)
                .FirstOrDefaultAsync();

            // mediaCurrent.Status = Status.Removed;

            await this.mediaRepository.SaveChangesAsync();
        }
    }
}
