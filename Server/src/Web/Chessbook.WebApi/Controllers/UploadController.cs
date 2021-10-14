namespace Chessbook.Web.Api.Controllers
{
    using System.Linq;
    using System.IO;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Web.Models.Outputs.Chunked;
    using Chessbook.Services.Data.Services.Media;

    [Route("upload")]
    public class UploadController : BaseApiController
    {
        private readonly IPictureService _pictureService;

        public UploadController(IPictureService pictureService)
        {
            this._pictureService = pictureService;
        }

        [HttpPost]
        public async Task<IActionResult> AsyncUpload()
        {
            var httpPostedFile = Request.Form.Files.FirstOrDefault();
            if (httpPostedFile == null)
            {
                return this.BadRequest(new { success = false, message = "No file uploaded" });
            }

            const string qqFileNameParameter = "qqfilename";

            var qqFileName = Request.Form.ContainsKey(qqFileNameParameter)
                ? Request.Form[qqFileNameParameter].ToString()
                : string.Empty;

            var picture = await _pictureService.InsertPictureAsync(httpPostedFile, qqFileName);

            // when returning JSON the mime-type must be set to text/plain
            // otherwise some browsers will pop-up a "Save As" dialog.

            if (picture == null)
            {
                return this.BadRequest(new { success = false, message = "Wrong file format" });
            }

            return this.Ok(new UploadFinalizeOutputModel
            {
                MediaId = picture.Id,
                ImageUrl = (await _pictureService.GetPictureUrlAsync(picture, 100)).Url
            });
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
