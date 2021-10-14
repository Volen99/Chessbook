using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Chessbook.Core;
using Chessbook.Services.Logging;
using Chessbook.Web.Framework.Controllers;
using Chessbook.Services;
using Chessbook.Web.Api.Factories;
using Chessbook.Services.Chat;
using Chessbook.Core.Domain.Chat;
using Chessbook.Data.Models;
using Chessbook.Web.Api.Models.PrivateMessages;

namespace Chessbook.Web.Api.Controllers
{
    // Why am I still alive? 9/16/2021, Thursday, 18:23 | Santiz - Выше всех
    [Route("pm")]
    public class PrivateMessagesController : BaseApiController
    {
        #region Fields

        private readonly ICustomerActivityService _customerActivityService;
        private readonly IUserService _customerService;
        private readonly IPrivateMessagesModelFactory privateMessagesModelFactory;
        private readonly IStoreContext _storeContext;
        private readonly IWorkContext _workContext;
        private readonly IChatService chatService;

        #endregion

        #region Ctor

        public PrivateMessagesController(ICustomerActivityService customerActivityService,
            IUserService customerService, IChatService chatService,
            IPrivateMessagesModelFactory privateMessagesModelFactory,
            IStoreContext storeContext, IWorkContext workContext)
        {
            _customerActivityService = customerActivityService;
            _customerService = customerService;
            this.chatService = chatService;
            this.privateMessagesModelFactory = privateMessagesModelFactory;
            _storeContext = storeContext;
            _workContext = workContext;
        }

        #endregion

        #region Methods

        [HttpGet]
        [Route("index")]
        public async Task<IActionResult> Index([FromQuery] int? pageNumber, [FromQuery] string tab)
        {
            if (await _customerService.IsGuestAsync(await _workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            // var model = await this.privateMessagesModelFactory.PreparePrivateMessageIndexModelAsync(pageNumber, tab);

            var model = await this.privateMessagesModelFactory.PrepareInboxModelAsync(pageNumber.HasValue ? pageNumber.Value : 0, tab);
            return this.Ok(new
            {
                data = model,
                total = model.Count,
            });
        }



        [HttpPost, FormValueRequired("mark-unread"), ActionName("InboxUpdate")]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> MarkUnread(IFormCollection formCollection)
        {
            foreach (var key in formCollection.Keys)
            {
                var value = formCollection[key];

                if (value.Equals("on") && key.StartsWith("pm", StringComparison.InvariantCultureIgnoreCase))
                {
                    var id = key.Replace("pm", "").Trim();
                    if (int.TryParse(id, out var privateMessageId))
                    {
                        var pm = await this.chatService.GetPrivateMessageByIdAsync(privateMessageId);
                        if (pm != null)
                        {
                            if (pm.ToCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id)
                            {
                                pm.IsRead = false;
                                await this.chatService.UpdatePrivateMessageAsync(pm);
                            }
                        }
                    }
                }
            }
            return RedirectToRoute("PrivateMessages");
        }

        public async Task<IActionResult> SendPM(int toCustomerId, int? replyToMessageId)
        {
            if (await _customerService.IsGuestAsync(await _workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            var customerTo = await _customerService.GetCustomerByIdAsync(toCustomerId);
            if (customerTo == null || await _customerService.IsGuestAsync(customerTo))
            {
                return this.BadRequest("PrivateMessages");
            }

            PrivateMessage replyToPM = null;
            if (replyToMessageId.HasValue)
            {
                // reply to a previous PM
                replyToPM = await this.chatService.GetPrivateMessageByIdAsync(replyToMessageId.Value);
            }

            var model = await this.privateMessagesModelFactory.PrepareSendPrivateMessageModelAsync(customerTo, replyToPM);
            return this.Ok(model);
        }

        [HttpPost]
        [Route("send")]
        //[AutoValidateAntiforgeryToken]
        public async Task<IActionResult> SendPM([FromBody] SendPrivateMessageModel model)
        {
            if (await _customerService.IsGuestAsync(await _workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            Customer toCustomer;
            var replyToPM = await this.chatService.GetPrivateMessageByIdAsync(model.ReplyToMessageId);
            if (replyToPM != null)
            {
                // reply to a previous PM
                if (replyToPM.ToCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id || replyToPM.FromCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id)
                {
                    // Reply to already sent PM (by current customer) should not be sent to yourself
                    toCustomer = await _customerService.GetCustomerByIdAsync(replyToPM.FromCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id
                        ? replyToPM.ToCustomerId
                        : replyToPM.FromCustomerId);
                }
                else
                {
                    return RedirectToRoute("PrivateMessages");
                }
            }
            else
            {
                // first PM
                toCustomer = await _customerService.GetCustomerByIdAsync(model.ToCustomerId);
            }

            if (toCustomer == null || await _customerService.IsGuestAsync(toCustomer))
            {
                return RedirectToRoute("PrivateMessages");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var subject = model.Subject;
                    //if (_forumSettings.PMSubjectMaxLength > 0 && subject.Length > _forumSettings.PMSubjectMaxLength)
                    //{
                    //    subject = subject[0.._forumSettings.PMSubjectMaxLength];
                    //}

                    var text = model.Message;
                    //if (_forumSettings.PMTextMaxLength > 0 && text.Length > _forumSettings.PMTextMaxLength)
                    //{
                    //    text = text[0.._forumSettings.PMTextMaxLength];
                    //}

                    var nowUtc = DateTime.UtcNow;

                    var privateMessage = new PrivateMessage
                    {
                        StoreId = (await _storeContext.GetCurrentStoreAsync()).Id,
                        ToCustomerId = toCustomer.Id,
                        FromCustomerId = (await _workContext.GetCurrentCustomerAsync()).Id,
                        Subject = subject,
                        Text = text,
                        IsDeletedByAuthor = false,
                        IsDeletedByRecipient = false,
                        IsRead = false,
                        CreatedOnUtc = nowUtc
                    };

                    await this.chatService.InsertPrivateMessageAsync(privateMessage);

                    ////activity log
                    //await _customerActivityService.InsertActivityAsync("PublicStore.SendPM",
                    //    string.Format(await _localizationService.GetResourceAsync("ActivityLog.PublicStore.SendPM"), toCustomer.Email), toCustomer);

                    return this.Ok(new { tab = "sent" });
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }

            model = await this.privateMessagesModelFactory.PrepareSendPrivateMessageModelAsync(toCustomer, replyToPM);
            return this.Ok(model);
        }

        [HttpGet]
        [Route("view-pm/{id:int}")]
        public async Task<IActionResult> ViewPM(int id)
        {
            if (await _customerService.IsGuestAsync(await _workContext.GetCurrentCustomerAsync()))
            {
                return this.Unauthorized();
            }

            var pm = await this.chatService.GetPrivateMessageByIdAsync(id);
            if (pm != null)
            {
                if (pm.ToCustomerId != (await _workContext.GetCurrentCustomerAsync()).Id && pm.FromCustomerId != (await _workContext.GetCurrentCustomerAsync()).Id)
                {
                    return RedirectToRoute("PrivateMessages");
                }

                if (!pm.IsRead && pm.ToCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id)
                {
                    pm.IsRead = true;
                    await this.chatService.UpdatePrivateMessageAsync(pm);
                }
            }
            else
            {
                return this.NotFound("PrivateMessages");
            }

            var model = await this.privateMessagesModelFactory.PreparePrivateMessageModelAsync(pm);
            return this.Ok(model);
        }

        [HttpPost]
        [Route("delete-inbox/{id:int}")]
        public virtual async Task<IActionResult> DeleteInboxPM(int id)
        {
            var pm = await this.chatService.GetPrivateMessageByIdAsync(id);
            if (pm != null)
            {
                if (pm.ToCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id)
                {
                    pm.IsDeletedByRecipient = true;
                    await this.chatService.UpdatePrivateMessageAsync(pm);
                }
            }

            return this.Ok();
        }

        [HttpPost]
        [Route("delete-sent/{id:int}")]
        public async Task<IActionResult> DeleteSentPM(int id)
        {
            var pm = await this.chatService.GetPrivateMessageByIdAsync(id);
            if (pm != null)
            {
                if (pm.FromCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id)
                {
                    pm.IsDeletedByAuthor = true;
                    await this.chatService.UpdatePrivateMessageAsync(pm);
                }
            }
            return this.Ok();
        }

        public async Task<IActionResult> DeletePM(int privateMessageId)
        {
            if (await _customerService.IsGuestAsync(await _workContext.GetCurrentCustomerAsync()))
            {
                return Challenge();
            }

            var pm = await this.chatService.GetPrivateMessageByIdAsync(privateMessageId);
            if (pm != null)
            {
                if (pm.FromCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id)
                {
                    pm.IsDeletedByAuthor = true;
                    await this.chatService.UpdatePrivateMessageAsync(pm);
                }

                if (pm.ToCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id)
                {
                    pm.IsDeletedByRecipient = true;
                    await this.chatService.UpdatePrivateMessageAsync(pm);
                }
            }
            return RedirectToRoute("PrivateMessages");
        }

        #endregion
    }
}
