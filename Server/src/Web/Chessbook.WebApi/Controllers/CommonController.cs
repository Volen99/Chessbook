using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Web.Api.Factories;
using Chessbook.Web.Api.Models.Common;
using Chessbook.Core;
using Chessbook.Services.Messages;
using Chessbook.Services.Common;
using Chessbook.Common;

namespace Chessbook.Web.Api.Controllers
{
    [Route("common")]
    public class CommonController : BaseApiController
    {
        private readonly ICommonModelFactory commonModelFactory;
        private readonly IWorkContext workContext;
        private readonly IWorkflowMessageService workflowMessageService;
        private readonly IGenericAttributeService genericAttributeService;

        public CommonController(ICommonModelFactory commonModelFactory, IWorkContext workContext, IWorkflowMessageService workflowMessageService,
            IGenericAttributeService genericAttributeService)
        {
            this.commonModelFactory = commonModelFactory;
            this.workContext = workContext;
            this.workflowMessageService = workflowMessageService;
            this.genericAttributeService = genericAttributeService;
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

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> EuCookieLawAccept()
        {
            // save setting
            await this.genericAttributeService.SaveAttributeAsync(await this.workContext.GetCurrentCustomerAsync(), NopCustomerDefaults.EuCookieLawAcceptedAttribute, true, 1);
            return this.Ok(new { stored = true });
        }

        // robots.txt file
        public async Task<IActionResult> RobotsTextFile()
        {
            var robotsFileContent = await this.commonModelFactory.PrepareRobotsTextFileAsync();

            return Content(robotsFileContent, MimeTypes.TextPlain);
        }

    }
}
