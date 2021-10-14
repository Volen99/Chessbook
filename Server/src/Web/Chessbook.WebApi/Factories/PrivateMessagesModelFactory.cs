using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Domain.Chat;
using Chessbook.Core.Domain.Customers;
using Chessbook.Data.Models;
using Chessbook.Services;
using Chessbook.Services.Chat;
using Chessbook.Services.Helpers;
using Chessbook.Web.Api.Areas.Admin.Models.Users;
using Chessbook.Web.Api.Models.PrivateMessages;
using Chessbook.Web.Areas.Admin.Models.Customers;

namespace Chessbook.Web.Api.Factories
{
    /// <summary>
    /// Represents the private message model factory
    /// </summary>
    public class PrivateMessagesModelFactory : IPrivateMessagesModelFactory
    {
        #region Fields

        private readonly CustomerSettings _customerSettings;
        private readonly IUserService _customerService;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly IChatService chatService;
        private readonly IStoreContext _storeContext;
        private readonly IWorkContext _workContext;
        private readonly IUserModelFactory userModelFactory;

        #endregion

        #region Ctor

        public PrivateMessagesModelFactory(CustomerSettings customerSettings,
            IUserService customerService,
            IDateTimeHelper dateTimeHelper,
            IChatService forumService,
            IStoreContext storeContext,
            IWorkContext workContext,
            IUserModelFactory userModelFactory)
        {
            _customerSettings = customerSettings;
            _customerService = customerService;
            _dateTimeHelper = dateTimeHelper;
            chatService = forumService;
            _storeContext = storeContext;
            _workContext = workContext;
            this.userModelFactory = userModelFactory;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Prepare the private message index model
        /// </summary>
        /// <param name="page">Number of items page; pass null to disable paging</param>
        /// <param name="tab">Tab name</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the private message index model
        /// </returns>
        public virtual Task<PrivateMessageIndexModel> PreparePrivateMessageIndexModelAsync(int? page, string tab)
        {
            var inboxPage = 0;
            var sentItemsPage = 0;
            var sentItemsTabSelected = false;

            switch (tab)
            {
                case "inbox":
                    if (page.HasValue)
                    {
                        inboxPage = page.Value;
                    }

                    break;
                case "sent":
                    if (page.HasValue)
                    {
                        sentItemsPage = page.Value;
                    }

                    sentItemsTabSelected = true;

                    break;
                default:
                    break;
            }

            var model = new PrivateMessageIndexModel
            {
                InboxPage = inboxPage,
                SentItemsPage = sentItemsPage,
                SentItemsTabSelected = sentItemsTabSelected
            };

            return Task.FromResult(model);
        }

        /// <summary>
        /// Prepare the inbox model
        /// </summary>
        /// <param name="page">Number of items page</param>
        /// <param name="tab">Tab name</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the private message list model
        /// </returns>
        public virtual async Task<List<PrivateMessageModel>> PrepareInboxModelAsync(int page, string tab)
        {
            if (page > 0)
            {
                page -= 1;
            }

            var pageSize = int.MaxValue; // _forumSettings.PrivateMessagesPageSize;

            var messages = new List<PrivateMessageModel>();

            var fromCustomerId = 0;
            var toCustomerId = 0;

            switch (tab)
            {
                case "inbox":
                    fromCustomerId = 0;
                    toCustomerId = (await _workContext.GetCurrentCustomerAsync()).Id;
                    break;
                case "sent":
                    fromCustomerId = (await _workContext.GetCurrentCustomerAsync()).Id;
                    toCustomerId = 0;
                    break;
                default:
                    break;
            }

            var list = await this.chatService.GetAllPrivateMessagesAsync((await _storeContext.GetCurrentStoreAsync()).Id,
                fromCustomerId, toCustomerId, null, null, false, string.Empty, page, pageSize);
            foreach (var pm in list)
            {
                messages.Add(await PreparePrivateMessageModelAsync(pm));
            }

            return messages;

            //var pagerModel = new PagerModel
            //{
            //    PageSize = list.PageSize,
            //    TotalRecords = list.TotalCount,
            //    PageIndex = list.PageIndex,
            //    ShowTotalSummary = false,
            //    RouteActionName = "PrivateMessagesPaged",
            //    UseRouteLinks = true,
            //    RouteValues = new PrivateMessageRouteValues { pageNumber = page, tab = tab }
            //};

            //var model = new PrivateMessageListModel
            //{
            //    Messages = messages,
            //    PagerModel = pagerModel
            //};

            //return model;
        }

        /// <summary>
        /// Prepare the sent model
        /// </summary>
        /// <param name="page">Number of items page</param>
        /// <param name="tab">Tab name</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the private message list model
        /// </returns>
        public virtual async Task<List<PrivateMessageModel>> PrepareSentModelAsync(int page, string tab)
        {
            if (page > 0)
            {
                page -= 1;
            }

            var pageSize = int.MaxValue; // _forumSettings.PrivateMessagesPageSize;

            var messages = new List<PrivateMessageModel>();

            var list = await this.chatService.GetAllPrivateMessagesAsync((await _storeContext.GetCurrentStoreAsync()).Id,
                (await _workContext.GetCurrentCustomerAsync()).Id, 0, null, false, null, string.Empty, page, pageSize);
            foreach (var pm in list)
            {
                messages.Add(await PreparePrivateMessageModelAsync(pm));
            }

            //var pagerModel = new PagerModel
            //{
            //    PageSize = list.PageSize,
            //    TotalRecords = list.TotalCount,
            //    PageIndex = list.PageIndex,
            //    ShowTotalSummary = false,
            //    RouteActionName = "PrivateMessagesPaged",
            //    UseRouteLinks = true,
            //    RouteValues = new PrivateMessageRouteValues { pageNumber = page, tab = tab }
            //};

            //var model = new PrivateMessageListModel
            //{
            //    Messages = messages,
            //    PagerModel = pagerModel
            //};

            return messages;
        }

        /// <summary>
        /// Prepare the send private message model
        /// </summary>
        /// <param name="customerTo">Customer, recipient of the message</param>
        /// <param name="replyToPM">Private message, pass if reply to a previous message is need</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the send private message model
        /// </returns>
        public virtual async Task<SendPrivateMessageModel> PrepareSendPrivateMessageModelAsync(Customer customerTo, PrivateMessage replyToPM)
        {
            if (customerTo == null)
            {
                throw new ArgumentNullException(nameof(customerTo));
            }

            var model = new SendPrivateMessageModel
            {
                ToCustomerId = customerTo.Id,
                CustomerToName = await _customerService.FormatUsernameAsync(customerTo),
                AllowViewingToProfile = _customerSettings.AllowViewingProfiles && !await _customerService.IsGuestAsync(customerTo)
            };

            if (replyToPM == null)
            {
                return model;
            }

            if (replyToPM.ToCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id ||
                replyToPM.FromCustomerId == (await _workContext.GetCurrentCustomerAsync()).Id)
            {
                model.ReplyToMessageId = replyToPM.Id;
                model.Subject = $"Re: {replyToPM.Subject}";
            }

            return model;
        }

        /// <summary>
        /// Prepare the private message model
        /// </summary>
        /// <param name="pm">Private message</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the private message model
        /// </returns>
        public virtual async Task<PrivateMessageModel> PreparePrivateMessageModelAsync(PrivateMessage pm)
        {
            if (pm == null)
            {
                throw new ArgumentNullException(nameof(pm));
            }


            var fromCustomer = await _customerService.GetCustomerByIdAsync(pm.FromCustomerId);
            var toCustomer = await _customerService.GetCustomerByIdAsync(pm.ToCustomerId);

            var fromUser = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), fromCustomer);
            var toUser = await this.userModelFactory.PrepareCustomerModelAsync(new CustomerModel(), toCustomer);

            var model = new PrivateMessageModel
            {
                Id = pm.Id,
                FromUser = fromUser,
                ToUser = toUser,
                FromCustomerId = pm.FromCustomerId,
                CustomerFromName = await _customerService.FormatUsernameAsync(fromCustomer),
                AllowViewingFromProfile = _customerSettings.AllowViewingProfiles && !await _customerService.IsGuestAsync(fromCustomer),
                ToCustomerId = pm.ToCustomerId,
                CustomerToName = await _customerService.FormatUsernameAsync(toCustomer),
                AllowViewingToProfile = _customerSettings.AllowViewingProfiles && !await _customerService.IsGuestAsync(toCustomer),
                Subject = pm.Subject,
                Message = this.chatService.FormatPrivateMessageText(pm),
                CreatedOn = await _dateTimeHelper.ConvertToUserTimeAsync(pm.CreatedOnUtc, DateTimeKind.Utc),
                IsRead = pm.IsRead,
            };

            return model;
        }

        #endregion
    }
}
