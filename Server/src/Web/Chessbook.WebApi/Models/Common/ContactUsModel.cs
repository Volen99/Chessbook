using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Api.Models.Common
{
    public record ContactUsModel : BaseNopModel
    {
        public string FromEmail { get; set; }
        
        public string Subject { get; set; }
        public bool SubjectEnabled { get; set; }

        public string Body { get; set; }

        public string FromName { get; set; }

        public bool SuccessfullySent { get; set; }
        public string Result { get; set; }

        public bool DisplayCaptcha { get; set; }
    }
}
