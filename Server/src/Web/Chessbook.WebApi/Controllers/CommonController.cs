using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Models.Common;
using Chessbook.Core;
using Chessbook.Services.Messages;

namespace Chessbook.Web.Api.Controllers
{
    [Route("common")]
    public class CommonController : BaseApiController
    {
        private readonly ICommonModelFactory commonModelFactory;
        private readonly IWorkContext workContext;
        private readonly IWorkflowMessageService workflowMessageService;

        public CommonController(ICommonModelFactory commonModelFactory, IWorkContext workContext, IWorkflowMessageService workflowMessageService)
        {
            this.commonModelFactory = commonModelFactory;
            this.workContext = workContext;
            this.workflowMessageService = workflowMessageService;
        }

        [HttpPost]
        [Route("contact")]
        public async Task<IActionResult> ContactUsSend([FromBody] ContactUsModel model)
        {
            model = await this.commonModelFactory.PrepareContactUsModelAsync(model, true);

            var subject = model.Subject;
            var body = Core.Html.HtmlHelper.FormatText(model.Body, false, true, false, false, false, false);

            await this.workflowMessageService.SendContactUsMessageAsync(model.FromEmail.Trim(), model.FromName, subject, body);

            model.SuccessfullySent = true;
            model.Result = "Your enquiry has been successfully sent.";

            return this.Ok(model);
        }

    }
}
