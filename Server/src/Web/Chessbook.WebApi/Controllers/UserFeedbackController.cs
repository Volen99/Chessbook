using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Chessbook.Common.Feedback;
using Chessbook.Services.Feedback;

namespace Chessbook.Web.Api.Controllers
{
    [Authorize]
    [Route("feedback")]
    public class UserFeedbackController : BaseApiController
    {
        private readonly ILogger logger;
        private readonly IUserFeedbackService customerFeedbackService;

        public UserFeedbackController(IUserFeedbackService feedbackService, ILogger<UserFeedbackController> logger)
        {
            customerFeedbackService = feedbackService;
            this.logger = logger;
        }

        /// <summary>
        /// Processes the customer feedback form submission.
        /// </summary>
        /// <param name="feedback">The customer feedback.</param>
        /// <returns>The result of the operation.</returns>
        // POST: api/IabCustomerFeedback/SendFeedback
        [HttpPost]
        [Route("Send")]
        public async Task<ActionResult> SendFeedback(UserFeedback feedback)
        {
            try
            {
                await customerFeedbackService.SendFeedback(feedback);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Trying to send customer feedback email.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
