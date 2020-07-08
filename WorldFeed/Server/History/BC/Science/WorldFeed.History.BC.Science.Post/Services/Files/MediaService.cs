namespace WorldFeed.History.BC.Science.Post.Services.Photos
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using MassTransit;
    using Microsoft.EntityFrameworkCore;
    using WorldFeed.Common.Messages.Uploads;
    using WorldFeed.Common.Models.Repositories;
    using WorldFeed.History.BC.Science.Post.Data.Models;
    using WorldFeed.History.BC.Science.Post.Data.Models.Enums;
    using WorldFeed.History.Common.Messages.Media;

    public class MediaService : IMediaService
    {
        private IDeletableEntityRepository<Media> mediaRepository;
        private readonly IBus publisher;

        public MediaService(IDeletableEntityRepository<Media> photosRepository, IBus publisher)
        {
            this.mediaRepository = photosRepository;
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
                Status = Status.Inserted,
            };

            await this.mediaRepository.AddAsync(mediaNew);
            await this.mediaRepository.SaveChangesAsync();

            await this.publisher.Publish(new UploadMediaCreatedMessage
            {
                UploadId = mediaNew.Id,
                Type = fileExtension.Split('/')[0], // TODO: use automapper
            });

            await this.publisher.Publish(new MediaCreatedMessage
            {
                Id = mediaNew.Id,
                Directory = mediaNew.Directory,
                Path = mediaNew.Path,
                FileExtension = mediaNew.FileExtension,
                Size = mediaNew.Size,
                PostId = mediaNew.PostId,
                Width = mediaNew.Width,
                Height = mediaNew.Height,
                CreatedOn = mediaNew.CreatedOn,
            });

            return mediaNew;
        }

        public IEnumerable<T> GetAll<T>(int? count = null)
        {
            throw new NotImplementedException();
        }

        public Media GetById(string id)
        {
            throw new NotImplementedException();
        }

        public Media GetByPostId(string postId)
        {
            throw new NotImplementedException();
        }

        public Task<T> Update<T>(string imageUrl, long size, string postId)
        {
            throw new NotImplementedException();
        }

        public async Task ChangeAllStatus(string postId, Status status)
        {
            var medias = this.GetAllByPostId(postId)
                .Where(m => m.Status == Status.Inserted); // TODO: change Media

            if (medias.Count() > 4)
            {
                throw new ArgumentException();
            }

            foreach (var media in medias)
            {
                media.Status = Status.Uploaded;
            }

            await this.mediaRepository.SaveChangesAsync();
        }

        public IEnumerable<Media> GetAllByPostId(string postId, int? count = null)
        {
            var medias = this.mediaRepository.AllWithDeleted()
                .Where(m => m.PostId == postId);

            if (count.HasValue)
            {
                medias = medias.Take(count.Value);
            }

            return medias.ToList();
        }

        public async Task RemoveMedia(string mediaId)
        {
            var mediaCurrent = await this.mediaRepository.All()
                .Where(x => x.Id == mediaId)
                .FirstOrDefaultAsync();

            mediaCurrent.Status = Status.Removed;

            await this.mediaRepository.SaveChangesAsync();
        }
    }
}