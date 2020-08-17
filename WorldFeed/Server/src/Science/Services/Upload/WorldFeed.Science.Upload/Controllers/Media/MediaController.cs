//namespace WorldFeed.Science.API.Controllers.Media
//{
//    using System;
//    using System.IO;
//    using System.Linq;
//    using System.Net.Http;
//    using System.Net.Http.Headers;
//    using System.Threading.Tasks;
//    using Microsoft.AspNetCore.Hosting;
//    using Microsoft.AspNetCore.Mvc;
//    using Microsoft.AspNetCore.Routing;
//    using Microsoft.EntityFrameworkCore.Internal;
//    using Aspose.Imaging.ImageOptions;

//    using WorldFeed.Common.Controllers;
//    using WorldFeed.Common.Extensions;
//    using WorldFeed.Services.Identity;
//    using WorldFeed.Common.DTO;
//    using WorldFeed.Science.API.Models.Media;
//    using WorldFeed.Science.Upload.Services.Files;

//    public class MediaController : ApiController
//    {
//        private readonly IWebHostEnvironment environment;
//        private readonly IMediaService mediaService;
//        private readonly ICurrentUserService currentUser;

//        public MediaController(IWebHostEnvironment environment, IMediaService mediaService, ICurrentUserService currentUser)
//        {
//            this.environment = environment;
//            this.mediaService = mediaService;
//            this.currentUser = currentUser;
//        }

//        public static string[] SupportedFileExtensions =
//        {
//            ".JPG", ".JPEG", ".PNG", ".GIF", ".WEBP",
//            ".MP4",
//        };

//        [Route(nameof(Sendd))]
//        [HttpGet]
//        public UploadedMediaInfo Sendd([FromQuery] MediaUploadQuery query)
//        {
//            if (query.Command == "STATUS")
//            {
//                return new UploadedMediaInfo
//                {
//                    MediaId = query.MediaId,
//                    MediaIdStr = query.MediaId.ToString(),
//                    ProcessingInfo = new UploadProcessingInfo
//                    {
//                        State = "InProgress",
//                        CheckAfterInSeconds = 10,
//                        ProgressPercentage = 8,
//                    }
//                };
//            }

//            return default;
//        }


//        //[Route(nameof(Send))]
//        //[HttpPost]
//        //public IFeedUpload Send([FromQuery] MediaUploadQuery query)
//        //{
//        //    The INIT command request is used to initiate a file upload session. It returns a media_id which
//        //    should be used to execute all subsequent requests
//        //    if (query.Command == "INIT")
//        //    {

//        //    }
//        //    else if (query.Command == "APPEND")
//        //    {

//        //    }
//        //    else if (query.Command == "FINALIZE")
//        //    {

//        //    }

//        //    return default;
//        //}

//        [Route(nameof(Upload))]
//        [HttpPost]
//        [RequestSizeLimit(1024 * 1024 * 19)] // TODO: Image size <= 5 MB, animated GIF size <= 15 MB https://developer.twitter.com/en/docs/media/upload-media/uploading-media/media-best-practices
//        public async Task<HttpResponseMessage> Upload([FromQuery] MediaUploadQuery query)
//        {
//            // кенов: Buffer-a e място което запазваме текущите данни, които сме прочели.
//            try
//            {
//                var files = Request.Form.Files;

//                var file = files.First();

//                byte[] binary = new byte[file.Length];

//                using (var stream = new BinaryReader(file.OpenReadStream()))
//                {
//                    byte[] buffer = new byte[file.Length];
//                    while (true)
//                    {
//                        var read = stream.Read(buffer, 0, buffer.Length);

//                        if (read < buffer.Length)
//                        {
//                            binary = buffer;
//                            break;
//                        }
//                    }
//                }

//                var init = new TweetinviModule();
//                var client = new TwitterClient("Jaja", "Haha");

//                var media = await client.Upload.UploadTweetVideoAsync(binary);

//                if (media.HasBeenUploaded == false)
//                {
//                    // Something went wrong during the upload. Please retry or check the video type/settings.
//                    return default;
//                }

//                await client.Upload.WaitForMediaProcessingToGetAllMetadataAsync(media);

//                var folderName = Path.Combine("Resources", "Media");
//                var currentDirectory = Directory.GetCurrentDirectory();
//                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

//                var response = default(MediaInitResponseModel);

//                if (IsMediaType(file.FileName, SupportedFileExtensions) == false)
//                {
//                    throw new ArgumentException("Not Supported Media Type");
//                }

//                var postId = 40;
//               //  var postId = await this.postService.CreatePostAsync(this.currentUser.UserId);

//                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToValidFileName();    // Trim('"');
//                var fullPath = Path.Combine(pathToSave, fileName);
//                var dbPath = Path.Combine(folderName, fileName);

//                using (var stream = new FileStream(fullPath, FileMode.Create))
//                {
//                    await file.CopyToAsync(stream);
//                }

//                var fileContentType = file.ContentType;
//                if (query.MediaCategory.ToUpper().Contains("IMAGE")) // check if image
//                {
//                    if (file.Length >= 1024 * 1024 * 5)
//                    {
//                        throw new ArgumentException("Image Too Heavy");
//                    }

//                    var width = 0;
//                    var height = 0;

//                    if (fileName.ToUpper().EndsWith(".WEBP"))
//                    {
//                        using (var img = Aspose.Imaging.Image.Load(fullPath))
//                        {
//                            fullPath = fullPath.Replace(fileName, "") + $"{fileName.Split('.')[0]}.jpeg";
//                            dbPath = dbPath.Replace(fileName, "") + $"{fileName.Split('.')[0]}.jpeg";
//                            img.Save(fullPath, new JpegOptions());

//                            fileContentType = "image/jpeg";
//                            width = img.Width;
//                            height = img.Height;
//                        }
//                    }
//                    else
//                    {
//                        using (var fileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read, FileShare.Read))
//                        {
//                            using (var image = System.Drawing.Image.FromStream(fileStream, false, false))
//                            {
//                                width = image.Width;
//                                height = image.Height;
//                            }
//                        }
//                    }

//                    var mediaNew = await this.mediaService.CreateMediaAsync(this.environment.WebRootPath, dbPath, fileContentType, postId, file.Length, width, height);

//                    response = new ImageResponseModel { MediaId = mediaNew.Id, Size = mediaNew.Size, Image = new Image { ImageType = fileContentType } };
//                }

//                if (query.MediaCategory.ToUpper().Contains("VIDEO"))
//                {
//                    var mediaNew = await this.mediaService.CreateMediaAsync(this.environment.WebRootPath, dbPath, file.ContentType, postId, file.Length);

//                    response = new VideoResponseModel { MediaId = mediaNew.Id, Size = mediaNew.Size, Video = new Video { VideoType = file.ContentType }, ProcessingInfo = new ProcessingInfo() };
//                }

//            }
//            catch (Exception ex)
//            {
//                throw new ArgumentException();
//                //return this.StatusCode(Result.Failure 500, $"Internal server error: {ex}");
//            }

//            return default;
//        }

//        [Route(nameof(Remove))]
//        [HttpPost]
//        public async Task<IActionResult> Remove()
//        {
//            using (var reader = new StreamReader(this.Request.Body))
//            {
//                var mediaId = await reader.ReadToEndAsync();

//                await this.mediaService.RemoveMedia(int.Parse(mediaId));
//            }

//            return this.Ok();
//        }

//        private bool IsMediaType(string fileName, string[] expectedFileExtensions)
//        {
//            return expectedFileExtensions.Any(x => fileName.ToUpper().EndsWith(x));
//        }

//        // private bool IsImage(string fileName, string[] imageFileExtensions)
//        // {
//        //     return imageFileExtensions.Any(x => fileName.ToUpper().EndsWith(x));
//        // }
//        // 
//        // private bool IsVideo(string fileName, string[] videoFileExtensions)
//        // {
//        //     return videoFileExtensions.Any(x => fileName.ToUpper().EndsWith(x));
//        // }
//    }
//}
