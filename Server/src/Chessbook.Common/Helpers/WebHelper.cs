using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace Nop.Core
{
    /// <summary>
    /// Represents a web helper
    /// </summary>
    public partial class WebHelper : IWebHelper
    {
        public bool IsRequestBeingRedirected => throw new NotImplementedException();

        public bool IsPostBeingDone { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public string GetCurrentIpAddress()
        {
            throw new NotImplementedException();
        }

        public string GetCurrentRequestProtocol()
        {
            throw new NotImplementedException();
        }

        public string GetRawUrl(HttpRequest request)
        {
            throw new NotImplementedException();
        }

        public string GetStoreHost(bool useSsl)
        {
            throw new NotImplementedException();
        }

        public string GetStoreLocation(bool? useSsl = null)
        {
            throw new NotImplementedException();
        }

        public string GetThisPageUrl(bool includeQueryString, bool? useSsl = null, bool lowercaseUrl = false)
        {
            throw new NotImplementedException();
        }

        public string GetUrlReferrer()
        {
            throw new NotImplementedException();
        }

        public bool IsAjaxRequest(HttpRequest request)
        {
            throw new NotImplementedException();
        }

        public bool IsCurrentConnectionSecured()
        {
            throw new NotImplementedException();
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
    }
}
