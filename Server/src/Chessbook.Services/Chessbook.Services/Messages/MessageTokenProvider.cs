using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;

using Chessbook.Core;
using Chessbook.Core.Domain;
using Chessbook.Core.Domain.Messages;
using Chessbook.Core.Domain.Stores;
using Chessbook.Core.Events;
using Chessbook.Core.Infrastructure;
using Chessbook.Services.Common;
using Chessbook.Services.Customers;
using Chessbook.Services.Directory;
using Chessbook.Services.Helpers;
using Chessbook.Services.Localization;
using Chessbook.Services.Stores;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models;
using Chessbook.Core.Domain.Chat;
using Chessbook.Services.Chat;
using Chessbook.Services.Entities;

namespace Chessbook.Services.Messages
{
    /// <summary>
    /// Message token provider
    /// </summary>
    public partial class MessageTokenProvider : IMessageTokenProvider
    {
        #region Fields

        private readonly IActionContextAccessor _actionContextAccessor;
        private readonly ICountryService _countryService;
        private readonly ICustomerAttributeFormatter _customerAttributeFormatter;
        private readonly IUserService _customerService;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly IEventPublisher _eventPublisher;
        private readonly IGenericAttributeService _genericAttributeService;
        private readonly ILanguageService _languageService;
        private readonly IPostsService postService;
        private readonly IStoreContext _storeContext;
        private readonly IStoreService _storeService;
        private readonly IUrlHelperFactory _urlHelperFactory;
        private readonly IWorkContext _workContext;
        private readonly MessageTemplatesSettings _templatesSettings;
        private readonly StoreInformationSettings _storeInformationSettings;
        private readonly IPostCommentService postCommentService;

        private Dictionary<string, IEnumerable<string>> _allowedTokens;

        #endregion

        #region Ctor

        public MessageTokenProvider(
            IActionContextAccessor actionContextAccessor,
            ICountryService countryService,
            ICustomerAttributeFormatter customerAttributeFormatter,
            IUserService customerService,
            IDateTimeHelper dateTimeHelper,
            IEventPublisher eventPublisher,
            IGenericAttributeService genericAttributeService,
            ILanguageService languageService,
            IStoreContext storeContext,
            IStoreService storeService,
            IUrlHelperFactory urlHelperFactory,
            IWorkContext workContext,
            MessageTemplatesSettings templatesSettings,
            StoreInformationSettings storeInformationSettings,
            IPostCommentService postCommentService,
            IPostsService postService)
        {
            _actionContextAccessor = actionContextAccessor;
            _countryService = countryService;
            _customerAttributeFormatter = customerAttributeFormatter;
            _customerService = customerService;
            _dateTimeHelper = dateTimeHelper;
            _eventPublisher = eventPublisher;
            _genericAttributeService = genericAttributeService;
            _languageService = languageService;
            _storeContext = storeContext;
            _storeService = storeService;
            _urlHelperFactory = urlHelperFactory;
            _workContext = workContext;
            _templatesSettings = templatesSettings;
            _storeInformationSettings = storeInformationSettings;
            this.postCommentService = postCommentService;
            this.postService = postService;
        }

        #endregion

        #region Allowed tokens

        /// <summary>
        /// Get all available tokens by token groups
        /// </summary>
        protected Dictionary<string, IEnumerable<string>> AllowedTokens
        {
            get
            {
                if (_allowedTokens != null)
                    return _allowedTokens;

                _allowedTokens = new Dictionary<string, IEnumerable<string>>();

                //store tokens
                _allowedTokens.Add(TokenGroupNames.StoreTokens, new[]
                {
                    "%Store.Name%",
                    "%Store.URL%",
                    "%Store.Email%",
                    "%Store.CompanyName%",
                    "%Store.CompanyAddress%",
                    "%Store.CompanyPhoneNumber%",
                    "%Store.CompanyVat%",
                    "%Facebook.URL%",
                    "%Twitter.URL%",
                    "%YouTube.URL%"
                });

                //customer tokens
                _allowedTokens.Add(TokenGroupNames.CustomerTokens, new[]
                {
                    "%Customer.Email%",
                    "%Customer.DisplayName%",
                    "%Customer.ScreenName%",
                    "%Customer.FirstName%",
                    "%Customer.LastName%",
                    "%Customer.VatNumber%",
                    "%Customer.VatNumberStatus%",
                    "%Customer.CustomAttributes%",
                    "%Customer.PasswordRecoveryURL%",
                    "%Customer.AccountActivationURL%",
                    "%Customer.EmailRevalidationURL%",
                    "%Wishlist.URLForCustomer%"
                });

                //order tokens
                _allowedTokens.Add(TokenGroupNames.OrderTokens, new[]
                {
                    "%Order.OrderNumber%",
                    "%Order.CustomerFullName%",
                    "%Order.CustomerEmail%",
                    "%Order.BillingFirstName%",
                    "%Order.BillingLastName%",
                    "%Order.BillingPhoneNumber%",
                    "%Order.BillingEmail%",
                    "%Order.BillingFaxNumber%",
                    "%Order.BillingCompany%",
                    "%Order.BillingAddress1%",
                    "%Order.BillingAddress2%",
                    "%Order.BillingCity%",
                    "%Order.BillingCounty%",
                    "%Order.BillingStateProvince%",
                    "%Order.BillingZipPostalCode%",
                    "%Order.BillingCountry%",
                    "%Order.BillingCustomAttributes%",
                    "%Order.Shippable%",
                    "%Order.ShippingMethod%",
                    "%Order.ShippingFirstName%",
                    "%Order.ShippingLastName%",
                    "%Order.ShippingPhoneNumber%",
                    "%Order.ShippingEmail%",
                    "%Order.ShippingFaxNumber%",
                    "%Order.ShippingCompany%",
                    "%Order.ShippingAddress1%",
                    "%Order.ShippingAddress2%",
                    "%Order.ShippingCity%",
                    "%Order.ShippingCounty%",
                    "%Order.ShippingStateProvince%",
                    "%Order.ShippingZipPostalCode%",
                    "%Order.ShippingCountry%",
                    "%Order.ShippingCustomAttributes%",
                    "%Order.PaymentMethod%",
                    "%Order.VatNumber%",
                    "%Order.CustomValues%",
                    "%Order.Product(s)%",
                    "%Order.CreatedOn%",
                    "%Order.OrderURLForCustomer%",
                    "%Order.PickupInStore%",
                    "%Order.OrderId%"
                });

                //shipment tokens
                _allowedTokens.Add(TokenGroupNames.ShipmentTokens, new[]
                {
                    "%Shipment.ShipmentNumber%",
                    "%Shipment.TrackingNumber%",
                    "%Shipment.TrackingNumberURL%",
                    "%Shipment.Product(s)%",
                    "%Shipment.URLForCustomer%"
                });

                //refunded order tokens
                _allowedTokens.Add(TokenGroupNames.RefundedOrderTokens, new[]
                {
                    "%Order.AmountRefunded%"
                });

                //order note tokens
                _allowedTokens.Add(TokenGroupNames.OrderNoteTokens, new[]
                {
                    "%Order.NewNoteText%",
                    "%Order.OrderNoteAttachmentUrl%"
                });

                //recurring payment tokens
                _allowedTokens.Add(TokenGroupNames.RecurringPaymentTokens, new[]
                {
                    "%RecurringPayment.ID%",
                    "%RecurringPayment.CancelAfterFailedPayment%",
                    "%RecurringPayment.RecurringPaymentType%"
                });

                //newsletter subscription tokens
                _allowedTokens.Add(TokenGroupNames.SubscriptionTokens, new[]
                {
                    "%NewsLetterSubscription.Email%",
                    "%NewsLetterSubscription.ActivationUrl%",
                    "%NewsLetterSubscription.DeactivationUrl%"
                });

                //product tokens
                _allowedTokens.Add(TokenGroupNames.ProductTokens, new[]
                {
                    "%Product.ID%",
                    "%Product.Name%",
                    "%Product.ShortDescription%",
                    "%Product.ProductURLForCustomer%",
                    "%Product.SKU%",
                    "%Product.StockQuantity%"
                });

                //return request tokens
                _allowedTokens.Add(TokenGroupNames.ReturnRequestTokens, new[]
                {
                    "%ReturnRequest.CustomNumber%",
                    "%ReturnRequest.OrderId%",
                    "%ReturnRequest.Product.Quantity%",
                    "%ReturnRequest.Product.Name%",
                    "%ReturnRequest.Reason%",
                    "%ReturnRequest.RequestedAction%",
                    "%ReturnRequest.CustomerComment%",
                    "%ReturnRequest.StaffNotes%",
                    "%ReturnRequest.Status%"
                });

                //forum tokens
                _allowedTokens.Add(TokenGroupNames.ForumTokens, new[]
                {
                    "%Forums.ForumURL%",
                    "%Forums.ForumName%"
                });

                //forum topic tokens
                _allowedTokens.Add(TokenGroupNames.ForumTopicTokens, new[]
                {
                    "%Forums.TopicURL%",
                    "%Forums.TopicName%"
                });

                //forum post tokens
                _allowedTokens.Add(TokenGroupNames.ForumPostTokens, new[]
                {
                    "%Forums.PostAuthor%",
                    "%Forums.PostBody%"
                });

                //private message tokens
                _allowedTokens.Add(TokenGroupNames.PrivateMessageTokens, new[]
                {
                    "%PrivateMessage.Subject%",
                    "%PrivateMessage.Text%"
                });

                //vendor tokens
                _allowedTokens.Add(TokenGroupNames.VendorTokens, new[]
                {
                    "%Vendor.Name%",
                    "%Vendor.Email%",
                    "%Vendor.VendorAttributes%"
                });

                //gift card tokens
                _allowedTokens.Add(TokenGroupNames.GiftCardTokens, new[]
                {
                    "%GiftCard.SenderName%",
                    "%GiftCard.SenderEmail%",
                    "%GiftCard.RecipientName%",
                    "%GiftCard.RecipientEmail%",
                    "%GiftCard.Amount%",
                    "%GiftCard.CouponCode%",
                    "%GiftCard.Message%"
                });

                //product review tokens
                _allowedTokens.Add(TokenGroupNames.ProductReviewTokens, new[]
                {
                    "%ProductReview.ProductName%",
                    "%ProductReview.Title%",
                    "%ProductReview.IsApproved%",
                    "%ProductReview.ReviewText%",
                    "%ProductReview.ReplyText%"
                });

                //attribute combination tokens
                _allowedTokens.Add(TokenGroupNames.AttributeCombinationTokens, new[]
                {
                    "%AttributeCombination.Formatted%",
                    "%AttributeCombination.SKU%",
                    "%AttributeCombination.StockQuantity%"
                });

                //blog comment tokens
                _allowedTokens.Add(TokenGroupNames.BlogCommentTokens, new[]
                {
                    "%PostComment.Text%",
                    "%Customer.ScreenName%",
                    "%PostComment.PostId%",
                    "%PostComment.OriginCommentId%"
                });

                //news comment tokens
                _allowedTokens.Add(TokenGroupNames.NewsCommentTokens, new[]
                {
                    "%NewsComment.NewsTitle%"
                });

                //product back in stock tokens
                _allowedTokens.Add(TokenGroupNames.ProductBackInStockTokens, new[]
                {
                    "%BackInStockSubscription.ProductName%",
                    "%BackInStockSubscription.ProductUrl%"
                });

                //email a friend tokens
                _allowedTokens.Add(TokenGroupNames.EmailAFriendTokens, new[]
                {
                    "%EmailAFriend.PersonalMessage%",
                    "%EmailAFriend.Email%"
                });

                //wishlist to friend tokens
                _allowedTokens.Add(TokenGroupNames.WishlistToFriendTokens, new[]
                {
                    "%Wishlist.PersonalMessage%",
                    "%Wishlist.Email%"
                });

                //VAT validation tokens
                _allowedTokens.Add(TokenGroupNames.VatValidation, new[]
                {
                    "%VatValidationResult.Name%",
                    "%VatValidationResult.Address%"
                });

                //contact us tokens
                _allowedTokens.Add(TokenGroupNames.ContactUs, new[]
                {
                    "%ContactUs.SenderEmail%",
                    "%ContactUs.SenderName%",
                    "%ContactUs.Body%"
                });

                //contact vendor tokens
                _allowedTokens.Add(TokenGroupNames.ContactVendor, new[]
                {
                    "%ContactUs.SenderEmail%",
                    "%ContactUs.SenderName%",
                    "%ContactUs.Body%"
                });

                return _allowedTokens;
            }
        }

        #endregion

        #region Utilities

        /// <summary>
        /// Generates an absolute URL for the specified store, routeName and route values
        /// </summary>
        /// <param name="storeId">Store identifier; Pass 0 to load URL of the current store</param>
        /// <param name="routeName">The name of the route that is used to generate URL</param>
        /// <param name="routeValues">An object that contains route values</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the generated URL
        /// </returns>
        protected virtual async Task<string> RouteUrlAsync(int storeId = 0, string routeName = null, dynamic routeValues = null, string email = null)
        {
            // try to get a store by the passed identifier
            var store = await _storeService.GetStoreByIdAsync(storeId) ?? await _storeContext.GetCurrentStoreAsync()
                ?? throw new Exception("No store could be loaded");

            // ensure that the store URL is specified
            if (string.IsNullOrEmpty(store.Url))
            {
                throw new Exception("URL cannot be null");
            }

            // compose the result
            return Uri.EscapeUriString(WebUtility.UrlDecode($"{store.Url}api/users/activation?token={routeValues?.token}&guid={routeValues?.guid}&email={email}"));
        }

        #endregion

        #region Methods

        /// <summary>
        /// Add store tokens
        /// </summary>
        /// <param name="tokens">List of already added tokens</param>
        /// <param name="store">Store</param>
        /// <param name="emailAccount">Email account</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task AddStoreTokensAsync(IList<Token> tokens, Store store, EmailAccount emailAccount)
        {
            if (emailAccount == null)
            {
                throw new ArgumentNullException(nameof(emailAccount));
            }

            tokens.Add(new Token("Store.Name", store.Name));
            tokens.Add(new Token("Store.URL", store.Url, true));
            tokens.Add(new Token("Store.Email", emailAccount.Email));
            tokens.Add(new Token("Store.CompanyName", store.CompanyName));
            tokens.Add(new Token("Store.CompanyPhoneNumber", store.CompanyPhoneNumber));

            tokens.Add(new Token("Facebook.URL", _storeInformationSettings.FacebookLink));
            tokens.Add(new Token("Twitter.URL", _storeInformationSettings.TwitterLink));
            tokens.Add(new Token("YouTube.URL", _storeInformationSettings.YoutubeLink));

            // event notification
            await _eventPublisher.EntityTokensAddedAsync(store, tokens);
        }

        /// <summary>
        /// Add customer tokens
        /// </summary>
        /// <param name="tokens">List of already added tokens</param>
        /// <param name="customerId">Customer identifier</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task AddCustomerTokensAsync(IList<Token> tokens, int customerId)
        {
            if (customerId <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(customerId));
            }

            var customer = await _customerService.GetCustomerByIdAsync(customerId);

            await AddCustomerTokensAsync(tokens, customer);
        }

        /// <summary>
        /// Add customer tokens
        /// </summary>
        /// <param name="tokens">List of already added tokens</param>
        /// <param name="customer">Customer</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public async Task AddCustomerTokensAsync(IList<Token> tokens, Customer customer)
        {
            tokens.Add(new Token("Customer.Email", customer.Email));
            tokens.Add(new Token("Customer.DisplayName", customer.DisplayName));
            tokens.Add(new Token("Customer.ScreenName", customer.ScreenName));

            var customAttributesXml = await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.CustomCustomerAttributes);
            tokens.Add(new Token("Customer.CustomAttributes", await _customerAttributeFormatter.FormatAttributesAsync(customAttributesXml), true));

            // note: we do not use SEO friendly URLS for these links because we can get errors caused by having .(dot) in the URL (from the email address)
            var passwordRecoveryUrl  = await RouteUrlAsync(routeName: "PasswordRecoveryConfirm", routeValues: new { token = await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.PasswordRecoveryTokenAttribute), guid = customer.CustomerGuid, }, email: customer.Email);
            var accountActivationUrl  = await RouteUrlAsync(routeName: "AccountActivation", routeValues: new { token = await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.AccountActivationTokenAttribute), guid = customer.CustomerGuid }, email: customer.Email);
            var emailRevalidationUrl  = await RouteUrlAsync(routeName: "EmailRevalidation", routeValues: new { token = await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.EmailRevalidationTokenAttribute), guid = customer.CustomerGuid }, email: customer.Email);
            tokens.Add(new Token("Customer.PasswordRecoveryURL", passwordRecoveryUrl, true));
            tokens.Add(new Token("Customer.AccountActivationURL", accountActivationUrl, true));
            tokens.Add(new Token("Customer.EmailRevalidationURL", emailRevalidationUrl, true));

            // event notification
            await _eventPublisher.EntityTokensAddedAsync(customer, tokens);
        }

        /// <summary>
        /// Add post comment tokens
        /// </summary>
        /// <param name="tokens">List of already added tokens</param>
        /// <param name="postComment">Post comment</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task AddBlogCommentTokensAsync(IList<Token> tokens, PostComment postComment)
        {
            tokens.Add(new Token("PostComment.Text", postComment.Text));

            var post = await this.postService.GetPostByIdAsync(postComment.PostId);
            if (post != null)
            {
                var postAuthor = await this._customerService.GetCustomerByIdAsync(post.UserId);
                if (postAuthor != null)
                {
                    tokens.Add(new Token("Customer.ScreenName", postAuthor.ScreenName.Substring(1)));
                    tokens.Add(new Token("PostComment.PostId", postComment.PostId));
                    tokens.Add(new Token("PostComment.OriginCommentId", postComment.OriginCommentId ?? postComment.Id));
                }
            }

            // event notification
            await _eventPublisher.EntityTokensAddedAsync(postComment, tokens);
        }

        /// <summary>
        /// Add private message tokens
        /// </summary>
        /// <param name="tokens">List of already added tokens</param>
        /// <param name="privateMessage">Private message</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task AddPrivateMessageTokensAsync(IList<Token> tokens, PrivateMessage privateMessage)
        {
            // attributes
            // we cannot inject IForumService into constructor because it'll cause circular references.
            // that's why we resolve it here this way
            var forumService = EngineContext.Current.Resolve<IChatService>();

            tokens.Add(new Token("PrivateMessage.Subject", privateMessage.Subject));
            tokens.Add(new Token("PrivateMessage.Text", forumService.FormatPrivateMessageText(privateMessage), true));

            // event notification
            await _eventPublisher.EntityTokensAddedAsync(privateMessage, tokens);
        }

        /// <summary>
        /// Get collection of allowed (supported) message tokens for campaigns
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the collection of allowed (supported) message tokens for campaigns
        /// </returns>
        public virtual async Task<IEnumerable<string>> GetListOfCampaignAllowedTokensAsync()
        {
            var additionalTokens = new CampaignAdditionalTokensAddedEvent();
            await _eventPublisher.PublishAsync(additionalTokens);

            var allowedTokens = (await GetListOfAllowedTokensAsync(new[] { TokenGroupNames.StoreTokens, TokenGroupNames.SubscriptionTokens })).ToList();
            allowedTokens.AddRange(additionalTokens.AdditionalTokens);

            return allowedTokens.Distinct();
        }

        /// <summary>
        /// Get collection of allowed (supported) message tokens
        /// </summary>
        /// <param name="tokenGroups">Collection of token groups; pass null to get all available tokens</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the collection of allowed message tokens
        /// </returns>
        public virtual async Task<IEnumerable<string>> GetListOfAllowedTokensAsync(IEnumerable<string> tokenGroups = null)
        {
            var additionalTokens = new AdditionalTokensAddedEvent();
            await _eventPublisher.PublishAsync(additionalTokens);

            var allowedTokens = AllowedTokens.Where(x => tokenGroups == null || tokenGroups.Contains(x.Key))
                .SelectMany(x => x.Value).ToList();

            allowedTokens.AddRange(additionalTokens.AdditionalTokens);

            return allowedTokens.Distinct();
        }

        /// <summary>
        /// Get token groups of message template
        /// </summary>
        /// <param name="messageTemplate">Message template</param>
        /// <returns>Collection of token group names</returns>
        public virtual IEnumerable<string> GetTokenGroups(MessageTemplate messageTemplate)
        {
            // groups depend on which tokens are added at the appropriate methods in IWorkflowMessageService
            return messageTemplate.Name switch
            {
                MessageTemplateSystemNames.CustomerRegisteredNotification or 
                MessageTemplateSystemNames.CustomerWelcomeMessage or 
                MessageTemplateSystemNames.CustomerEmailValidationMessage or 
                MessageTemplateSystemNames.CustomerEmailRevalidationMessage or 
                MessageTemplateSystemNames.CustomerPasswordRecoveryMessage => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.CustomerTokens },

                MessageTemplateSystemNames.OrderPlacedVendorNotification or 
                MessageTemplateSystemNames.OrderPlacedStoreOwnerNotification or 
                MessageTemplateSystemNames.OrderPlacedAffiliateNotification or 
                MessageTemplateSystemNames.OrderPaidStoreOwnerNotification or 
                MessageTemplateSystemNames.OrderPaidCustomerNotification or 
                MessageTemplateSystemNames.OrderPaidVendorNotification or 
                MessageTemplateSystemNames.OrderPaidAffiliateNotification or 
                MessageTemplateSystemNames.OrderPlacedCustomerNotification or 
                MessageTemplateSystemNames.OrderCompletedCustomerNotification or 
                MessageTemplateSystemNames.OrderCancelledCustomerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.OrderTokens, TokenGroupNames.CustomerTokens },

                MessageTemplateSystemNames.ShipmentSentCustomerNotification or 
                MessageTemplateSystemNames.ShipmentDeliveredCustomerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.ShipmentTokens, TokenGroupNames.OrderTokens, TokenGroupNames.CustomerTokens },

                MessageTemplateSystemNames.OrderRefundedStoreOwnerNotification or 
                MessageTemplateSystemNames.OrderRefundedCustomerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.OrderTokens, TokenGroupNames.RefundedOrderTokens, TokenGroupNames.CustomerTokens },

                MessageTemplateSystemNames.NewOrderNoteAddedCustomerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.OrderNoteTokens, TokenGroupNames.OrderTokens, TokenGroupNames.CustomerTokens },

                MessageTemplateSystemNames.RecurringPaymentCancelledStoreOwnerNotification or 
                MessageTemplateSystemNames.RecurringPaymentCancelledCustomerNotification or 
                MessageTemplateSystemNames.RecurringPaymentFailedCustomerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.OrderTokens, TokenGroupNames.CustomerTokens, TokenGroupNames.RecurringPaymentTokens },

                MessageTemplateSystemNames.NewsletterSubscriptionActivationMessage or 
                MessageTemplateSystemNames.NewsletterSubscriptionDeactivationMessage => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.SubscriptionTokens },

                MessageTemplateSystemNames.EmailAFriendMessage => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.CustomerTokens, TokenGroupNames.ProductTokens, TokenGroupNames.EmailAFriendTokens },
                MessageTemplateSystemNames.WishlistToFriendMessage => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.CustomerTokens, TokenGroupNames.WishlistToFriendTokens },

                MessageTemplateSystemNames.NewReturnRequestStoreOwnerNotification or 
                MessageTemplateSystemNames.NewReturnRequestCustomerNotification or 
                MessageTemplateSystemNames.ReturnRequestStatusChangedCustomerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.OrderTokens, TokenGroupNames.CustomerTokens, TokenGroupNames.ReturnRequestTokens },

                MessageTemplateSystemNames.NewForumTopicMessage => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.ForumTopicTokens, TokenGroupNames.ForumTokens, TokenGroupNames.CustomerTokens },
                MessageTemplateSystemNames.NewForumPostMessage => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.ForumPostTokens, TokenGroupNames.ForumTopicTokens, TokenGroupNames.ForumTokens, TokenGroupNames.CustomerTokens },
                MessageTemplateSystemNames.PrivateMessageNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.PrivateMessageTokens, TokenGroupNames.CustomerTokens },
                MessageTemplateSystemNames.NewVendorAccountApplyStoreOwnerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.CustomerTokens, TokenGroupNames.VendorTokens },
                MessageTemplateSystemNames.VendorInformationChangeNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.VendorTokens },
                MessageTemplateSystemNames.GiftCardNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.GiftCardTokens },

                MessageTemplateSystemNames.ProductReviewStoreOwnerNotification or 
                MessageTemplateSystemNames.ProductReviewReplyCustomerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.ProductReviewTokens, TokenGroupNames.CustomerTokens },

                MessageTemplateSystemNames.QuantityBelowStoreOwnerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.ProductTokens },
                MessageTemplateSystemNames.QuantityBelowAttributeCombinationStoreOwnerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.ProductTokens, TokenGroupNames.AttributeCombinationTokens },
                MessageTemplateSystemNames.NewVatSubmittedStoreOwnerNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.CustomerTokens, TokenGroupNames.VatValidation },
                MessageTemplateSystemNames.BlogCommentNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.BlogCommentTokens, TokenGroupNames.CustomerTokens },
                MessageTemplateSystemNames.NewsCommentNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.NewsCommentTokens, TokenGroupNames.CustomerTokens },
                MessageTemplateSystemNames.BackInStockNotification => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.CustomerTokens, TokenGroupNames.ProductBackInStockTokens },
                MessageTemplateSystemNames.ContactUsMessage => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.ContactUs },
                MessageTemplateSystemNames.ContactVendorMessage => new[] { TokenGroupNames.StoreTokens, TokenGroupNames.ContactVendor },
                _ => Array.Empty<string>(),
            };
        }

        #endregion
    }
}
