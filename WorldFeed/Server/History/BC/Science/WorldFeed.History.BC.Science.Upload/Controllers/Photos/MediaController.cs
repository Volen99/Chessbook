namespace WorldFeed.History.BC.Science.Upload.Controllers.Photos
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using Aspose.Imaging.ImageOptions;
    using ImageProcessor;
    using ImageProcessor.Imaging.Formats;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore.Internal;
    using WorldFeed.Common;
    using WorldFeed.Common.Controllers;
    using WorldFeed.History.BC.Science.Upload.Models.Media;
    using WorldFeed.History.BC.Science.Upload.Services.Photos;
    using WorldFeed.Services;
    using WorldFeed.Services.Identity;
    using WorldFeed.Web.Shared;

    public class MediaController : ApiController
    {
        private readonly IWebHostEnvironment environment;
        private readonly IMediaService mediaService;
        private readonly ICurrentUserService currentUser;

        public MediaController(
            IWebHostEnvironment environment,
            IMediaService mediaService,
            ICurrentUserService currentUser)
        {
            this.environment = environment;
            this.mediaService = mediaService;
            this.currentUser = currentUser;
        }

        [Route(nameof(Upload))]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ApiResponse<List<UploadMediaResponse>>> Upload()
        {
            try
            {
                var files = Request.Form.Files;

                var folderName = Path.Combine("Resources", "Media");
                var currentDirectoryu = Directory.GetCurrentDirectory();
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (files.Any(f => f.Length == 0))
                {
                    return this.ModelStateErrors<List<UploadMediaResponse>>();
                }

                var response = new List<UploadMediaResponse>();
                foreach (var file in files)
                {
                    if (IsMediaType(file.FileName, StringExtensions.expectedFileExtensions) == false)
                    {
                        throw new ArgumentException("Not Supported Media Type");
                    }

                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    if (IsImage(fileName, StringExtensions.imageFileExtensions))
                    {
                        var fileContentType = file.ContentType;
                        var width = 0;
                        var height = 0;

                        if (fileName.ToUpper().EndsWith(".WEBP"))
                        {
                            using (var img = Aspose.Imaging.Image.Load(fullPath))
                            {
                                fullPath = fullPath.Replace(fileName, "") + $"{fileName.Split('.')[0]}.jpeg";
                                dbPath = dbPath.Replace(fileName, "") + $"{fileName.Split('.')[0]}.jpeg";
                                img.Save(fullPath, new JpegOptions());

                                fileContentType = ".jpeg";
                                width = img.Width;
                                height = img.Height;
                            }
                        }
                        else
                        {
                            using (var fileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read, FileShare.Read))
                            {
                                using (var image = System.Drawing.Image.FromStream(fileStream, false, false))
                                {
                                    width = image.Width;
                                    height = image.Height;
                                }
                            }
                        }

                        var mediaNew = await this.mediaService.CreateMediaAsync(this.environment.WebRootPath, dbPath, fileContentType, file.Length, this.currentUser.UserId, width, height);

                        response.Add(new UploadMediaResponse { Id = mediaNew.Id, Size = mediaNew.Size, Image = new Image { ImageType = fileContentType, W = mediaNew.Width.Value, H = mediaNew.Height.Value }, DbPath = dbPath });
                    }

                    if (IsVideo(file.FileName, StringExtensions.videoFileExtensions))
                    {
                        var mediaNew = await this.mediaService.CreateMediaAsync(this.environment.WebRootPath, dbPath, file.ContentType, file.Length, this.currentUser.UserId);

                        response.Add(new UploadMediaResponse { Id = mediaNew.Id, Size = mediaNew.Size, Video = new Video { VideoType = file.ContentType }, DbPath = dbPath });
                    }
                }

                return response.ToApiResponse();
            }
            catch (Exception ex)
            {
                throw new ArgumentException();
                //return this.StatusCode(Result.Failure 500, $"Internal server error: {ex}");
            }
        }

        private bool IsMediaType(string fileName, string[] expectedFileExtensions)
        {
            return expectedFileExtensions.Any(x => fileName.ToUpper().EndsWith(x));
        }

        private bool IsImage(string fileName, string[] imageFileExtensions)
        {
            return imageFileExtensions.Any(x => fileName.ToUpper().EndsWith(x));
        }

        private bool IsVideo(string fileName, string[] videoFileExtensions)
        {
            return videoFileExtensions.Any(x => fileName.ToUpper().EndsWith(x));
        }
    }
}
