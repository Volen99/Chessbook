using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using OfficeOpenXml;

using Chessbook.Core;
using Chessbook.Core.Domain.Chat;
using Chessbook.Core.Domain.Customers;
using Chessbook.Core.Domain.Directory;
using Chessbook.Core.Domain.Gdpr;
using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models;
using Chessbook.Services.Chat;
using Chessbook.Services.Common;
using Chessbook.Services.Customers;
using Chessbook.Services.Data.Services.Media;
using Chessbook.Services.Directory;
using Chessbook.Services.ExportImport.Help;
using Chessbook.Services.Gdpr;
using Chessbook.Services.Helpers;
using Chessbook.Services.Stores;

namespace Chessbook.Services.ExportImport
{
    /// <summary>
    /// Export manager
    /// </summary>
    public partial class ExportManager : IExportManager
    {
        #region Fields

        private readonly CustomerSettings _customerSettings;
        private readonly DateTimeSettings _dateTimeSettings;
        private readonly ICountryService _countryService;
        private readonly ICustomerAttributeFormatter _customerAttributeFormatter;
        private readonly IUserService _customerService;
        private readonly IDateTimeHelper _dateTimeHelper;
        private readonly IGdprService _gdprService;
        private readonly IGenericAttributeService _genericAttributeService;
        private readonly IPictureService _pictureService;
        private readonly IStateProvinceService _stateProvinceService;
        private readonly IStoreMappingService _storeMappingService;
        private readonly IStoreService _storeService;
        private readonly IWorkContext _workContext;
        private readonly IChatService chatService;

        #endregion

        #region Ctor

        public ExportManager(
            CustomerSettings customerSettings,
            DateTimeSettings dateTimeSettings,
            ICountryService countryService,
            ICustomerAttributeFormatter customerAttributeFormatter,
            IUserService customerService,
            IDateTimeHelper dateTimeHelper,
            IGdprService gdprService,
            IGenericAttributeService genericAttributeService,
            IPictureService pictureService,
            IStateProvinceService stateProvinceService,
            IStoreMappingService storeMappingService,
            IWorkContext workContext,
            IChatService chatService)
        {
            _customerSettings = customerSettings;
            _dateTimeSettings = dateTimeSettings;
            _countryService = countryService;
            _customerAttributeFormatter = customerAttributeFormatter;
            _customerService = customerService;
            _dateTimeHelper = dateTimeHelper;
            _gdprService = gdprService;
            _genericAttributeService = genericAttributeService;
            _pictureService = pictureService;
            _stateProvinceService = stateProvinceService;
            _storeMappingService = storeMappingService;
            _workContext = workContext;
            this.chatService = chatService;
        }

        #endregion

        #region Utilities

        /// <summary>
        /// Returns the path to the image file by ID
        /// </summary>
        /// <param name="pictureId">Picture ID</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the path to the image file
        /// </returns>
        protected virtual async Task<string> GetPicturesAsync(int pictureId)
        {
            var picture = await _pictureService.GetPictureByIdAsync(pictureId);

            return await _pictureService.GetThumbLocalPathAsync(picture);
        }

        /// <summary>
        /// Returns the image at specified index associated with the product
        /// </summary>
        /// <param name="product">Product</param>
        /// <param name="pictureIndex">Picture index to get</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the image thumb local path
        /// </returns>
        protected virtual async Task<string> GetPictureAsync(Post product, short pictureIndex)
        {
            // we need only the picture at a specific index, no need to get more pictures than that
            var recordsToReturn = pictureIndex + 1;
            var pictures = await _pictureService.GetPicturesByProductIdAsync(product.Id, recordsToReturn);
            
            return pictures.Count > pictureIndex ? await _pictureService.GetThumbLocalPathAsync(pictures[pictureIndex]) : null;
        }

        /// <returns>A task that represents the asynchronous operation</returns>
        private async Task<object> GetCustomCustomerAttributesAsync(Customer customer)
        {
            var selectedCustomerAttributes = await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.CustomCustomerAttributes);
            
            return await _customerAttributeFormatter.FormatAttributesAsync(selectedCustomerAttributes, ";");
        }

        #endregion

        #region Methods

        /// <summary>
        /// Export customer list to XLSX
        /// </summary>
        /// <param name="customers">Customers</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task<byte[]> ExportCustomersToXlsxAsync(IList<Customer> customers)
        {
            async Task<object> getPasswordFormat(Customer customer)
            {
                var password = await _customerService.GetCurrentPasswordAsync(customer.Id);

                var passwordFormatId = password?.PasswordFormatId ?? 0;

                if (false) // !_catalogSettings.ExportImportRelatedEntitiesByName
                {
                    return passwordFormatId;
                }

                return CommonHelper.ConvertEnum(((PasswordFormat)passwordFormatId).ToString());
            }

            async Task<object> getCountry(Customer customer)
            {
                var countryId = await _genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.CountryIdAttribute);

                if (false) // !_catalogSettings.ExportImportRelatedEntitiesByName)
                {
                    return countryId;
                }

                var country = await _countryService.GetCountryByIdAsync(countryId);

                return country?.Name ?? string.Empty;
            }

            // property manager 
            var manager = new PropertyManager<Customer>(new[]
            {
                new PropertyByName<Customer>("CustomerId", p => p.Id),
                new PropertyByName<Customer>("CustomerGuid", p => p.CustomerGuid),
                new PropertyByName<Customer>("Email", p => p.Email),
                new PropertyByName<Customer>("Username", p => p.DisplayName), // Username
                new PropertyByName<Customer>("Password", async p => (await _customerService.GetCurrentPasswordAsync(p.Id))?.Password),
                new PropertyByName<Customer>("PasswordFormat", getPasswordFormat),
                new PropertyByName<Customer>("PasswordSalt", async p => (await _customerService.GetCurrentPasswordAsync(p.Id))?.PasswordSalt),
                new PropertyByName<Customer>("Active", p => p.Active),
                new PropertyByName<Customer>("CustomerRoles", async p=>string.Join(", ",
                    (await _customerService.GetCustomerRolesAsync(p)).Select(role => true ? role.Name : role.Id.ToString()))), 
                new PropertyByName<Customer>("IsGuest", async p => await _customerService.IsGuestAsync(p)),
                new PropertyByName<Customer>("IsRegistered", async p => await _customerService.IsRegisteredAsync(p)),
                new PropertyByName<Customer>("IsAdministrator", async p => await _customerService.IsAdminAsync(p)),
                new PropertyByName<Customer>("IsForumModerator", async p => await _customerService.IsForumModeratorAsync(p)),
                new PropertyByName<Customer>("CreatedOnUtc", p => p.CreatedOn),
                // attributes
                new PropertyByName<Customer>("FirstName", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.FirstNameAttribute), !_customerSettings.FirstNameEnabled),
                new PropertyByName<Customer>("LastName", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.LastNameAttribute), !_customerSettings.LastNameEnabled),
                new PropertyByName<Customer>("Gender", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.GenderAttribute), !_customerSettings.GenderEnabled),
                new PropertyByName<Customer>("Company", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.CompanyAttribute), !_customerSettings.CompanyEnabled),
                new PropertyByName<Customer>("City", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.CityAttribute), !_customerSettings.CityEnabled),
                new PropertyByName<Customer>("County", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.CountyAttribute), !_customerSettings.CountyEnabled),
                new PropertyByName<Customer>("Country", getCountry, !_customerSettings.CountryEnabled),
                new PropertyByName<Customer>("Phone", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.PhoneAttribute), !_customerSettings.PhoneEnabled),
                new PropertyByName<Customer>("Fax", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.FaxAttribute), !_customerSettings.FaxEnabled),
                new PropertyByName<Customer>("VatNumber", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.VatNumberAttribute)),
                new PropertyByName<Customer>("TimeZone", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.TimeZoneIdAttribute), !_dateTimeSettings.AllowCustomersToSetTimeZone),
                new PropertyByName<Customer>("AvatarPictureId", async p => await _genericAttributeService.GetAttributeAsync<int>(p, NopCustomerDefaults.AvatarPictureIdAttribute), !_customerSettings.AllowCustomersToUploadAvatars),
                new PropertyByName<Customer>("ForumPostCount", async p => await _genericAttributeService.GetAttributeAsync<int>(p, NopCustomerDefaults.ForumPostCountAttribute)),
                new PropertyByName<Customer>("Signature", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.SignatureAttribute)),
                new PropertyByName<Customer>("CustomCustomerAttributes",  GetCustomCustomerAttributesAsync)
            });

            return await manager.ExportToXlsxAsync(customers);
        }

        /// <summary>
        /// Export customer list to XML
        /// </summary>
        /// <param name="customers">Customers</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result in XML format
        /// </returns>
        public virtual async Task<string> ExportCustomersToXmlAsync(IList<Customer> customers)
        {
            var settings = new XmlWriterSettings
            {
                Async = true,
                ConformanceLevel = ConformanceLevel.Auto
            };

            await using var stringWriter = new StringWriter();
            await using var xmlWriter = XmlWriter.Create(stringWriter, settings);

            await xmlWriter.WriteStartDocumentAsync();
            await xmlWriter.WriteStartElementAsync("Customers");
            await xmlWriter.WriteAttributeStringAsync("Version", NopVersion.CURRENT_VERSION);

            foreach (var customer in customers)
            {
                await xmlWriter.WriteStartElementAsync("Customer");
                await xmlWriter.WriteElementStringAsync("CustomerId", null, customer.Id.ToString());
                await xmlWriter.WriteElementStringAsync("CustomerGuid", null, customer.CustomerGuid.ToString());
                await xmlWriter.WriteElementStringAsync("Email", null, customer.Email);
                await xmlWriter.WriteElementStringAsync("Username", null, customer.DisplayName); // Username

                var customerPassword = await _customerService.GetCurrentPasswordAsync(customer.Id);
                await xmlWriter.WriteElementStringAsync("Password", null, customerPassword?.Password);
                await xmlWriter.WriteElementStringAsync("PasswordFormatId", null, (customerPassword?.PasswordFormatId ?? 0).ToString());
                await xmlWriter.WriteElementStringAsync("PasswordSalt", null, customerPassword?.PasswordSalt);

                await xmlWriter.WriteElementStringAsync("Active", null, customer.Active.ToString());

                await xmlWriter.WriteElementStringAsync("IsGuest", null, (await _customerService.IsGuestAsync(customer)).ToString());
                await xmlWriter.WriteElementStringAsync("IsRegistered", null, (await _customerService.IsRegisteredAsync(customer)).ToString());
                await xmlWriter.WriteElementStringAsync("IsAdministrator", null, (await _customerService.IsAdminAsync(customer)).ToString());
                await xmlWriter.WriteElementStringAsync("IsForumModerator", null, (await _customerService.IsForumModeratorAsync(customer)).ToString());
                await xmlWriter.WriteElementStringAsync("CreatedOnUtc", null, customer.CreatedOn.ToString(CultureInfo.InvariantCulture));

                await xmlWriter.WriteElementStringAsync("FirstName", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.FirstNameAttribute));
                await xmlWriter.WriteElementStringAsync("LastName", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.LastNameAttribute));
                await xmlWriter.WriteElementStringAsync("Gender", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.GenderAttribute));
                await xmlWriter.WriteElementStringAsync("Company", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.CompanyAttribute));

                await xmlWriter.WriteElementStringAsync("CountryId", null, (await _genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.CountryIdAttribute)).ToString());
                await xmlWriter.WriteElementStringAsync("StreetAddress", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.StreetAddressAttribute));
                await xmlWriter.WriteElementStringAsync("StreetAddress2", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.StreetAddress2Attribute));
                await xmlWriter.WriteElementStringAsync("ZipPostalCode", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.ZipPostalCodeAttribute));
                await xmlWriter.WriteElementStringAsync("City", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.CityAttribute));
                await xmlWriter.WriteElementStringAsync("County", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.CountyAttribute));
                await xmlWriter.WriteElementStringAsync("StateProvinceId", null, (await _genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.StateProvinceIdAttribute)).ToString());
                await xmlWriter.WriteElementStringAsync("Phone", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.PhoneAttribute));
                await xmlWriter.WriteElementStringAsync("Fax", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.FaxAttribute));
                await xmlWriter.WriteElementStringAsync("VatNumber", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.VatNumberAttribute));
                await xmlWriter.WriteElementStringAsync("VatNumberStatusId", null, (await _genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.VatNumberStatusIdAttribute)).ToString());
                await xmlWriter.WriteElementStringAsync("TimeZoneId", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.TimeZoneIdAttribute));

                await xmlWriter.WriteElementStringAsync("AvatarPictureId", null, (await _genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.AvatarPictureIdAttribute)).ToString());
                await xmlWriter.WriteElementStringAsync("ForumPostCount", null, (await _genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.ForumPostCountAttribute)).ToString());
                await xmlWriter.WriteElementStringAsync("Signature", null, await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.SignatureAttribute));

                var selectedCustomerAttributesString = await _genericAttributeService.GetAttributeAsync<string>(customer, NopCustomerDefaults.CustomCustomerAttributes);

                if (!string.IsNullOrEmpty(selectedCustomerAttributesString))
                {
                    var selectedCustomerAttributes = new StringReader(selectedCustomerAttributesString);
                    var selectedCustomerAttributesXmlReader = XmlReader.Create(selectedCustomerAttributes);
                    await xmlWriter.WriteNodeAsync(selectedCustomerAttributesXmlReader, false);
                }

                await xmlWriter.WriteEndElementAsync();
            }

            await xmlWriter.WriteEndElementAsync();
            await xmlWriter.WriteEndDocumentAsync();
            await xmlWriter.FlushAsync();

            return stringWriter.ToString();
        }

        /// <summary>
        /// Export states to TXT
        /// </summary>
        /// <param name="states">States</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the result in TXT (string) format
        /// </returns>
        public virtual async Task<string> ExportStatesToTxtAsync(IList<StateProvince> states)
        {
            if (states == null)
            {
                throw new ArgumentNullException(nameof(states));
            }

            const char separator = ',';
            var sb = new StringBuilder();
            foreach (var state in states)
            {
                sb.Append((await _countryService.GetCountryByIdAsync(state.CountryId)).TwoLetterIsoCode);
                sb.Append(separator);
                sb.Append(state.Name);
                sb.Append(separator);
                sb.Append(state.Abbreviation);
                sb.Append(separator);
                sb.Append(state.Published);
                sb.Append(separator);
                sb.Append(state.DisplayOrder);
                sb.Append(Environment.NewLine); //new line
            }

            return sb.ToString();
        }

        /// <summary>
        /// Export customer info (GDPR request) to XLSX 
        /// </summary>
        /// <param name="customer">Customer</param>
        /// <param name="storeId">Store identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the customer GDPR info
        /// </returns>
        public async Task<byte[]> ExportCustomerGdprInfoToXlsxAsync(Customer customer, int storeId)
        {
            if (customer == null)
            {
                throw new ArgumentNullException(nameof(customer));
            }

            // customer info and customer attributes
            var customerManager = new PropertyManager<Customer>(new[]
            {
                new PropertyByName<Customer>("Email", p => p.Email),
                new PropertyByName<Customer>("Username", p => p.DisplayName),
                new PropertyByName<Customer>("Screen name", p => p.ScreenName),
                // attributes
                new PropertyByName<Customer>("Gender", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.GenderAttribute)),
                new PropertyByName<Customer>("Date of birth", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.DateOfBirthAttribute)),
                new PropertyByName<Customer>("County", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.CountyAttribute)),
                new PropertyByName<Customer>("Country", async p => (await _countryService.GetCountryByIdAsync(await _genericAttributeService.GetAttributeAsync<int>(p, NopCustomerDefaults.CountryIdAttribute)))?.Name ?? string.Empty),
                new PropertyByName<Customer>("Phone", async p => await _genericAttributeService.GetAttributeAsync<string>(p, NopCustomerDefaults.PhoneAttribute)),
                new PropertyByName<Customer>("User attributes",  GetCustomCustomerAttributesAsync)
            });

            // customer private messages
            var privateMessageManager = new PropertyManager<PrivateMessage>(new[]
            {
                new PropertyByName<PrivateMessage>("From", async pm => await _customerService.GetCustomerByIdAsync(pm.FromCustomerId) is Customer cFrom ? (_customerSettings.UsernamesEnabled ? cFrom.ScreenName : cFrom.Email) : string.Empty),
                new PropertyByName<PrivateMessage>("To", async pm => await _customerService.GetCustomerByIdAsync(pm.ToCustomerId) is Customer cTo ? (_customerSettings.UsernamesEnabled ? cTo.ScreenName : cTo.Email) : string.Empty),
                new PropertyByName<PrivateMessage>("Subject", pm => pm.Subject),
                new PropertyByName<PrivateMessage>("Text", pm => pm.Text),
                new PropertyByName<PrivateMessage>("Created on", async pm => (await _dateTimeHelper.ConvertToUserTimeAsync(pm.CreatedOnUtc, DateTimeKind.Utc)).ToString("D"))
            });

            List<PrivateMessage> pmList = null;
            if (true) // _forumSettings.AllowPrivateMessages
            {
                pmList = (await this.chatService.GetAllPrivateMessagesAsync(storeId, customer.Id, 0, null, null, null, null)).ToList();
                pmList.AddRange((await this.chatService.GetAllPrivateMessagesAsync(storeId, 0, customer.Id, null, null, null, null)).ToList());
            }

            // customer GDPR logs
            var gdprLogManager = new PropertyManager<GdprLog>(new[]
            {
                new PropertyByName<GdprLog>("Request type", log => log.RequestType),
                new PropertyByName<GdprLog>("Request details", log => log.RequestDetails),
                new PropertyByName<GdprLog>("Created on", async log => (await _dateTimeHelper.ConvertToUserTimeAsync(log.CreatedOnUtc, DateTimeKind.Utc)).ToString("D"))
            });

            var gdprLog = await _gdprService.GetAllLogAsync(customer.Id);

            await using var stream = new MemoryStream();
            // ok, we can run the real code of the sample now
            using (var xlPackage = new ExcelPackage(stream))
            {
                // uncomment this line if you want the XML written out to the outputDir
                //xlPackage.DebugMode = true; 

                // get handles to the worksheets
                var customerInfoWorksheet = xlPackage.Workbook.Worksheets.Add("User info");
                var fWorksheet = xlPackage.Workbook.Worksheets.Add("DataForFilters");
                fWorksheet.Hidden = eWorkSheetHidden.VeryHidden;

                // customer info and customer attributes
                var customerInfoRow = 2;
                customerManager.CurrentObject = customer;
                customerManager.WriteCaption(customerInfoWorksheet);
                await customerManager.WriteToXlsxAsync(customerInfoWorksheet, customerInfoRow);

                // customer private messages
                if (pmList?.Any() ?? false)
                {
                    var privateMessageWorksheet = xlPackage.Workbook.Worksheets.Add("Private messages");
                    privateMessageManager.WriteCaption(privateMessageWorksheet);

                    var privateMessageRow = 1;

                    foreach (var privateMessage in pmList)
                    {
                        privateMessageRow += 1;

                        privateMessageManager.CurrentObject = privateMessage;
                        await privateMessageManager.WriteToXlsxAsync(privateMessageWorksheet, privateMessageRow);
                    }
                }

                // customer GDPR logs
                if (gdprLog.Any())
                {
                    var gdprLogWorksheet = xlPackage.Workbook.Worksheets.Add("GDPR requests (log)");
                    gdprLogManager.WriteCaption(gdprLogWorksheet);

                    var gdprLogRow = 1;

                    foreach (var log in gdprLog)
                    {
                        gdprLogRow += 1;

                        gdprLogManager.CurrentObject = log;
                        await gdprLogManager.WriteToXlsxAsync(gdprLogWorksheet, gdprLogRow);
                    }
                }

                xlPackage.Save();
            }

            return stream.ToArray();
        }

        #endregion
    }
}
