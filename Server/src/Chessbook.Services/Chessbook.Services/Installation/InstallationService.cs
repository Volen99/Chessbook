using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Domain.Notifications;
using Chessbook.Data;
using Chessbook.Data.Models;
using Chessbook.Data.Models.Polls;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Nop.Core;
using Nop.Core.Domain;
using Nop.Core.Domain.Common;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Directory;
using Nop.Core.Domain.Logging;
using Nop.Core.Domain.Media;
using Chessbook.Core.Domain.Messages;
using Nop.Core.Domain.Security;
using Nop.Core.Domain.Stores;
using Nop.Core.Domain.Tasks;

using Nop.Core.Http;
using Nop.Core.Infrastructure;
using Nop.Data;
using Nop.Services.Common;
using Nop.Services.Configuration;
using Nop.Services.Customers;
using Nop.Services.ExportImport;
using Nop.Services.Helpers;
using Nop.Services.Media;

namespace Nop.Services.Installation
{
    /// <summary>
    /// Installation service
    /// </summary>
    public partial class InstallationService : IInstallationService
    {
        #region Fields

        private readonly INopDataProvider _dataProvider;
        private readonly INopFileProvider _fileProvider;
        private readonly IRepository<ActivityLogType> _activityLogTypeRepository;
        private readonly IRepository<Customer> _customerRepository;
        private readonly IRepository<CustomerRole> _customerRoleRepository;
        private readonly IRepository<Store> _storeRepository;
        private readonly IWebHelper _webHelper;
        private readonly IRepository<Country> _countryRepository;
        protected readonly UserManager<Customer> userManager;

        #endregion

        #region Ctor

        public InstallationService(INopDataProvider dataProvider,
            INopFileProvider fileProvider,
            IRepository<ActivityLogType> activityLogTypeRepository,
            IRepository<Customer> customerRepository,
            IRepository<CustomerRole> customerRoleRepository,
            IRepository<Store> storeRepository,
            IWebHelper webHelper,
            IRepository<Country> countryRepository,
            UserManager<Customer> userManager)
        {
            _dataProvider = dataProvider;
            _fileProvider = fileProvider;
            _activityLogTypeRepository = activityLogTypeRepository;
            _customerRepository = customerRepository;
            _customerRoleRepository = customerRoleRepository;
            _storeRepository = storeRepository;
            _webHelper = webHelper;
            _countryRepository = countryRepository;
            this.userManager = userManager;
        }

        #endregion

        #region Utilities

        protected virtual async Task<T> InsertInstallationDataAsync<T>(T entity) where T : BaseEntity
        {
            return await _dataProvider.InsertEntityAsync(entity);
        }

        protected virtual async Task InsertInstallationDataAsync<T>(params T[] entities) where T : BaseEntity
        {
            await _dataProvider.BulkInsertEntitiesAsync(entities);
        }

        protected virtual async Task InsertInstallationDataAsync<T>(IList<T> entities) where T : BaseEntity
        {
            if (!entities.Any())
            {
                return;
            }

            await InsertInstallationDataAsync(entities.ToArray());
        }

        protected virtual async Task UpdateInstallationDataAsync<T>(T entity) where T : BaseEntity
        {
            await _dataProvider.UpdateEntityAsync(entity);
        }

        protected virtual async Task UpdateInstallationDataAsync<T>(IList<T> entities) where T : BaseEntity
        {
            if (!entities.Any())
            {
                return;
            }

            foreach (var entity in entities)
            {
                await _dataProvider.UpdateEntityAsync(entity);
            }
        }

        /// <returns>A task that represents the asynchronous operation</returns>
        protected virtual async Task InstallStoresAsync()
        {
            var storeUrl = "https://localhost:5001/";               // _webHelper.GetStoreLocation();
            var stores = new List<Store>
            {
                new Store
                {
                    Name = "Chessbook",
                    Url = storeUrl,
                    SslEnabled = true,            // _webHelper.IsCurrentConnectionSecured(),
                    Hosts = "chessbok.com,www.chessbook.com",
                    DisplayOrder = 1,
                    //should we set some default company info?
                    CompanyName = "Chessbook",
                    CompanyAddress = "your company country, state, zip, street, etc",
                    CompanyPhoneNumber = "(123) 456-78901",
                    CompanyVat = null
                }
            };

            await InsertInstallationDataAsync(stores);
        }

        protected virtual async Task InstallScheduleTasksAsync()
        {
            var tasks = new List<ScheduleTask>
            {
                new ScheduleTask
                {
                    Name = "Send emails",
                    Seconds = 60,
                    Type = "Nop.Services.Messages.QueuedMessagesSendTask, Nop.Services",
                    Enabled = true,
                    StopOnError = false
                },
                new ScheduleTask
                {
                    Name = "Keep alive",
                    Seconds = 300,
                    Type = "Nop.Services.Common.KeepAliveTask, Nop.Services",
                    Enabled = true,
                    StopOnError = false
                },
                new ScheduleTask
                {
                    Name = "Delete guests",
                    Seconds = 600,
                    Type = "Nop.Services.Customers.DeleteGuestsTask, Nop.Services",
                    Enabled = true,
                    StopOnError = false
                },
                new ScheduleTask
                {
                    Name = "Clear cache",
                    Seconds = 600,
                    Type = "Nop.Services.Caching.ClearCacheTask, Nop.Services",
                    Enabled = false,
                    StopOnError = false
                },
                new ScheduleTask
                {
                    Name = "Clear log",
                    //60 minutes
                    Seconds = 3600,
                    Type = "Nop.Services.Logging.ClearLogTask, Nop.Services",
                    Enabled = false,
                    StopOnError = false
                },
                new ScheduleTask
                {
                    Name = "Update currency exchange rates",
                    //60 minutes
                    Seconds = 3600,
                    Type = "Nop.Services.Directory.UpdateExchangeRateTask, Nop.Services",
                    Enabled = true,
                    StopOnError = false
                }
            };

            await InsertInstallationDataAsync(tasks);
        }

        protected virtual async Task InstallSampleCustomersAsync()
        {
            var crRegistered = await _customerRoleRepository.Table
                .FirstOrDefaultAsyncExt(customerRole => customerRole.SystemName == NopCustomerDefaults.RegisteredRoleName);

            if (crRegistered == null)
            {
                throw new ArgumentNullException(nameof(crRegistered));
            }

            // default store 
            var defaultStore = await _storeRepository.Table.FirstOrDefaultAsyncExt();

            if (defaultStore == null)
            {
                throw new Exception("No default store could be loaded");
            }

            var storeId = defaultStore.Id;

            // second user
            var secondUserEmail = "volen1999@gmail.com";
            var secondUser = new Customer
            {
                DisplayName = "Volencho",
                ScreenName = "@volencho",
                Password = "111111",
                Email = secondUserEmail,
                Location = "Bulgaria",
                Active = true,
                CreatedOn = DateTime.UtcNow,
                LastActivityDateUtc = DateTime.UtcNow,
                LastIpAddress = "127.0.0.1",
            };

            await InsertInstallationDataAsync(secondUser);

            await InsertInstallationDataAsync(new CustomerCustomerRoleMapping { CustomerId = secondUser.Id, CustomerRoleId = crRegistered.Id });
        }

        protected virtual async Task InstallCountriesAndStatesAsync()
        {
            var countries = ISO3166.GetCollection().Select(country => new Country
            {
                Name = country.Name,
                AllowsBilling = true,
                AllowsShipping = true,
                TwoLetterIsoCode = country.Alpha2,
                ThreeLetterIsoCode = country.Alpha3,
                NumericIsoCode = country.NumericCode,
                SubjectToVat = country.SubjectToVat,
                DisplayOrder = country.NumericCode == 840 ? 1 : 100,
                Published = true
            }).ToList();

            await InsertInstallationDataAsync(countries.ToArray());

            // Import states for all countries
            var directoryPath = _fileProvider.MapPath(NopInstallationDefaults.LocalizationResourcesPath);
            var pattern = "*.txt";

            //we use different scope to prevent creating wrong settings in DI, because the settings data not exists yet
            var serviceScopeFactory = EngineContext.Current.Resolve<IServiceScopeFactory>();
            using var scope = serviceScopeFactory.CreateScope();
            var importManager = EngineContext.Current.Resolve<IImportManager>(scope);
            foreach (var filePath in _fileProvider.EnumerateFiles(directoryPath, pattern))
            {
                await using var stream = new FileStream(filePath, FileMode.Open);
                await importManager.ImportStatesFromTxtAsync(stream, false);
            }
        }

        protected virtual async Task InstallSettingsAsync(RegionInfo regionInfo)
        {
            var isMetric = regionInfo?.IsMetric ?? false;
            var country = regionInfo?.TwoLetterISORegionName ?? string.Empty;
            var isGermany = country == "DE";
            var isEurope = ISO3166.FromCountryCode(country)?.SubjectToVat ?? false;

            var settingService = EngineContext.Current.Resolve<ISettingService>();

            await settingService.SaveSettingAsync(new CommonSettings
            {
                UseSystemEmailForContactUsForm = true,

                DisplayJavaScriptDisabledWarning = false,
                Log404Errors = true,
                BreadcrumbDelimiter = "/",
                BbcodeEditorOpenLinksInNewWindow = false,
                PopupForTermsOfServiceLinks = true,
                JqueryMigrateScriptLoggingActive = false,
                UseResponseCompression = true,
                FaviconAndAppIconsHeadCode = "<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/icons/icons_0/apple-touch-icon.png\"><link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/icons/icons_0/favicon-32x32.png\"><link rel=\"icon\" type=\"image/png\" sizes=\"192x192\" href=\"/icons/icons_0/android-chrome-192x192.png\"><link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/icons/icons_0/favicon-16x16.png\"><link rel=\"manifest\" href=\"/icons/icons_0/site.webmanifest\"><link rel=\"mask-icon\" href=\"/icons/icons_0/safari-pinned-tab.svg\" color=\"#5bbad5\"><link rel=\"shortcut icon\" href=\"/icons/icons_0/favicon.ico\"><meta name=\"msapplication-TileColor\" content=\"#2d89ef\"><meta name=\"msapplication-TileImage\" content=\"/icons/icons_0/mstile-144x144.png\"><meta name=\"msapplication-config\" content=\"/icons/icons_0/browserconfig.xml\"><meta name=\"theme-color\" content=\"#ffffff\">",
                EnableHtmlMinification = true,
                // we disable bundling out of the box because it requires a lot of server resources
                EnableJsBundling = false,
                EnableCssBundling = false,
                RestartTimeout = NopCommonDefaults.RestartTimeout
            });

            await settingService.SaveSettingAsync(new AdminAreaSettings
            {
                DefaultGridPageSize = 15,
                PopupGridPageSize = 7,
                GridPageSizes = "7, 15, 20, 50, 100",
                RichEditorAdditionalSettings = null,
                RichEditorAllowJavaScript = false,
                RichEditorAllowStyleTag = false,
                UseRichEditorForCustomerEmails = false,
                UseRichEditorInMessageTemplates = false,
                CheckCopyrightRemovalKey = true,
                UseIsoDateFormatInJsonResult = true,
                ShowDocumentationReferenceLinks = true
            });

            await settingService.SaveSettingAsync(new CustomerSettings
            {
                UsernamesEnabled = false,
                CheckUsernameAvailabilityEnabled = false,
                AllowUsersToChangeUsernames = false,
                DefaultPasswordFormat = PasswordFormat.Hashed,
                HashedPasswordFormat = NopCustomerServicesDefaults.DefaultHashedPasswordFormat,
                PasswordMinLength = 6,
                PasswordRequireDigit = false,
                PasswordRequireLowercase = false,
                PasswordRequireNonAlphanumeric = false,
                PasswordRequireUppercase = false,
                UnduplicatedPasswordsNumber = 4,
                PasswordRecoveryLinkDaysValid = 7,
                PasswordLifetime = 90,
                FailedPasswordAllowedAttempts = 0,
                FailedPasswordLockoutMinutes = 30,
                AllowCustomersToUploadAvatars = true,
                AvatarMaximumSizeBytes = 20000,
                DefaultAvatarEnabled = true,
                ShowCustomersLocation = true,
                ShowCustomersJoinDate = true,
                AllowViewingProfiles = false,
                NotifyNewCustomerRegistration = false,
                HideDownloadableProductsTab = false,
                HideBackInStockSubscriptionsTab = false,
                DownloadableProductsValidateUser = false,
                FirstNameEnabled = true,
                FirstNameRequired = true,
                LastNameEnabled = true,
                LastNameRequired = true,
                GenderEnabled = true,
                DateOfBirthEnabled = true,
                DateOfBirthRequired = false,
                DateOfBirthMinimumAge = null,
                CompanyEnabled = true,
                CityEnabled = false,
                CountyEnabled = true,
                CountyRequired = false,
                CountryEnabled = false,
                CountryRequired = false,
                StateProvinceEnabled = false,
                StateProvinceRequired = false,
                PhoneEnabled = false,
                FaxEnabled = false,
                AcceptPrivacyPolicyEnabled = false,
                NewsletterEnabled = true,
                NewsletterTickedByDefault = true,
                HideNewsletterBlock = false,
                NewsletterBlockAllowToUnsubscribe = false,
                OnlineCustomerMinutes = 20,
                StoreLastVisitedPage = false,
                StoreIpAddresses = true,
                LastActivityMinutes = 15,
                SuffixDeletedCustomers = false,
                EnteringEmailTwice = false,
                RequireRegistrationForDownloadableProducts = false,
                AllowCustomersToCheckGiftCardBalance = false,
                DeleteGuestTaskOlderThanMinutes = 1440,
            });

            await settingService.SaveSettingAsync(new MediaSettings
            {
                AvatarPictureSize = 400,
                ProductThumbPictureSize = 415,
                ProductDetailsPictureSize = 550,
                ProductThumbPictureSizeOnProductDetailsPage = 100,
                AssociatedProductPictureSize = 220,
                CategoryThumbPictureSize = 450,
                ManufacturerThumbPictureSize = 420,
                VendorThumbPictureSize = 450,
                CartThumbPictureSize = 80,
                MiniCartThumbPictureSize = 70,
                AutoCompleteSearchThumbPictureSize = 20,
                ImageSquarePictureSize = 32,
                MaximumImageSize = 1980,
                DefaultPictureZoomEnabled = false,
                DefaultImageQuality = 80,
                MultipleThumbDirectories = true,
                ImportProductImagesUsingHash = true,
                AzureCacheControlHeader = string.Empty,
                UseAbsoluteImagePath = true
            });

            await settingService.SaveSettingAsync(new StoreInformationSettings
            {
                StoreClosed = false,
                DefaultStoreTheme = "Dark",
                AllowCustomerToSelectTheme = false,
                DisplayEuCookieLawWarning = isEurope,
                FacebookLink = "https://www.facebook.com/people/NM-Volencho/100010730917900/",
                TwitterLink = "https://twitter.com/volencho",
                YoutubeLink = "https://www.youtube.com/channel/UC7E9Mb8QqiLwTI7w0NJPTiw",
                HidePoweredByNopCommerce = true,
            });

            await settingService.SaveSettingAsync(new SecuritySettings
            {
                EncryptionKey = CommonHelper.GenerateRandomDigitCode(16),
                AdminAreaAllowedIpAddresses = null,
                HoneypotEnabled = false,
                HoneypotInputName = "hpinput",
                AllowNonAsciiCharactersInHeaders = true
            });

            await settingService.SaveSettingAsync(new DateTimeSettings
            {
                DefaultStoreTimeZoneId = string.Empty,
                AllowCustomersToSetTimeZone = false
            });

            await settingService.SaveSettingAsync(new CaptchaSettings
            {
                ReCaptchaApiUrl = "https://www.google.com/recaptcha/",
                ReCaptchaDefaultLanguage = string.Empty,
                ReCaptchaPrivateKey = string.Empty,
                ReCaptchaPublicKey = string.Empty,
                ReCaptchaRequestTimeout = 20,
                ReCaptchaTheme = string.Empty,
                AutomaticallyChooseLanguage = true,
                Enabled = false,
                CaptchaType = CaptchaType.CheckBoxReCaptchaV2,
                ReCaptchaV3ScoreThreshold = 0.5M,
                ShowOnApplyVendorPage = false,
                ShowOnBlogCommentPage = false,
                ShowOnContactUsPage = false,
                ShowOnEmailProductToFriendPage = false,
                ShowOnEmailWishlistToFriendPage = false,
                ShowOnForgotPasswordPage = false,
                ShowOnForum = false,
                ShowOnLoginPage = false,
                ShowOnNewsCommentPage = false,
                ShowOnProductReviewPage = false,
                ShowOnRegistrationPage = false,
            });

            await settingService.SaveSettingAsync(new MessagesSettings
            {
                UsePopupNotifications = false
            });

            await settingService.SaveSettingAsync(new ProxySettings
            {
                Enabled = false,
                Address = string.Empty,
                Port = string.Empty,
                Username = string.Empty,
                Password = string.Empty,
                BypassOnLocal = true,
                PreAuthenticate = true
            });

            //await settingService.SaveSettingAsync(new CookieSettings
            //{
            //    CompareProductsCookieExpires = 24 * 10,
            //    RecentlyViewedProductsCookieExpires = 24 * 10,
            //    CustomerCookieExpires = 24 * 365
            //});
        }

        protected virtual async Task InstallCustomersAndUsersAsync(string defaultUserEmail, string defaultUserPassword)
        {
            var crAdministrators = new CustomerRole
            {
                Name = "Administrators",
                Active = true,
                IsSystemRole = true,
                SystemName = NopCustomerDefaults.AdministratorsRoleName
            };
            var crModerators = new CustomerRole
            {
                Name = "Moderators",
                Active = true,
                IsSystemRole = true,
                SystemName = NopCustomerDefaults.ModeratorsRoleName
            };
            var crRegistered = new CustomerRole
            {
                Name = "Registered",
                Active = true,
                IsSystemRole = true,
                SystemName = NopCustomerDefaults.RegisteredRoleName
            };
            var crGuests = new CustomerRole
            {
                Name = "Guests",
                Active = true,
                IsSystemRole = true,
                SystemName = NopCustomerDefaults.GuestsRoleName
            };
            var customerRoles = new List<CustomerRole>
            {
                crAdministrators,
                crModerators,
                crRegistered,
                crGuests,
            };

            await InsertInstallationDataAsync(customerRoles);

            //default store 
            var defaultStore = await _storeRepository.Table.FirstOrDefaultAsyncExt();

            if (defaultStore == null)
                throw new Exception("No default store could be loaded");

            var storeId = defaultStore.Id;

            // admin user
            var adminUser = new Customer
            {
                DisplayName = "Volencho",
                ScreenName = "@volencho",
                Password = "111111",
                Email = defaultUserEmail,
                Location = "Bulgaria",
                Active = true,
                CreatedOn = DateTime.UtcNow,
                LastActivityDateUtc = DateTime.UtcNow,
                LastIpAddress = "127.0.0.1",
            };


            await InsertInstallationDataAsync(adminUser);

            await InsertInstallationDataAsync(
                new CustomerCustomerRoleMapping { CustomerId = adminUser.Id, CustomerRoleId = crAdministrators.Id },
                new CustomerCustomerRoleMapping { CustomerId = adminUser.Id, CustomerRoleId = crModerators.Id },
                new CustomerCustomerRoleMapping { CustomerId = adminUser.Id, CustomerRoleId = crRegistered.Id });

            // set default customer name
            await InsertInstallationDataAsync(new GenericAttribute
            {
                EntityId = adminUser.Id,
                Key = NopCustomerDefaults.FirstNameAttribute,
                KeyGroup = nameof(Customer),
                Value = "John",
                StoreId = 0,
                CreatedOrUpdatedDateUTC = DateTime.UtcNow
            },
            new GenericAttribute
            {
                EntityId = adminUser.Id,
                Key = NopCustomerDefaults.LastNameAttribute,
                KeyGroup = nameof(Customer),
                Value = "Smith",
                StoreId = 0,
                CreatedOrUpdatedDateUTC = DateTime.UtcNow
            });

            //set hashed admin password
            var customerRegistrationService = EngineContext.Current.Resolve<ICustomerRegistrationService>();
            await customerRegistrationService.ChangePasswordAsync(new ChangePasswordRequest(defaultUserEmail, false,
                 PasswordFormat.Hashed, defaultUserPassword, null, NopCustomerServicesDefaults.DefaultHashedPasswordFormat));


            // notifications settings
            var settings = new UserNotificationSettingModel
            {
                AbuseAsModerator = UserNotificationSettingValue.EMAIL,
                AbuseNewMessage = UserNotificationSettingValue.EMAIL,
                AbuseStateChange = UserNotificationSettingValue.WEB,
                BlacklistOnMyVideo = UserNotificationSettingValue.EMAIL,
                CommentMention = UserNotificationSettingValue.WEB,
                MyVideoPublished = UserNotificationSettingValue.WEB,
                NewCommentOnMyVideo = UserNotificationSettingValue.WEB,
                NewFollow = UserNotificationSettingValue.EMAIL,
                NewUserRegistration = UserNotificationSettingValue.WEB,
                NewVideoFromSubscription = UserNotificationSettingValue.WEB,
                VideoAutoBlacklistAsModerator = UserNotificationSettingValue.WEB,
                CustomerId = adminUser.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            await InsertInstallationDataAsync(settings);

            // search engine (crawler) built-in user
            var searchEngineUser = new Customer
            {
                Email = "builtin@search_engine_record.com",
                Active = true,
                CreatedOn = DateTime.UtcNow,
                LastActivityDateUtc = DateTime.UtcNow,
                LastIpAddress = "127.0.0.1",
            };

            await InsertInstallationDataAsync(searchEngineUser);

            await InsertInstallationDataAsync(new CustomerCustomerRoleMapping { CustomerRoleId = crGuests.Id, CustomerId = searchEngineUser.Id });

            // built-in user for background tasks
            var backgroundTaskUser = new Customer
            {
                Email = "builtin@background-task-record.com",
                Active = true,
                IsSystemAccount = true,
                SystemName = NopCustomerDefaults.BackgroundTaskCustomerName,
                CreatedOn = DateTime.UtcNow,
                LastActivityDateUtc = DateTime.UtcNow,
            };

            await InsertInstallationDataAsync(backgroundTaskUser);

            await InsertInstallationDataAsync(new CustomerCustomerRoleMapping { CustomerId = backgroundTaskUser.Id, CustomerRoleId = crGuests.Id });
        }

        protected virtual async Task InstallPollsAsync()
        {
            var poll1 = new Poll
            {
                Question = "Why do you play chess?",
                SystemKeyword = string.Empty,
                Published = true,
                ShowOnHomepage = true,
                DisplayOrder = 1,
                StartDateUtc = DateTime.UtcNow,
            };

            await InsertInstallationDataAsync(poll1);

            var answers = new List<PollAnswer>
            {
                new PollAnswer
            {
                Label = "I find it fun",
                Position = 1,
                PollId = poll1.Id
            },
                new PollAnswer
            {
                Label = "Helps me focus",
                Position = 2,
                PollId = poll1.Id
            },
                new PollAnswer
            {
                Label = "I love the game",
                Position = 3,
                PollId = poll1.Id
            },
                new PollAnswer
            {
                Label = "Because chess has the power to bring people together",
                Position = 4,
                PollId = poll1.Id
            }
            };

            await InsertInstallationDataAsync(answers);
        }

        protected virtual async Task InstallActivityLogTypesAsync()
        {
            var activityLogTypes = new List<ActivityLogType>
            {
                // admin area activities
                new ActivityLogType
                {
                    SystemKeyword = "AddNewAddressAttribute",
                    Enabled = true,
                    Name = "Add a new address attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewAddressAttributeValue",
                    Enabled = true,
                    Name = "Add a new address attribute value"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewAffiliate",
                    Enabled = true,
                    Name = "Add a new affiliate"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewBlogPost",
                    Enabled = true,
                    Name = "Add a new blog post"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewCampaign",
                    Enabled = true,
                    Name = "Add a new campaign"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewCategory",
                    Enabled = true,
                    Name = "Add a new category"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewCheckoutAttribute",
                    Enabled = true,
                    Name = "Add a new checkout attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewCountry",
                    Enabled = true,
                    Name = "Add a new country"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewCurrency",
                    Enabled = true,
                    Name = "Add a new currency"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewCustomer",
                    Enabled = true,
                    Name = "Add a new customer"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewCustomerAttribute",
                    Enabled = true,
                    Name = "Add a new customer attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewCustomerAttributeValue",
                    Enabled = true,
                    Name = "Add a new customer attribute value"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewCustomerRole",
                    Enabled = true,
                    Name = "Add a new customer role"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewDiscount",
                    Enabled = true,
                    Name = "Add a new discount"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewEmailAccount",
                    Enabled = true,
                    Name = "Add a new email account"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewGiftCard",
                    Enabled = true,
                    Name = "Add a new gift card"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewLanguage",
                    Enabled = true,
                    Name = "Add a new language"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewManufacturer",
                    Enabled = true,
                    Name = "Add a new manufacturer"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewMeasureDimension",
                    Enabled = true,
                    Name = "Add a new measure dimension"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewMeasureWeight",
                    Enabled = true,
                    Name = "Add a new measure weight"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewNews",
                    Enabled = true,
                    Name = "Add a new news"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewProduct",
                    Enabled = true,
                    Name = "Add a new product"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewProductAttribute",
                    Enabled = true,
                    Name = "Add a new product attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewSetting",
                    Enabled = true,
                    Name = "Add a new setting"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewSpecAttribute",
                    Enabled = true,
                    Name = "Add a new specification attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewSpecAttributeGroup",
                    Enabled = true,
                    Name = "Add a new specification attribute group"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewStateProvince",
                    Enabled = true,
                    Name = "Add a new state or province"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewStore",
                    Enabled = true,
                    Name = "Add a new store"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewTopic",
                    Enabled = true,
                    Name = "Add a new topic"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewReviewType",
                    Enabled = true,
                    Name = "Add a new review type"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewVendor",
                    Enabled = true,
                    Name = "Add a new vendor"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewVendorAttribute",
                    Enabled = true,
                    Name = "Add a new vendor attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewVendorAttributeValue",
                    Enabled = true,
                    Name = "Add a new vendor attribute value"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewWarehouse",
                    Enabled = true,
                    Name = "Add a new warehouse"
                },
                new ActivityLogType
                {
                    SystemKeyword = "AddNewWidget",
                    Enabled = true,
                    Name = "Add a new widget"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteActivityLog",
                    Enabled = true,
                    Name = "Delete activity log"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteAddressAttribute",
                    Enabled = true,
                    Name = "Delete an address attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteAddressAttributeValue",
                    Enabled = true,
                    Name = "Delete an address attribute value"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteAffiliate",
                    Enabled = true,
                    Name = "Delete an affiliate"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteBlogPost",
                    Enabled = true,
                    Name = "Delete a blog post"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteBlogPostComment",
                    Enabled = true,
                    Name = "Delete a blog post comment"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteCampaign",
                    Enabled = true,
                    Name = "Delete a campaign"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteCategory",
                    Enabled = true,
                    Name = "Delete category"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteCheckoutAttribute",
                    Enabled = true,
                    Name = "Delete a checkout attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteCountry",
                    Enabled = true,
                    Name = "Delete a country"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteCurrency",
                    Enabled = true,
                    Name = "Delete a currency"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteCustomer",
                    Enabled = true,
                    Name = "Delete a customer"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteCustomerAttribute",
                    Enabled = true,
                    Name = "Delete a customer attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteCustomerAttributeValue",
                    Enabled = true,
                    Name = "Delete a customer attribute value"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteCustomerRole",
                    Enabled = true,
                    Name = "Delete a customer role"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteDiscount",
                    Enabled = true,
                    Name = "Delete a discount"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteEmailAccount",
                    Enabled = true,
                    Name = "Delete an email account"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteGiftCard",
                    Enabled = true,
                    Name = "Delete a gift card"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteLanguage",
                    Enabled = true,
                    Name = "Delete a language"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteManufacturer",
                    Enabled = true,
                    Name = "Delete a manufacturer"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteMeasureDimension",
                    Enabled = true,
                    Name = "Delete a measure dimension"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteMeasureWeight",
                    Enabled = true,
                    Name = "Delete a measure weight"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteMessageTemplate",
                    Enabled = true,
                    Name = "Delete a message template"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteNews",
                    Enabled = true,
                    Name = "Delete a news"
                },
                 new ActivityLogType
                {
                    SystemKeyword = "DeleteNewsComment",
                    Enabled = true,
                    Name = "Delete a news comment"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteOrder",
                    Enabled = true,
                    Name = "Delete an order"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeletePlugin",
                    Enabled = true,
                    Name = "Delete a plugin"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteProduct",
                    Enabled = true,
                    Name = "Delete a product"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteProductAttribute",
                    Enabled = true,
                    Name = "Delete a product attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteProductReview",
                    Enabled = true,
                    Name = "Delete a product review"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteReturnRequest",
                    Enabled = true,
                    Name = "Delete a return request"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteReviewType",
                    Enabled = true,
                    Name = "Delete a review type"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteSetting",
                    Enabled = true,
                    Name = "Delete a setting"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteSpecAttribute",
                    Enabled = true,
                    Name = "Delete a specification attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteSpecAttributeGroup",
                    Enabled = true,
                    Name = "Delete a specification attribute group"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteStateProvince",
                    Enabled = true,
                    Name = "Delete a state or province"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteStore",
                    Enabled = true,
                    Name = "Delete a store"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteSystemLog",
                    Enabled = true,
                    Name = "Delete system log"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteTopic",
                    Enabled = true,
                    Name = "Delete a topic"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteVendor",
                    Enabled = true,
                    Name = "Delete a vendor"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteVendorAttribute",
                    Enabled = true,
                    Name = "Delete a vendor attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteVendorAttributeValue",
                    Enabled = true,
                    Name = "Delete a vendor attribute value"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteWarehouse",
                    Enabled = true,
                    Name = "Delete a warehouse"
                },
                new ActivityLogType
                {
                    SystemKeyword = "DeleteWidget",
                    Enabled = true,
                    Name = "Delete a widget"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditActivityLogTypes",
                    Enabled = true,
                    Name = "Edit activity log types"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditAddressAttribute",
                    Enabled = true,
                    Name = "Edit an address attribute"
                },
                 new ActivityLogType
                {
                    SystemKeyword = "EditAddressAttributeValue",
                    Enabled = true,
                    Name = "Edit an address attribute value"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditAffiliate",
                    Enabled = true,
                    Name = "Edit an affiliate"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditBlogPost",
                    Enabled = true,
                    Name = "Edit a blog post"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditCampaign",
                    Enabled = true,
                    Name = "Edit a campaign"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditCategory",
                    Enabled = true,
                    Name = "Edit category"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditCheckoutAttribute",
                    Enabled = true,
                    Name = "Edit a checkout attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditCountry",
                    Enabled = true,
                    Name = "Edit a country"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditCurrency",
                    Enabled = true,
                    Name = "Edit a currency"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditCustomer",
                    Enabled = true,
                    Name = "Edit a customer"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditCustomerAttribute",
                    Enabled = true,
                    Name = "Edit a customer attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditCustomerAttributeValue",
                    Enabled = true,
                    Name = "Edit a customer attribute value"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditCustomerRole",
                    Enabled = true,
                    Name = "Edit a customer role"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditDiscount",
                    Enabled = true,
                    Name = "Edit a discount"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditEmailAccount",
                    Enabled = true,
                    Name = "Edit an email account"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditGiftCard",
                    Enabled = true,
                    Name = "Edit a gift card"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditLanguage",
                    Enabled = true,
                    Name = "Edit a language"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditManufacturer",
                    Enabled = true,
                    Name = "Edit a manufacturer"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditMeasureDimension",
                    Enabled = true,
                    Name = "Edit a measure dimension"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditMeasureWeight",
                    Enabled = true,
                    Name = "Edit a measure weight"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditMessageTemplate",
                    Enabled = true,
                    Name = "Edit a message template"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditNews",
                    Enabled = true,
                    Name = "Edit a news"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditOrder",
                    Enabled = true,
                    Name = "Edit an order"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditPlugin",
                    Enabled = true,
                    Name = "Edit a plugin"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditProduct",
                    Enabled = true,
                    Name = "Edit a product"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditProductAttribute",
                    Enabled = true,
                    Name = "Edit a product attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditProductReview",
                    Enabled = true,
                    Name = "Edit a product review"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditPromotionProviders",
                    Enabled = true,
                    Name = "Edit promotion providers"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditReturnRequest",
                    Enabled = true,
                    Name = "Edit a return request"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditReviewType",
                    Enabled = true,
                    Name = "Edit a review type"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditSettings",
                    Enabled = true,
                    Name = "Edit setting(s)"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditStateProvince",
                    Enabled = true,
                    Name = "Edit a state or province"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditStore",
                    Enabled = true,
                    Name = "Edit a store"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditTask",
                    Enabled = true,
                    Name = "Edit a task"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditSpecAttribute",
                    Enabled = true,
                    Name = "Edit a specification attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditSpecAttributeGroup",
                    Enabled = true,
                    Name = "Edit a specification attribute group"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditVendor",
                    Enabled = true,
                    Name = "Edit a vendor"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditVendorAttribute",
                    Enabled = true,
                    Name = "Edit a vendor attribute"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditVendorAttributeValue",
                    Enabled = true,
                    Name = "Edit a vendor attribute value"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditWarehouse",
                    Enabled = true,
                    Name = "Edit a warehouse"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditTopic",
                    Enabled = true,
                    Name = "Edit a topic"
                },
                new ActivityLogType
                {
                    SystemKeyword = "EditWidget",
                    Enabled = true,
                    Name = "Edit a widget"
                },
                new ActivityLogType
                {
                    SystemKeyword = "Impersonation.Started",
                    Enabled = true,
                    Name = "Customer impersonation session. Started"
                },
                new ActivityLogType
                {
                    SystemKeyword = "Impersonation.Finished",
                    Enabled = true,
                    Name = "Customer impersonation session. Finished"
                },
                new ActivityLogType
                {
                    SystemKeyword = "ImportCategories",
                    Enabled = true,
                    Name = "Categories were imported"
                },
                new ActivityLogType
                {
                    SystemKeyword = "ImportManufacturers",
                    Enabled = true,
                    Name = "Manufacturers were imported"
                },
                new ActivityLogType
                {
                    SystemKeyword = "ImportProducts",
                    Enabled = true,
                    Name = "Products were imported"
                },
                new ActivityLogType
                {
                    SystemKeyword = "ImportStates",
                    Enabled = true,
                    Name = "States were imported"
                },
                new ActivityLogType
                {
                    SystemKeyword = "InstallNewPlugin",
                    Enabled = true,
                    Name = "Install a new plugin"
                },
                new ActivityLogType
                {
                    SystemKeyword = "UninstallPlugin",
                    Enabled = true,
                    Name = "Uninstall a plugin"
                },
                //public store activities
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.ViewCategory",
                    Enabled = false,
                    Name = "Public store. View a category"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.ViewManufacturer",
                    Enabled = false,
                    Name = "Public store. View a manufacturer"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.ViewProduct",
                    Enabled = false,
                    Name = "Public store. View a product"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.PlaceOrder",
                    Enabled = false,
                    Name = "Public store. Place an order"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.SendPM",
                    Enabled = false,
                    Name = "Public store. Send PM"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.ContactUs",
                    Enabled = false,
                    Name = "Public store. Use contact us form"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.AddToCompareList",
                    Enabled = false,
                    Name = "Public store. Add to compare list"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.AddToShoppingCart",
                    Enabled = false,
                    Name = "Public store. Add to shopping cart"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.AddToWishlist",
                    Enabled = false,
                    Name = "Public store. Add to wishlist"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.Login",
                    Enabled = false,
                    Name = "Public store. Login"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.Logout",
                    Enabled = false,
                    Name = "Public store. Logout"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.AddProductReview",
                    Enabled = false,
                    Name = "Public store. Add product review"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.AddNewsComment",
                    Enabled = false,
                    Name = "Public store. Add news comment"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.AddBlogComment",
                    Enabled = false,
                    Name = "Public store. Add blog comment"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.AddForumTopic",
                    Enabled = false,
                    Name = "Public store. Add forum topic"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.EditForumTopic",
                    Enabled = false,
                    Name = "Public store. Edit forum topic"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.DeleteForumTopic",
                    Enabled = false,
                    Name = "Public store. Delete forum topic"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.AddForumPost",
                    Enabled = false,
                    Name = "Public store. Add forum post"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.EditForumPost",
                    Enabled = false,
                    Name = "Public store. Edit forum post"
                },
                new ActivityLogType
                {
                    SystemKeyword = "PublicStore.DeleteForumPost",
                    Enabled = false,
                    Name = "Public store. Delete forum post"
                },
                new ActivityLogType
                {
                    SystemKeyword = "UploadNewPlugin",
                    Enabled = true,
                    Name = "Upload a plugin"
                },
                new ActivityLogType
                {
                    SystemKeyword = "UploadNewTheme",
                    Enabled = true,
                    Name = "Upload a theme"
                },
                new ActivityLogType
                {
                    SystemKeyword = "UploadIcons",
                    Enabled = true,
                    Name = "Upload a favicon and app icons"
                }
            };

            await InsertInstallationDataAsync(activityLogTypes);
        }

        protected virtual async Task InstallActivityLogAsync(string defaultUserEmail)
        {
            // default customer/user
            var defaultCustomer = _customerRepository.Table.FirstOrDefault(x => x.Email == defaultUserEmail);
            if (defaultCustomer == null)
            {
                throw new Exception("Cannot load default customer");
            }

            await InsertInstallationDataAsync(new ActivityLog
            {
                ActivityLogTypeId = _activityLogTypeRepository.Table.FirstOrDefault(alt => alt.SystemKeyword == "EditCategory")?.Id ?? throw new Exception("Cannot load LogType: EditCategory"),
                Comment = "Edited a category ('Computers')",
                CreatedOnUtc = DateTime.UtcNow,
                CustomerId = defaultCustomer.Id,
                IpAddress = "127.0.0.1"
            });

            await InsertInstallationDataAsync(new ActivityLog
            {
                ActivityLogTypeId = _activityLogTypeRepository.Table.FirstOrDefault(alt => alt.SystemKeyword == "EditDiscount")?.Id ?? throw new Exception("Cannot load LogType: EditDiscount"),
                Comment = "Edited a discount ('Sample discount with coupon code')",
                CreatedOnUtc = DateTime.UtcNow,
                CustomerId = defaultCustomer.Id,
                IpAddress = "127.0.0.1"
            });

            await InsertInstallationDataAsync(new ActivityLog
            {
                ActivityLogTypeId = _activityLogTypeRepository.Table.FirstOrDefault(alt => alt.SystemKeyword == "EditSpecAttribute")?.Id ?? throw new Exception("Cannot load LogType: EditSpecAttribute"),
                Comment = "Edited a specification attribute ('CPU Type')",
                CreatedOnUtc = DateTime.UtcNow,
                CustomerId = defaultCustomer.Id,
                IpAddress = "127.0.0.1"
            });

            await InsertInstallationDataAsync(new ActivityLog
            {
                ActivityLogTypeId = _activityLogTypeRepository.Table.FirstOrDefault(alt => alt.SystemKeyword == "AddNewProductAttribute")?.Id ?? throw new Exception("Cannot load LogType: AddNewProductAttribute"),
                Comment = "Added a new product attribute ('Some attribute')",
                CreatedOnUtc = DateTime.UtcNow,
                CustomerId = defaultCustomer.Id,
                IpAddress = "127.0.0.1"
            });

            await InsertInstallationDataAsync(new ActivityLog
            {
                ActivityLogTypeId = _activityLogTypeRepository.Table.FirstOrDefault(alt => alt.SystemKeyword == "DeleteGiftCard")?.Id ?? throw new Exception("Cannot load LogType: DeleteGiftCard"),
                Comment = "Deleted a gift card ('bdbbc0ef-be57')",
                CreatedOnUtc = DateTime.UtcNow,
                CustomerId = defaultCustomer.Id,
                IpAddress = "127.0.0.1"
            });
        }


        #endregion

        #region Methods

        /// <summary>
        /// Install required data
        /// </summary>
        /// <param name="defaultUserEmail">Default user email</param>
        /// <param name="defaultUserPassword">Default user password</param>
        /// <param name="languagePackInfo">Language pack info</param>
        /// <param name="regionInfo">RegionInfo</param>
        /// <param name="cultureInfo">CultureInfo</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task InstallRequiredDataAsync(string defaultUserEmail, string defaultUserPassword,
            (string languagePackDownloadLink, int languagePackProgress) languagePackInfo, RegionInfo regionInfo, CultureInfo cultureInfo)
        {
            await InstallStoresAsync();
            await InstallCountriesAndStatesAsync();
            await InstallSettingsAsync(regionInfo);
            await InstallCustomersAndUsersAsync(defaultUserEmail, defaultUserPassword);
            await InstallPollsAsync();
            await InstallActivityLogTypesAsync();
            await InstallScheduleTasksAsync();
        }

        /// <summary>
        /// Install sample data
        /// </summary>
        /// <param name="defaultUserEmail">Default user email</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task InstallSampleDataAsync(string defaultUserEmail)
        {
            await InstallSampleCustomersAsync();
            await InstallPollsAsync();
            await InstallActivityLogAsync(defaultUserEmail);

            var settingService = EngineContext.Current.Resolve<ISettingService>();
        }

        #endregion
    }
}
