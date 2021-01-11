namespace Sharebook.Storage.API.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Sharebook.Common.Extensions;
    using Sharebook.Services;
    using Sharebook.Storage.API.Common;
    using Sharebook.Storage.API.Data;
    using Sharebook.Storage.API.Extensions;
    using Sharebook.Storage.API.Models;
    using Sharebook.Storage.API.Service;
    using Sharebook.Storage.API.ViewModels;
    using Sharebook.Storage.Properties;
    using Stories.Web.Infrastructure;
    using static Amazon.Internal.RegionEndpointProviderV2;

    // [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
       

        private readonly IWebHostEnvironment _webHostEnvironment;

        private static UploadService uploadService = new UploadService(new LocalFileSystemRepository());

        public MediaController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [Route("media/upload")]
        public IActionResult Upload([FromQuery] QueryParams query)
        {
            if (query.Command == "INIT")
            {
                var session = uploadService.CreateSession((Global.LastMediaId + 1).ToString(), query.TotalBytes.Value, query.MediaType, query.MediaCategory);

                return this.Ok(UploadInitViewModel.FromSession(session));
            }
            else if (query.Command == "APPEND")
            {
                if (!query.MediaId.HasValue || query.MediaId <= 0)
                {
                    return this.BadRequest("Media Id is missing");
                }

                if (!query.SegmentIndex.HasValue || query.SegmentIndex.Value < 0 || query.SegmentIndex.Value > 999)
                {
                    return this.BadRequest("Invalid segment index");
                }

                var file = this.Request.Form.Files.First();

                uploadService.PersistBlock(query.MediaId.Value, query.SegmentIndex.Value, ToByteArray(file.OpenReadStream()));

                return this.NoContent();
            }
            else if (query.Command == "FINALIZE")
            {
                // TODO: check for invalid input

                Session session = uploadService.GetSession(query.MediaId.Value);

                // FINALIZE
                string fileDestinationPath = Path.Combine(Resources.ROOT, session.GetMediaIdForFile(query.MediaId.Value));

                if (!Directory.Exists(fileDestinationPath))
                {
                    Directory.CreateDirectory(fileDestinationPath);
                }

                string path = Path.Combine(fileDestinationPath, $"{session.MediaId}{session.FileInfo.Extension}");
                uploadService.WriteToFileStream(new FileStream(path, FileMode.Append, FileAccess.Write), session);

                return this.Ok(UploadFinalizeViewModel.FromSession(session));
            }

            return BadRequest();
        }


        //// [Authorize(Roles = "Administrator")]
        //public ActionResult GetByPlainId(int id)
        //{
        //    return this.File(this.GetPhysicalPathOfImage(id, Image.MediumResolution), Image.DefaultContentType);
        //}

        //public ActionResult Thumbnail(string id)
        //{
        //    return this.File(this.GetImageByHash(id, Image.ThumbnailResolution), Image.DefaultContentType);
        //}

        //public ActionResult Listing(string id)
        //{
        //    return this.File(this.GetImageByHash(id, Image.ListingResolution), Image.DefaultContentType);
        //}

        //public ActionResult Medium(string id)
        //{
        //    return File(this.GetImageByHash(id, Image.MediumResolution), Image.DefaultContentType);
        //}

        //public ActionResult High(string id)
        //{
        //    return File(this.GetImageByHash(id, Image.HighResolution), Image.DefaultContentType);
        //}

        //public ActionResult BlogHigh(string id)
        //{
        //    return File(this.GetImageByHash(id, Image.HighResolution, Resources.BLOG_IMAGES_PATH), Image.DefaultContentType);
        //}

        //public ActionResult BlogLow(string id)
        //{
        //    return File(this.GetImageByHash(id, Image.ThumbnailResolution, Resources.BLOG_IMAGES_PATH), Image.DefaultContentType);
        //}

        //private string GetImageByHash(string id, string size, string serverPath = null)
        //{
        //    this.Response.Headers["Expires"] = DateTime.Now.AddYears(1).ToString();
        //    this.Response.Headers.Add("Last-Modified", DateTime.Now.AddMinutes(-1).ToUniversalTime().ToString("R"));

        //    if (string.IsNullOrWhiteSpace(id) || id.Substring(5) == "0")
        //    {
        //        return Path.Combine("~/Content/Theme/img/backgrounds/default-avatar.jpg");
        //    }

        //    var toyId = id.Substring(5);
        //    if (toyId.ToMd5Hash().Substring(0, 5) != id.Substring(0, 5))
        //    {
        //        throw new ArgumentException("Image hash do not match");
        //    }

        //    var integerToyId = long.Parse(toyId);
        //    return this.GetPhysicalPathOfImage(integerToyId, size, serverPath);
        //}

        //private string GetPhysicalPathOfImage(long id, string size, string serverPath = null)
        //{
        //    if (!string.IsNullOrEmpty(serverPath))
        //    {
        //        return Path.Combine(string.Format(serverPath, id % 1000, id, size));
        //    }

        //    return Path.Combine(string.Format(Resources.IMAGES_PATH, id % 1000, id, size));
        //}

        private byte[] ToByteArray(Stream stream)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                stream.CopyTo(ms);
                return ms.ToArray();
            }
        }
    }

}
