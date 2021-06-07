using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;
using Nop.Core.Configuration;
using Nop.Core.Http;
using Nop.Core.Infrastructure;

namespace Nop.Core
{
    /// <summary>
    /// Represents a web helper
    /// </summary>
    public partial class WebHelper : IWebHelper
    {
        #region Fields

        private readonly AppSettings _appSettings;
        private readonly IHttpContextAccessor _httpContextAccessor;

        #endregion

        #region Ctor

        public WebHelper(AppSettings appSettings, IHttpContextAccessor httpContextAccessor)
        {
            _appSettings = appSettings;
            _httpContextAccessor = httpContextAccessor;
        }

        #endregion

        #region Utilities

        /// <summary>
        /// Check whether current HTTP request is available
        /// </summary>
        /// <returns>True if available; otherwise false</returns>
        protected virtual bool IsRequestAvailable()
        {
            if (_httpContextAccessor?.HttpContext == null)
            {
                return false;
            }

            try
            {
                if (_httpContextAccessor.HttpContext.Request == null)
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Get IP address from HTTP context
        /// </summary>
        /// <returns>String of IP address</returns>
        public virtual string GetCurrentIpAddress()
        {
            if (!IsRequestAvailable())
            {
                return string.Empty;
            }

            var result = string.Empty;
            try
            {
                // first try to get IP address from the forwarded header
                if (_httpContextAccessor.HttpContext.Request.Headers != null)
                {
                    // the X-Forwarded-For (XFF) HTTP header field is a de facto standard for identifying the originating IP address of a client
                    // connecting to a web server through an HTTP proxy or load balancer
                    var forwardedHttpHeaderKey = NopHttpDefaults.XForwardedForHeader;
                    if (!string.IsNullOrEmpty(_appSettings.HostingConfig.ForwardedHttpHeader))
                    {
                        // but in some cases server use other HTTP header
                        // in these cases an administrator can specify a custom Forwarded HTTP header (e.g. CF-Connecting-IP, X-FORWARDED-PROTO, etc)
                        forwardedHttpHeaderKey = _appSettings.HostingConfig.ForwardedHttpHeader;
                    }

                    var forwardedHeader = _httpContextAccessor.HttpContext.Request.Headers[forwardedHttpHeaderKey];
                    if (!StringValues.IsNullOrEmpty(forwardedHeader))
                    {
                        result = forwardedHeader.FirstOrDefault();
                    }
                }

                // if this header not exists try get connection remote IP address
                if (string.IsNullOrEmpty(result) && _httpContextAccessor.HttpContext.Connection.RemoteIpAddress != null)
                {
                    result = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
                }
            }
            catch
            {
                return string.Empty;
            }

            // some of the validation
            if (result != null && result.Equals(IPAddress.IPv6Loopback.ToString(), StringComparison.InvariantCultureIgnoreCase))
            {
                result = IPAddress.Loopback.ToString();
            }

            // "TryParse" doesn't support IPv4 with port number :(
            if (IPAddress.TryParse(result ?? string.Empty, out var ip))
            {
                //IP address is valid 
                result = ip.ToString();
            }
               
            else if (!string.IsNullOrEmpty(result))
            {
                // remove port
                result = result.Split(':').FirstOrDefault();
            }

            return result;
        }

        public string GetCurrentRequestProtocol()
        {
            throw new NotImplementedException();
        }

        public string GetRawUrl(HttpRequest request)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets store host location
        /// </summary>
        /// <param name="useSsl">Whether to get SSL secured URL</param>
        /// <returns>Store host location</returns>
        public virtual string GetStoreHost(bool useSsl)
        {
            if (!IsRequestAvailable())
                return string.Empty;

            //try to get host from the request HOST header
            var hostHeader = _httpContextAccessor.HttpContext.Request.Headers[HeaderNames.Host];
            if (StringValues.IsNullOrEmpty(hostHeader))
                return string.Empty;

            //add scheme to the URL
            var storeHost = $"{(useSsl ? Uri.UriSchemeHttps : Uri.UriSchemeHttp)}{Uri.SchemeDelimiter}{hostHeader.FirstOrDefault()}";

            //ensure that host is ended with slash
            storeHost = $"{storeHost.TrimEnd('/')}/";

            return storeHost;
        }

        /// <summary>
        /// Gets store location
        /// </summary>
        /// <param name="useSsl">Whether to get SSL secured URL; pass null to determine automatically</param>
        /// <returns>Store location</returns>
        public virtual string GetStoreLocation(bool? useSsl = null)
        {
            var storeLocation = string.Empty;

            // get store host
            var storeHost = GetStoreHost(useSsl ?? IsCurrentConnectionSecured());
            if (!string.IsNullOrEmpty(storeHost))
            {
                // add application path base if exists
                storeLocation = IsRequestAvailable() ? $"{storeHost.TrimEnd('/')}{_httpContextAccessor.HttpContext.Request.PathBase}" : storeHost;
            }

            // if host is empty (it is possible only when HttpContext is not available), use URL of a store entity configured in admin area
            if (string.IsNullOrEmpty(storeHost))
            {
                // do not inject IWorkContext via constructor because it'll cause circular references
                storeLocation = EngineContext.Current.Resolve<IStoreContext>().GetCurrentStoreAsync().Result?.Url
                    ?? throw new Exception("Current store cannot be loaded");
            }

            // ensure that URL is ended with slash
            storeLocation = $"{storeLocation.TrimEnd('/')}/";

            return storeLocation;
        }

        /// <summary>
        /// Gets this page URL
        /// </summary>
        /// <param name="includeQueryString">Value indicating whether to include query strings</param>
        /// <param name="useSsl">Value indicating whether to get SSL secured page URL. Pass null to determine automatically</param>
        /// <param name="lowercaseUrl">Value indicating whether to lowercase URL</param>
        /// <returns>Page URL</returns>
        public virtual string GetThisPageUrl(bool includeQueryString, bool? useSsl = null, bool lowercaseUrl = false)
        {
            if (!IsRequestAvailable())
            {
                return string.Empty;
            }

            // get store location
            var storeLocation = GetStoreLocation(useSsl ?? IsCurrentConnectionSecured());

            // add local path to the URL
            var pageUrl = $"{storeLocation.TrimEnd('/')}{_httpContextAccessor.HttpContext.Request.Path}";

            // add query string to the URL
            if (includeQueryString)
            {
                pageUrl = $"{pageUrl}{_httpContextAccessor.HttpContext.Request.QueryString}";
            }

            // whether to convert the URL to lower case
            if (lowercaseUrl)
            {
                pageUrl = pageUrl.ToLowerInvariant();
            }

            return pageUrl;
        }

        /// <summary>
        /// Get URL referrer if exists
        /// </summary>
        /// <returns>URL referrer</returns>
        public virtual string GetUrlReferrer()
        {
            if (!IsRequestAvailable())
            {
                return string.Empty;
            }

            // URL referrer is null in some case (for example, in IE 8)
            return _httpContextAccessor.HttpContext.Request.Headers[HeaderNames.Referer];
        }

        public bool IsAjaxRequest(HttpRequest request)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets a value indicating whether current connection is secured
        /// </summary>
        /// <returns>True if it's secured, otherwise false</returns>
        public virtual bool IsCurrentConnectionSecured()
        {
            if (!IsRequestAvailable())
            {
                return false;
            }

            // check whether hosting uses a load balancer
            // use HTTP_CLUSTER_HTTPS?
            if (_appSettings.HostingConfig.UseHttpClusterHttps)
            {
                return _httpContextAccessor.HttpContext.Request.Headers[NopHttpDefaults.HttpClusterHttpsHeader].ToString().Equals("on", StringComparison.OrdinalIgnoreCase);
            }

            // use HTTP_X_FORWARDED_PROTO?
            if (_appSettings.HostingConfig.UseHttpXForwardedProto)
            {
                return _httpContextAccessor.HttpContext.Request.Headers[NopHttpDefaults.HttpXForwardedProtoHeader].ToString().Equals("https", StringComparison.OrdinalIgnoreCase);
            }

            return _httpContextAccessor.HttpContext.Request.IsHttps;
        }

        public bool IsLocalRequest(HttpRequest req)
        {
            throw new NotImplementedException();
        }

        public bool IsStaticResource()
        {
            throw new NotImplementedException();
        }

        public string ModifyQueryString(string url, string key, params string[] values)
        {
            throw new NotImplementedException();
        }

        public T QueryString<T>(string name)
        {
            throw new NotImplementedException();
        }

        public string RemoveQueryString(string url, string key, string value = null)
        {
            throw new NotImplementedException();
        }

        public void RestartAppDomain()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets a value that indicates whether the client is being redirected to a new location
        /// </summary>
        public virtual bool IsRequestBeingRedirected
        {
            get
            {
                var response = _httpContextAccessor.HttpContext.Response;
                //ASP.NET 4 style - return response.IsRequestBeingRedirected;
                int[] redirectionStatusCodes = { StatusCodes.Status301MovedPermanently, StatusCodes.Status302Found };

                return redirectionStatusCodes.Contains(response.StatusCode);
            }
        }

        /// <summary>
        /// Gets or sets a value that indicates whether the client is being redirected to a new location using POST
        /// </summary>
        public virtual bool IsPostBeingDone
        {
            get
            {
                if (_httpContextAccessor.HttpContext.Items[NopHttpDefaults.IsPostBeingDoneRequestItem] == null)
                    return false;

                return Convert.ToBoolean(_httpContextAccessor.HttpContext.Items[NopHttpDefaults.IsPostBeingDoneRequestItem]);
            }

            set => _httpContextAccessor.HttpContext.Items[NopHttpDefaults.IsPostBeingDoneRequestItem] = value;
        }

        #endregion
    }
}
