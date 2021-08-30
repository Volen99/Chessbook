namespace Chessbook.Web.Api.Controllers
{
    using System.Linq;
    using System.IO;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Data.Models.Memory;
    using Chessbook.Web.Models.Inputs;
    using Chessbook.Services.Data.Services.Upload;
    using Chessbook.Web.Api.Properties;
    using Chessbook.Web.Models.Outputs.Chunked;
    using Chessbook.Web.Api.Extensions;
    using Chessbook.Data.Repositories;
    using Chessbook.Services.Data.Services.Entities;
    using Chessbook.Services.Data.Services.Media;
    using Chessbook.Common.Infrastructure.Helpers;

    [Route("upload")]
    public class UploadController : BaseApiController
    {
        private static UploadService uploadService = new UploadService(new LocalFileSystemRepository());

        private readonly IPictureService _pictureService;
        private readonly IMediaService mediaService;

        public UploadController(IPictureService pictureService, IMediaService mediaService)
        {
            this._pictureService = pictureService;
            this.mediaService = mediaService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromQuery] QueryUploadParams query)
        {
            if (query.Command == "INIT")
            {
                var newMediaId = this.mediaService.GetLastId() ?? 0;
              
                var session = uploadService.CreateSession(newMediaId + 1, newMediaId.ToString(), query.TotalBytes.Value, query.MediaType, query.MediaCategory);

                return this.Ok(UploadInitOutputModel.FromSession(session));
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

                var file = this.Request.Form.Files.FirstOrDefault();

                if (file == null)
                {
                    return this.BadRequest(new { success = false, message = "No file uploaded 😟" });
                }

                if (!file.ContentType.Contains("image"))
                {
                    return this.BadRequest(new { success = false, message = "No file uploaded 😟" });
                }

                const string qqFileNameParameter = "qqfilename";

                var qqFileName = Request.Form.ContainsKey(qqFileNameParameter)
                ? Request.Form[qqFileNameParameter].ToString()
                : string.Empty;

                uploadService.PersistBlock(query.MediaId.Value, query.SegmentIndex.Value, this.ToByteArray(file.OpenReadStream()));

                return this.NoContent();
            }
            else if (query.Command == "FINALIZE")
            {
                // TODO: check for invalid input

                Session session = uploadService.GetSession(query.MediaId.Value);

                // FINALIZE
                string fileFolderPath = Path.Combine(Resources.ROOT, session.GetMediaIdForFile(query.MediaId.Value));

                if (!Directory.Exists(fileFolderPath))
                {
                    Directory.CreateDirectory(fileFolderPath);
                }

                string filePath = Path.Combine(fileFolderPath, $"{session.MediaId}{session.FileInfo.Extension}");
                uploadService.WriteToFileStream(new FileStream(filePath, FileMode.Append, FileAccess.Write), session);

                await this.mediaService.WriteToDb(fileFolderPath, filePath, session.FileInfo.MediaType, session.FileInfo.Size);

                var picture = await _pictureService.InsertPictureAsync(session, filePath, session.FileInfo.Name);


                return this.Ok(UploadFinalizeOutputModel.FromSession(session));
            }

            return BadRequest();
        }

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
