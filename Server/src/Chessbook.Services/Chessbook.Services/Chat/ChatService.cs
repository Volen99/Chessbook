using System;
using System.Threading.Tasks;
using System.Linq;

using Chessbook.Core;
using Chessbook.Data;
using Chessbook.Core.Domain.Chat;
using Chessbook.Services.Common;
using Chessbook.Core.Html;
using Chessbook.Services.Messages;
using Chessbook.Services.Notifications.Settings;
using Chessbook.Core.Domain.Notifications;

namespace Chessbook.Services.Chat
{
    public class ChatService : IChatService
    {
        private readonly IRepository<PrivateMessage> privateMessageRepository;

        private readonly IWorkContext workContext;
        private readonly IUserService userService;
        private readonly IGenericAttributeService genericAttributeService;
        private readonly IWorkflowMessageService workflowMessageService;
        private readonly INotificationsSettingsService notificationsSettingsService;

        public ChatService(IRepository<PrivateMessage> privateMessageRepository, IWorkContext workContext, IUserService userService,
            IGenericAttributeService genericAttributeService, IWorkflowMessageService workflowMessageService, INotificationsSettingsService notificationsSettingsService)
        {
            this.privateMessageRepository = privateMessageRepository;
            this.workContext = workContext;
            this.userService = userService;
            this.genericAttributeService = genericAttributeService;
            this.notificationsSettingsService = notificationsSettingsService;
            this.workflowMessageService = workflowMessageService;
        }

        /// <summary>
        /// Gets a private message
        /// </summary>
        /// <param name="privateMessageId">The private message identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the private message
        /// </returns>
        public async Task<PrivateMessage> GetPrivateMessageByIdAsync(int privateMessageId)
        {
            return await this.privateMessageRepository.GetByIdAsync(privateMessageId, cache => default);
        }

        /// <summary>
        /// Gets private messages
        /// </summary>
        /// <param name="storeId">The store identifier; pass 0 to load all messages</param>
        /// <param name="fromCustomerId">The customer identifier who sent the message</param>
        /// <param name="toCustomerId">The customer identifier who should receive the message</param>
        /// <param name="isRead">A value indicating whether loaded messages are read. false - to load not read messages only, 1 to load read messages only, null to load all messages</param>
        /// <param name="isDeletedByAuthor">A value indicating whether loaded messages are deleted by author. false - messages are not deleted by author, null to load all messages</param>
        /// <param name="isDeletedByRecipient">A value indicating whether loaded messages are deleted by recipient. false - messages are not deleted by recipient, null to load all messages</param>
        /// <param name="keywords">Keywords</param>
        /// <param name="pageIndex">Page index</param>
        /// <param name="pageSize">Page size</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the private messages
        /// </returns>
        public virtual async Task<IPagedList<PrivateMessage>> GetAllPrivateMessagesAsync(int storeId, int fromCustomerId,
            int toCustomerId, bool? isRead, bool? isDeletedByAuthor, bool? isDeletedByRecipient,
            string keywords, int pageIndex = 0, int pageSize = int.MaxValue)
        {
            var privateMessages = await this.privateMessageRepository.GetAllPagedAsync(query =>
            {
                if (fromCustomerId > 0)
                {
                    query = query.Where(pm => fromCustomerId == pm.FromCustomerId);
                }
                if (toCustomerId > 0)
                {
                    query = query.Where(pm => toCustomerId == pm.ToCustomerId);
                }
                if (isRead.HasValue)
                {
                    query = query.Where(pm => isRead.Value == pm.IsRead);
                }
                if (isDeletedByAuthor.HasValue)
                {
                    query = query.Where(pm => isDeletedByAuthor.Value == pm.IsDeletedByAuthor);
                }
                if (isDeletedByRecipient.HasValue)
                {
                    query = query.Where(pm => isDeletedByRecipient.Value == pm.IsDeletedByRecipient);
                }

                if (!isDeletedByAuthor.HasValue && !isDeletedByRecipient.HasValue)
                {
                    query = query.Where(pm => pm.IsDeletedByAuthor == false && pm.IsDeletedByRecipient == false);
                }

                if (!string.IsNullOrEmpty(keywords))
                {
                    query = query.Where(pm => pm.Subject.Contains(keywords));
                    query = query.Where(pm => pm.Text.Contains(keywords));
                }

                query = query.OrderByDescending(pm => pm.CreatedOnUtc);

                return query;
            }, pageIndex, pageSize);

            return privateMessages;
        }

        /// <summary>
        /// Inserts a private message
        /// </summary>
        /// <param name="privateMessage">Private message</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task InsertPrivateMessageAsync(PrivateMessage privateMessage)
        {
            await this.privateMessageRepository.InsertAsync(privateMessage);

            var customerTo = await this.userService.GetCustomerByIdAsync(privateMessage.ToCustomerId);
            if (customerTo == null)
            {
                throw new NopException("Recipient could not be loaded");
            }

            var notifications = await this.notificationsSettingsService.GetByUserId(privateMessage.ToCustomerId);

            if (this.IsNotificationBoth(notifications.AbuseAsModerator))
            {
                await this.genericAttributeService.SaveAttributeAsync(customerTo, NopCustomerDefaults.NotifiedAboutNewPrivateMessagesAttribute, false, 1);
                await this.workflowMessageService.SendPrivateMessageNotificationAsync(privateMessage, 1);
            }
            else if (this.IsWebNotificationEnabled(notifications.AbuseAsModerator))
            {
                await this.genericAttributeService.SaveAttributeAsync(customerTo, NopCustomerDefaults.NotifiedAboutNewPrivateMessagesAttribute, false, 1);
            }
            else if (this.IsEmailEnabled(notifications.AbuseAsModerator))
            {
                await this.workflowMessageService.SendPrivateMessageNotificationAsync(privateMessage, 1);
            }
        }

        /// <summary>
        /// Updates the private message
        /// </summary>
        /// <param name="privateMessage">Private message</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task UpdatePrivateMessageAsync(PrivateMessage privateMessage)
        {
            if (privateMessage == null)
            {
                throw new ArgumentNullException(nameof(privateMessage));
            }

            if (privateMessage.IsDeletedByAuthor && privateMessage.IsDeletedByRecipient)
            {
                await this.privateMessageRepository.DeleteAsync(privateMessage);
            }

            await this.privateMessageRepository.UpdateAsync(privateMessage);
        }

        /// <summary>
        /// Deletes a private message
        /// </summary>
        /// <param name="privateMessage">Private message</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task DeletePrivateMessageAsync(PrivateMessage privateMessage)
        {
            await this.privateMessageRepository.DeleteAsync(privateMessage);
        }

        /// <summary>
        /// Formats the private message text
        /// </summary>
        /// <param name="pm">Private message</param>
        /// <returns>Formatted text</returns>
        public virtual string FormatPrivateMessageText(PrivateMessage pm)
        {
            var text = pm.Text;

            if (string.IsNullOrEmpty(text))
            {
                return string.Empty;
            }

            text = HtmlHelper.FormatText(text, false, true, false, true, false, false);

            return text;
        }

        private bool IsWebNotificationEnabled(UserNotificationSettingValue value)
        {
            return value == UserNotificationSettingValue.WEB;
        }

        private bool IsEmailEnabled(UserNotificationSettingValue value)
        {
            return value == UserNotificationSettingValue.EMAIL;
        }

        private bool IsNotificationBoth(UserNotificationSettingValue value)
        {
            return value == UserNotificationSettingValue.BOTH;
        }
    }
}
