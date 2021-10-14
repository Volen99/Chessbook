using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Domain.Chat;
using Chessbook.Core.Domain.Common;
using Chessbook.Core.Domain.Messages;
using Chessbook.Core.Domain.Posts;
using Chessbook.Core.Events;
using Chessbook.Data.Models;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Localization;
using Chessbook.Services.Stores;

namespace Chessbook.Services.Messages
{
    /// <summary>
    /// Workflow message service
    /// </summary>
    public partial class WorkflowMessageService : IWorkflowMessageService
    {
        #region Fields

        private readonly CommonSettings _commonSettings;
        private readonly EmailAccountSettings _emailAccountSettings;
        private readonly IUserService _customerService;
        private readonly IEmailAccountService _emailAccountService;
        private readonly IEventPublisher _eventPublisher;
        private readonly ILanguageService _languageService;
        private readonly IMessageTemplateService _messageTemplateService;
        private readonly IMessageTokenProvider _messageTokenProvider;
        private readonly IPostsService _productService;
        private readonly IQueuedEmailService _queuedEmailService;
        private readonly IStoreContext _storeContext;
        private readonly IStoreService _storeService;
        private readonly ITokenizer _tokenizer;

        #endregion

        #region Ctor

        public WorkflowMessageService(CommonSettings commonSettings,
            EmailAccountSettings emailAccountSettings,
            IUserService customerService,
            IEmailAccountService emailAccountService,
            IEventPublisher eventPublisher,
            ILanguageService languageService,
            IMessageTemplateService messageTemplateService,
            IMessageTokenProvider messageTokenProvider,
            IPostsService productService,
            IQueuedEmailService queuedEmailService,
            IStoreContext storeContext,
            IStoreService storeService,
            ITokenizer tokenizer)
        {
            _commonSettings = commonSettings;
            _emailAccountSettings = emailAccountSettings;
            _customerService = customerService;
            _emailAccountService = emailAccountService;
            _eventPublisher = eventPublisher;
            _languageService = languageService;
            _messageTemplateService = messageTemplateService;
            _messageTokenProvider = messageTokenProvider;
            _productService = productService;
            _queuedEmailService = queuedEmailService;
            _storeContext = storeContext;
            _storeService = storeService;
            _tokenizer = tokenizer;
        }

        #endregion

        #region Utilities

        /// <summary>
        /// Get active message templates by the name
        /// </summary>
        /// <param name="messageTemplateName">Message template name</param>
        /// <param name="storeId">Store identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the list of message templates
        /// </returns>
        protected virtual async Task<IList<MessageTemplate>> GetActiveMessageTemplatesAsync(string messageTemplateName, int storeId)
        {
            //get message templates by the name
            var messageTemplates = await _messageTemplateService.GetMessageTemplatesByNameAsync(messageTemplateName, storeId);

            //no template found
            if (!messageTemplates?.Any() ?? true)
                return new List<MessageTemplate>();

            //filter active templates
            messageTemplates = messageTemplates.Where(messageTemplate => messageTemplate.IsActive).ToList();

            return messageTemplates;
        }

        /// <summary>
        /// Get EmailAccount to use with a message templates
        /// </summary>
        /// <param name="messageTemplate">Message template</param>
        /// <param name="languageId">Language identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the emailAccount
        /// </returns>
        protected virtual async Task<EmailAccount> GetEmailAccountOfMessageTemplateAsync(MessageTemplate messageTemplate)
        {
            var emailAccountId = messageTemplate.EmailAccountId; // await _localizationService.GetLocalizedAsync(messageTemplate, mt => mt.EmailAccountId, languageId);
            // some 0 validation (for localizable "Email account" dropdownlist which saves 0 if "Standard" value is chosen)
            if (emailAccountId == 0)
            {
                emailAccountId = messageTemplate.EmailAccountId;
            }

            var emailAccount = (await _emailAccountService.GetEmailAccountByIdAsync(emailAccountId) ?? await _emailAccountService.GetEmailAccountByIdAsync(_emailAccountSettings.DefaultEmailAccountId)) ??
                               (await _emailAccountService.GetAllEmailAccountsAsync()).FirstOrDefault();
            return emailAccount;
        }

        /// <summary>
        /// Ensure language is active
        /// </summary>
        /// <param name="languageId">Language identifier</param>
        /// <param name="storeId">Store identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the return a value language identifier
        /// </returns>
        protected virtual async Task<int> EnsureLanguageIsActiveAsync(int languageId, int storeId)
        {
            //load language by specified ID
            var language = await _languageService.GetLanguageByIdAsync(languageId);

            if (language == null || !language.Published)
            {
                //load any language from the specified store
                language = (await _languageService.GetAllLanguagesAsync(storeId: storeId)).FirstOrDefault();
            }

            if (language == null || !language.Published)
            {
                //load any language
                language = (await _languageService.GetAllLanguagesAsync()).FirstOrDefault();
            }

            if (language == null)
                throw new Exception("No active language could be loaded");

            return language.Id;
        }

        #endregion

        #region Methods

        #region Customer workflow

        /// <summary>
        /// Sends 'New customer' notification message to a store owner
        /// </summary>
        /// <param name="customer">Customer instance</param>
        /// <param name="languageId">Message language identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<IList<int>> SendCustomerRegisteredNotificationMessageAsync(Customer customer, int languageId)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            var store = await _storeContext.GetCurrentStoreAsync();
            languageId = await EnsureLanguageIsActiveAsync(languageId, store.Id);

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.CustomerRegisteredNotification, store.Id);
            if (!messageTemplates.Any())
            {
                return new List<int>();
            }

            //tokens
            var commonTokens = new List<Token>();
            await _messageTokenProvider.AddCustomerTokensAsync(commonTokens, customer);

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                //email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                //event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                var toEmail = emailAccount.Email;
                var toName = emailAccount.DisplayName;

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, toEmail, toName);
            }).ToListAsync();
        }

        /// <summary>
        /// Sends a welcome message to a customer
        /// </summary>
        /// <param name="customer">Customer instance</param>
        /// <param name="languageId">Message language identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<IList<int>> SendCustomerWelcomeMessageAsync(Customer customer, int languageId)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));

            var store = await _storeContext.GetCurrentStoreAsync();
            languageId = await EnsureLanguageIsActiveAsync(languageId, store.Id);

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.CustomerWelcomeMessage, store.Id);
            if (!messageTemplates.Any())
                return new List<int>();

            //tokens
            var commonTokens = new List<Token>();
            await _messageTokenProvider.AddCustomerTokensAsync(commonTokens, customer);

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                //email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                //event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                var toEmail = customer.Email;
                var toName = customer.DisplayName; // await _customerService.GetCustomerFullNameAsync(customer);

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, toEmail, toName);
            }).ToListAsync();
        }

        /// <summary>
        /// Sends an email validation message to a customer
        /// </summary>
        /// <param name="customer">Customer instance</param>
        /// <param name="languageId">Message language identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<IList<int>> SendCustomerEmailValidationMessageAsync(Customer customer, int languageId)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));

            var store = await _storeContext.GetCurrentStoreAsync();
            languageId = await EnsureLanguageIsActiveAsync(languageId, store.Id);

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.CustomerEmailValidationMessage, store.Id);
            if (!messageTemplates.Any())
                return new List<int>();

            //tokens
            var commonTokens = new List<Token>();
            await _messageTokenProvider.AddCustomerTokensAsync(commonTokens, customer);

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                // email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                // event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                var toEmail = customer.Email;
                var toName = customer.DisplayName; // await _customerService.GetCustomerFullNameAsync(customer);

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, toEmail, toName);
            }).ToListAsync();
        }

        /// <summary>
        /// Sends an email re-validation message to a customer
        /// </summary>
        /// <param name="customer">Customer instance</param>
        /// <param name="languageId">Message language identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<IList<int>> SendCustomerEmailRevalidationMessageAsync(Customer customer, int languageId)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            var store = await _storeContext.GetCurrentStoreAsync();
            languageId = await EnsureLanguageIsActiveAsync(languageId, store.Id);

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.CustomerEmailRevalidationMessage, store.Id);
            if (!messageTemplates.Any())
            {
                return new List<int>();
            }

            // tokens
            var commonTokens = new List<Token>();
            await _messageTokenProvider.AddCustomerTokensAsync(commonTokens, customer);

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                // email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                // event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                // email to re-validate
                var toEmail = customer.Email; // customer.EmailToRevalidate;
                var toName = customer.DisplayName; // await _customerService.GetCustomerFullNameAsync(customer);

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, toEmail, toName);
            }).ToListAsync();
        }

        /// <summary>
        /// Sends password recovery message to a customer
        /// </summary>
        /// <param name="customer">Customer instance</param>
        /// <param name="languageId">Message language identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<IList<int>> SendCustomerPasswordRecoveryMessageAsync(Customer customer, int languageId)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            var store = await _storeContext.GetCurrentStoreAsync();
            languageId = await EnsureLanguageIsActiveAsync(languageId, store.Id);

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.CustomerPasswordRecoveryMessage, store.Id);
            if (!messageTemplates.Any())
            {
                return new List<int>();
            }

            // tokens
            var commonTokens = new List<Token>();
            await _messageTokenProvider.AddCustomerTokensAsync(commonTokens, customer);

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                //email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                //event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                var toEmail = customer.Email;
                var toName = customer.DisplayName; // await _customerService.GetCustomerFullNameAsync(customer);

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, toEmail, toName);
            }).ToListAsync();
        }

        #endregion

        #region Send a message to a friend

        /// <summary>
        /// Sends "email a friend" message
        /// </summary>
        /// <param name="customer">Customer instance</param>
        /// <param name="languageId">Message language identifier</param>
        /// <param name="product">Product instance</param>
        /// <param name="customerEmail">Customer's email</param>
        /// <param name="friendsEmail">Friend's email</param>
        /// <param name="personalMessage">Personal message</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<IList<int>> SendProductEmailAFriendMessageAsync(Customer customer, int languageId,
            Post product, string customerEmail, string friendsEmail, string personalMessage)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));

            if (product == null)
                throw new ArgumentNullException(nameof(product));

            var store = await _storeContext.GetCurrentStoreAsync();
            languageId = await EnsureLanguageIsActiveAsync(languageId, store.Id);

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.EmailAFriendMessage, store.Id);
            if (!messageTemplates.Any())
                return new List<int>();

            //tokens
            var commonTokens = new List<Token>();
            await _messageTokenProvider.AddCustomerTokensAsync(commonTokens, customer);
            // await _messageTokenProvider.AddProductTokensAsync(commonTokens, product, languageId);
            commonTokens.Add(new Token("EmailAFriend.PersonalMessage", personalMessage, true));
            commonTokens.Add(new Token("EmailAFriend.Email", customerEmail));

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                //email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                //event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, friendsEmail, string.Empty);
            }).ToListAsync();
        }

        /// <summary>
        /// Sends wishlist "email a friend" message
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="languageId">Message language identifier</param>
        /// <param name="customerEmail">Customer's email</param>
        /// <param name="friendsEmail">Friend's email</param>
        /// <param name="personalMessage">Personal message</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<IList<int>> SendWishlistEmailAFriendMessageAsync(Customer customer, int languageId,
             string customerEmail, string friendsEmail, string personalMessage)
        {
            if (customer == null)
                throw new ArgumentNullException(nameof(customer));

            var store = await _storeContext.GetCurrentStoreAsync();
            languageId = await EnsureLanguageIsActiveAsync(languageId, store.Id);

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.WishlistToFriendMessage, store.Id);
            if (!messageTemplates.Any())
                return new List<int>();

            //tokens
            var commonTokens = new List<Token>();
            await _messageTokenProvider.AddCustomerTokensAsync(commonTokens, customer);
            commonTokens.Add(new Token("Wishlist.PersonalMessage", personalMessage, true));
            commonTokens.Add(new Token("Wishlist.Email", customerEmail));

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                //email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                //event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, friendsEmail, string.Empty);
            }).ToListAsync();
        }

        #endregion

        #region Misc

        /// <summary>
        /// Sends a blog comment notification message to a store owner
        /// </summary>
        /// <param name="blogComment">Blog comment</param>
        /// <param name="languageId">Message language identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the list of queued email identifiers
        /// </returns>
        public virtual async Task<IList<int>> SendBlogCommentNotificationMessageAsync(PostComment blogComment, int languageId)
        {
            if (blogComment == null)
                throw new ArgumentNullException(nameof(blogComment));

            var store = await _storeContext.GetCurrentStoreAsync();
            languageId = await EnsureLanguageIsActiveAsync(languageId, store.Id);

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.BlogCommentNotification, store.Id);
            if (!messageTemplates.Any())
                return new List<int>();

            //tokens
            var commonTokens = new List<Token>();
            await _messageTokenProvider.AddBlogCommentTokensAsync(commonTokens, blogComment);
            await _messageTokenProvider.AddCustomerTokensAsync(commonTokens, blogComment.UserId);

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                //email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                //event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                var toEmail = emailAccount.Email;
                var toName = emailAccount.DisplayName;

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, toEmail, toName);
            }).ToListAsync();
        }

        /// <summary>
        /// Sends "contact us" message
        /// </summary>
        /// <param name="languageId">Message language identifier</param>
        /// <param name="senderEmail">Sender email</param>
        /// <param name="senderName">Sender name</param>
        /// <param name="subject">Email subject. Pass null if you want a message template subject to be used.</param>
        /// <param name="body">Email body</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<IList<int>> SendContactUsMessageAsync(string senderEmail, string senderName, string subject, string body)
        {
            var store = await _storeContext.GetCurrentStoreAsync();
            // languageId = await EnsureLanguageIsActiveAsync(languageId, store.Id);

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.ContactUsMessage, store.Id);
            if (!messageTemplates.Any())
            {
                return new List<int>();
            }

            // tokens
            var commonTokens = new List<Token>
            {
                new Token("ContactUs.SenderEmail", senderEmail),
                new Token("ContactUs.SenderName", senderName),
                new Token("ContactUs.Body", body, true)
            };

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                // email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                string fromEmail;
                string fromName;
                // required for some SMTP servers
                if (false) /*_commonSettings.UseSystemEmailForContactUsForm*/
                {
                    fromEmail = emailAccount.Email;
                    fromName = emailAccount.DisplayName;
                    body = $"<strong>From</strong>: {WebUtility.HtmlEncode(senderName)} - {WebUtility.HtmlEncode(senderEmail)}<br /><br />{body}";
                }
                else
                {
                    fromEmail = senderEmail;
                    fromName = senderName;
                }

                // event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                var toEmail = emailAccount.Email;
                var toName = emailAccount.DisplayName;

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, toEmail, toName,
                    fromEmail: fromEmail,
                    fromName: fromName,
                    subject: subject,
                    replyToEmailAddress: senderEmail,
                    replyToName: senderName);
            }).ToListAsync();
        }

        /// <summary>
        /// Sends a test email
        /// </summary>
        /// <param name="messageTemplateId">Message template identifier</param>
        /// <param name="sendToEmail">Send to email</param>
        /// <param name="tokens">Tokens</param>
        /// <param name="languageId">Message language identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<int> SendTestEmailAsync(int messageTemplateId, string sendToEmail, List<Token> tokens, int languageId)
        {
            var messageTemplate = await _messageTemplateService.GetMessageTemplateByIdAsync(messageTemplateId);
            if (messageTemplate == null)
                throw new ArgumentException("Template cannot be loaded");

            //email account
            var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

            //event notification
            await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

            //force sending
            messageTemplate.DelayBeforeSend = null;

            return await SendNotificationAsync(messageTemplate, emailAccount, tokens, sendToEmail, null);
        }

        #endregion

        #region Common

        /// <summary>
        /// Send notification
        /// </summary>
        /// <param name="messageTemplate">Message template</param>
        /// <param name="emailAccount">Email account</param>
        /// <param name="languageId">Language identifier</param>
        /// <param name="tokens">Tokens</param>
        /// <param name="toEmailAddress">Recipient email address</param>
        /// <param name="toName">Recipient name</param>
        /// <param name="attachmentFilePath">Attachment file path</param>
        /// <param name="attachmentFileName">Attachment file name</param>
        /// <param name="replyToEmailAddress">"Reply to" email</param>
        /// <param name="replyToName">"Reply to" name</param>
        /// <param name="fromEmail">Sender email. If specified, then it overrides passed "emailAccount" details</param>
        /// <param name="fromName">Sender name. If specified, then it overrides passed "emailAccount" details</param>
        /// <param name="subject">Subject. If specified, then it overrides subject of a message template</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<int> SendNotificationAsync(MessageTemplate messageTemplate,
            EmailAccount emailAccount, IList<Token> tokens,
            string toEmailAddress, string toName,
            string attachmentFilePath = null, string attachmentFileName = null,
            string replyToEmailAddress = null, string replyToName = null,
            string fromEmail = null, string fromName = null, string subject = null)
        {
            if (messageTemplate == null)
            {
                throw new ArgumentNullException(nameof(messageTemplate));
            }

            if (emailAccount == null)
            {
                throw new ArgumentNullException(nameof(emailAccount));
            }

            // retrieve localized message template data
            var bcc = messageTemplate.BccEmailAddresses; // await _localizationService.GetLocalizedAsync(messageTemplate, mt => mt.BccEmailAddresses, languageId);
            if (string.IsNullOrEmpty(subject))
                subject = messageTemplate.Subject; // await _localizationService.GetLocalizedAsync(messageTemplate, mt => mt.Subject, languageId);
            var body = messageTemplate.Body; // await _localizationService.GetLocalizedAsync(messageTemplate, mt => mt.Body, languageId);

            // Replace subject and body tokens 
            var subjectReplaced = _tokenizer.Replace(subject, tokens, false);
            var bodyReplaced = _tokenizer.Replace(body, tokens, true);

            // limit name length
            toName = CommonHelper.EnsureMaximumLength(toName, 300);

            var email = new QueuedEmail
            {
                Priority = QueuedEmailPriority.High,
                From = !string.IsNullOrEmpty(fromEmail) ? fromEmail : emailAccount.Email,
                FromName = !string.IsNullOrEmpty(fromName) ? fromName : emailAccount.DisplayName,
                To = toEmailAddress,
                ToName = toName,
                ReplyTo = replyToEmailAddress,
                ReplyToName = replyToName,
                CC = string.Empty,
                Bcc = bcc,
                Subject = subjectReplaced,
                Body = bodyReplaced,
                AttachmentFilePath = attachmentFilePath,
                AttachmentFileName = attachmentFileName,
                AttachedDownloadId = messageTemplate.AttachedDownloadId,
                CreatedOnUtc = DateTime.UtcNow,
                EmailAccountId = emailAccount.Id,
                DontSendBeforeDateUtc = !messageTemplate.DelayBeforeSend.HasValue ? null
                    : (DateTime?)(DateTime.UtcNow + TimeSpan.FromHours(messageTemplate.DelayPeriod.ToHours(messageTemplate.DelayBeforeSend.Value)))
            };

            await _queuedEmailService.InsertQueuedEmailAsync(email);
            return email.Id;
        }

        /// <summary>
        /// Sends a private message notification
        /// </summary>
        /// <param name="privateMessage">Private message</param>
        /// <param name="languageId">Message language identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the queued email identifier
        /// </returns>
        public virtual async Task<IList<int>> SendPrivateMessageNotificationAsync(PrivateMessage privateMessage, int languageId)
        {
            if (privateMessage == null)
                throw new ArgumentNullException(nameof(privateMessage));

            var store = await _storeService.GetStoreByIdAsync(privateMessage.StoreId) ?? await _storeContext.GetCurrentStoreAsync();

            var messageTemplates = await GetActiveMessageTemplatesAsync(MessageTemplateSystemNames.PrivateMessageNotification, store.Id);
            if (!messageTemplates.Any())
            {
                return new List<int>();
            }

            // tokens
            var commonTokens = new List<Token>();
            await _messageTokenProvider.AddPrivateMessageTokensAsync(commonTokens, privateMessage);
            await _messageTokenProvider.AddCustomerTokensAsync(commonTokens, privateMessage.ToCustomerId);

            return await messageTemplates.SelectAwait(async messageTemplate =>
            {
                //email account
                var emailAccount = await GetEmailAccountOfMessageTemplateAsync(messageTemplate);

                var tokens = new List<Token>(commonTokens);
                await _messageTokenProvider.AddStoreTokensAsync(tokens, store, emailAccount);

                //event notification
                await _eventPublisher.MessageTokensAddedAsync(messageTemplate, tokens);

                var customer = await _customerService.GetCustomerByIdAsync(privateMessage.ToCustomerId);
                var toEmail = customer.Email;
                var toName = customer.DisplayName; // await _customerService.GetCustomerFullNameAsync(customer);

                return await SendNotificationAsync(messageTemplate, emailAccount, tokens, toEmail, toName);
            }).ToListAsync();
        }

        #endregion

        #endregion
    }
}
