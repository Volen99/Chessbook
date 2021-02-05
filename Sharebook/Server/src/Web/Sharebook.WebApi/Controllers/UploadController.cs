namespace Sharebook.Web.Api.Controllers
{
    using System.Linq;
    using System.IO;
    using Microsoft.AspNetCore.Mvc;

    using Sharebook.Data.Models.Memory;
    using Sharebook.Web.Models.Inputs;
    using Sharebook.Services.Data.Services.Upload;
    using Sharebook.Web.Api.Properties;
    using Sharebook.Web.Models.Outputs.Chunked;
    using Sharebook.Web.Api.Extensions;
    using Sharebook.Data.Repositories;
    using Sharebook.Common;
    using Sharebook.Web.Api.Identity;
    using System.Threading.Tasks;
    using Sharebook.Services.Data.Services.Entities;

    [Route("upload")]
    public class UploadController : BaseApiController
    {
        private static UploadService uploadService = new UploadService(new LocalFileSystemRepository());

        private readonly IMediaService mediaService;

        public UploadController(IMediaService mediaService)
        {
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

                var file = this.Request.Form.Files.First();

                uploadService.PersistBlock(query.MediaId.Value, query.SegmentIndex.Value, this.ToByteArray(file.OpenReadStream()));

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

                await this.mediaService.WriteToDb(fileDestinationPath, path, session.FileInfo.MediaType, session.FileInfo.Size);

                return this.Ok(UploadFinalizeOutputModel.FromSession(session));
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
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
