using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;

using Chessbook.Core;
using Chessbook.Core.Domain.Security;
using Chessbook.Services.Security;

namespace Chessbook.Web.Framework.Security.Captcha
{
    /// <summary>
    /// Represents the HTTP client to request reCAPTCHA service
    /// </summary>
    public partial class CaptchaHttpClient
    {
        #region Fields

        private readonly CaptchaSettings _captchaSettings;
        private readonly HttpClient _httpClient;
        private readonly IWebHelper _webHelper;

        #endregion

        #region Ctor

        public CaptchaHttpClient(CaptchaSettings captchaSettings,
            HttpClient client,
            IWebHelper webHelper)
        {
            _captchaSettings = captchaSettings;
            _httpClient = client;
            _webHelper = webHelper;

            //configure client
            client.BaseAddress = new Uri(captchaSettings.ReCaptchaApiUrl);
            client.DefaultRequestHeaders.Add(HeaderNames.UserAgent, $"nopCommerce-4.40");

            if (captchaSettings.ReCaptchaRequestTimeout is int timeout && timeout > 0)
                client.Timeout = TimeSpan.FromSeconds(timeout);
        }

        #endregion

        #region Methods

        /// <summary>
        /// Validate reCAPTCHA
        /// </summary>
        /// <param name="responseValue">Response value</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the asynchronous task whose result contains response from the reCAPTCHA service
        /// </returns>
        public virtual async Task<CaptchaResponse> ValidateCaptchaAsync(string responseValue)
        {
            //prepare URL to request
            var url = string.Format(NopSecurityDefaults.RecaptchaValidationPath,
                _captchaSettings.ReCaptchaPrivateKey,
                responseValue,
                _webHelper.GetCurrentIpAddress());

            //get response
            var response = await _httpClient.GetStringAsync(url);
            return JsonConvert.DeserializeObject<CaptchaResponse>(response);

        }

        #endregion
    }
}
