using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Infrastructure;
using Chessbook.Services;
using Chessbook.Web.Api.Models.Common;

namespace Chessbook.Web.Api.Factories
{
    public class CommonModelFactory : ICommonModelFactory
    {
        private readonly IWorkContext workContext;
        private readonly IUserService customerService;
        private readonly INopFileProvider fileProvider;
        private readonly IWebHelper webHelper;

        public CommonModelFactory(IWorkContext workContext, IUserService customerService,
            INopFileProvider fileProvider, IWebHelper webHelper)
        {
            this.workContext = workContext;
            this.customerService = customerService;
            this.fileProvider = fileProvider;
            this.webHelper = webHelper;
        }

        /// <summary>
        /// Prepare the contact us model
        /// </summary>
        /// <param name="model">Contact us model</param>
        /// <param name="excludeProperties">Whether to exclude populating of model properties from the entity</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the contact us model
        /// </returns>
        public async Task<ContactUsModel> PrepareContactUsModelAsync(ContactUsModel model, bool excludeProperties)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            if (!excludeProperties)
            {
                var userCurrent = await this.workContext.GetCurrentCustomerAsync();

                model.FromEmail = userCurrent.Email;
                model.FromName = userCurrent.ScreenName;
            }

            return model;
        }

        /// <summary>
        /// Get robots.txt file
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the robots.txt file as string
        /// </returns>
        public virtual async Task<string> PrepareRobotsTextFileAsync()
        {
            var sb = new StringBuilder();

            // if robots.custom.txt exists, let's use it instead of hard-coded data below
            var robotsFilePath = this.fileProvider.Combine(this.fileProvider.MapPath("~/"), "robots.custom.txt");
            if (this.fileProvider.FileExists(robotsFilePath))
            {
                // the robots.txt file exists
                var robotsFileContent = await this.fileProvider.ReadAllTextAsync(robotsFilePath, Encoding.UTF8);
                sb.Append(robotsFileContent);
            }
            else
            {
                // doesn't exist. Let's generate it (default behavior)

                var disallowPaths = new List<string>
                {
                    "/admin",
                    "/bin/",
                    "/files/",
                    "/files/exportimport/",
                    "/country/getstatesbycountryid",
                    "/install",
                    "/setproductreviewhelpfulness",
                };
                var localizableDisallowPaths = new List<string>
                {
                    "/addproducttocart/catalog/",
                    "/addproducttocart/details/",
                    "/backinstocksubscriptions/manage",
                    "/boards/forumsubscriptions",
                    "/boards/forumwatch",
                    "/boards/postedit",
                    "/boards/postdelete",
                    "/boards/postcreate",
                    "/boards/topicedit",
                    "/boards/topicdelete",
                    "/boards/topiccreate",
                    "/boards/topicmove",
                    "/boards/topicwatch",
                    "/cart$",
                    "/changecurrency",
                    "/changelanguage",
                    "/changetaxtype",
                    "/checkout",
                    "/checkout/billingaddress",
                    "/checkout/completed",
                    "/checkout/confirm",
                    "/checkout/shippingaddress",
                    "/checkout/shippingmethod",
                    "/checkout/paymentinfo",
                    "/checkout/paymentmethod",
                    "/clearcomparelist",
                    "/compareproducts",
                    "/compareproducts/add/*",
                    "/customer/avatar",
                    "/customer/activation",
                    "/customer/addresses",
                    "/customer/changepassword",
                    "/customer/checkusernameavailability",
                    "/customer/downloadableproducts",
                    "/customer/info",
                    "/customer/productreviews",
                    "/deletepm",
                    "/emailwishlist",
                    "/eucookielawaccept",
                    "/inboxupdate",
                    "/newsletter/subscriptionactivation",
                    "/onepagecheckout",
                    "/order/history",
                    "/orderdetails",
                    "/passwordrecovery/confirm",
                    "/poll/vote",
                    "/privatemessages",
                    "/recentlyviewedproducts",
                    "/returnrequest",
                    "/returnrequest/history",
                    "/rewardpoints/history",
                    "/search?",
                    "/sendpm",
                    "/sentupdate",
                    "/shoppingcart/*",
                    "/storeclosed",
                    "/subscribenewsletter",
                    "/topic/authenticate",
                    "/viewpm",
                    "/uploadfilecheckoutattribute",
                    "/uploadfileproductattribute",
                    "/uploadfilereturnrequest",
                    "/wishlist",
                };

                const string newLine = "\r\n"; //Environment.NewLine
                sb.Append("User-agent: *");
                sb.Append(newLine);
                //sitemaps
                //if (_sitemapXmlSettings.SitemapXmlEnabled)
                //{
                //    if (_localizationSettings.SeoFriendlyUrlsForLanguagesEnabled)
                //    {
                //        //URLs are localizable. Append SEO code
                //        foreach (var language in await _languageService.GetAllLanguagesAsync(storeId: (await _storeContext.GetCurrentStoreAsync()).Id))
                //        {
                //            sb.AppendFormat("Sitemap: {0}{1}/sitemap.xml", _webHelper.GetStoreLocation(), language.UniqueSeoCode);
                //            sb.Append(newLine);
                //        }
                //    }
                //    else
                //    {
                //        //localizable paths (without SEO code)
                //        sb.AppendFormat("Sitemap: {0}sitemap.xml", _webHelper.GetStoreLocation());
                //        sb.Append(newLine);
                //    }
                //}
                //host
                sb.AppendFormat("Host: {0}", this.webHelper.GetStoreLocation());
                sb.Append(newLine);

                //usual paths
                foreach (var path in disallowPaths)
                {
                    sb.AppendFormat("Disallow: {0}", path);
                    sb.Append(newLine);
                }
                //localizable paths (without SEO code)
                foreach (var path in localizableDisallowPaths)
                {
                    sb.AppendFormat("Disallow: {0}", path);
                    sb.Append(newLine);
                }

                //if (_localizationSettings.SeoFriendlyUrlsForLanguagesEnabled)
                //{
                //    //URLs are localizable. Append SEO code
                //    foreach (var language in await _languageService.GetAllLanguagesAsync(storeId: (await _storeContext.GetCurrentStoreAsync()).Id))
                //    {
                //        foreach (var path in localizableDisallowPaths)
                //        {
                //            sb.AppendFormat("Disallow: /{0}{1}", language.UniqueSeoCode, path);
                //            sb.Append(newLine);
                //        }
                //    }
                //}

                // load and add robots.txt additions to the end of file.
                var robotsAdditionsFile = this.fileProvider.Combine(this.fileProvider.MapPath("~/"), "robots.additions.txt");
                if (this.fileProvider.FileExists(robotsAdditionsFile))
                {
                    var robotsFileContent = await this.fileProvider.ReadAllTextAsync(robotsAdditionsFile, Encoding.UTF8);
                    sb.Append(robotsFileContent);
                }
            }

            return sb.ToString();
        }
    }
}
