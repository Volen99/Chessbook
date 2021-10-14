using Microsoft.AspNetCore.Mvc;

namespace Chessbook.Web.Api.Areas.Admin.Web.Models
{
    public class PollCreateInputModel
    {
        public string Question { get; set; }

        public string[] Options { get; set; }

        public long ExpiresIn { get; set; }

        public bool Multiple { get; set; }
    }
}
