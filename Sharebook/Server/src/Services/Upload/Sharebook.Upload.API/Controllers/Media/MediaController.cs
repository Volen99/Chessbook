namespace Sharebook.Upload.Controllers.Media
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Text.Unicode;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Routing;
    using Microsoft.EntityFrameworkCore.Internal;
    using Newtonsoft.Json;
    using Sharebook.Common.Extensions;
    using Sharebook.Common.Web;
    using Sharebook.Services.Identity;
    using Sharebook.Upload.ChunkedUpload;
    using Sharebook.WebLogic;

    public class MediaController : ControllerBase
    {
        private readonly IWebHostEnvironment environment;
        private readonly ICurrentUserService currentUser;

        public MediaController(IWebHostEnvironment environment)
        {
            this.environment = environment;
            this.currentUser = currentUser;
        }

        public static string[] SupportedFileExtensions =
        {
            ".JPG", ".JPEG", ".PNG", ".GIF", ".WEBP",
            ".MP4",
        };


        [Route("[controller]/chunk")]
        public IActionResult Chunk()
        {
            var command = this.Request.Query["command"];

            if (command == "INIT")
            {
                var content = new UploadInitModel
                {
                    MediaId = 11,
                    ExpiresAfterInSeconds = 3599,
                };

                var result = JsonConvert.SerializeObject(content);

                return this.Ok(result);
            }
            else if (command == "APPEND")
            {
                return this.Ok();
            }
            else if (command == "FINALIZE")
            {
                return this.Ok();
            }

            return this.BadRequest();
        }


        [Route(nameof(UploadImage))]
        [HttpPost]
        [RequestSizeLimit(1024 * 1024 * 19)] // TODO: Image size <= 5 MB, animated GIF size <= 15 MB https://developer.twitter.com/en/docs/media/upload-media/uploading-media/media-best-practices
        public async Task<HttpResponseMessage> UploadImage()
        {
            // кенов: Buffer-a e място което запазваме текущите данни, които сме прочели.
            try
            {
                var files = Request.Form.Files;

                var file = files.First();

                byte[] binary = new byte[file.Length];

                using (var stream = new BinaryReader(file.OpenReadStream()))
                {
                    byte[] buffer = new byte[file.Length];
                    while (true)
                    {
                        var read = stream.Read(buffer, 0, buffer.Length);

                        if (read < buffer.Length)
                        {
                            binary = buffer;
                            break;
                        }
                    }
                }

                //var client = new TwitterClient();

               // var media = await client.Upload.UploadTweetVideoAsync(binary);

                // if (media.HasBeenUploaded == false)
                // {
                //     // Something went wrong during the upload. Please retry or check the video type/settings.
                //     return default;
                // }

               // await client.Upload.WaitForMediaProcessingToGetAllMetadataAsync(media);

                var folderName = Path.Combine("Resources", "Media");
                var currentDirectory = Directory.GetCurrentDirectory();
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                if (IsMediaType(file.FileName, SupportedFileExtensions) == false)
                {
                    throw new ArgumentException("Not Supported Media Type");
                }


                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToValidFileName();    // Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var fileContentType = file.ContentType;

                if (file.Length >= 1024 * 1024 * 5)
                {
                    throw new ArgumentException("Image Too Heavy");
                }

            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }

            return default;
        }

        public async Task<IActionResult> UploadVideo()
        {
            return default;
        }

        private bool IsMediaType(string fileName, string[] expectedFileExtensions)
        {
            return expectedFileExtensions.Any(x => fileName.ToUpper().EndsWith(x));
        }

        // private bool IsImage(string fileName, string[] imageFileExtensions)
        // {
        //     return imageFileExtensions.Any(x => fileName.ToUpper().EndsWith(x));
        // }
        // 
        // private bool IsVideo(string fileName, string[] videoFileExtensions)
        // {
        //     return videoFileExtensions.Any(x => fileName.ToUpper().EndsWith(x));
        // }
    }
}
