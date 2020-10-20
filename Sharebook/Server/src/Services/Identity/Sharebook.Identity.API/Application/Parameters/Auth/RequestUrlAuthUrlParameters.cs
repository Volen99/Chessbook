namespace Sharebook.Common.Public.Parameters.Auth
{
    using System;

    using Sharebook.Common.Public.Parameters;

    /// <inheritdoc/>
    public class RequestUrlAuthUrlParameters : CustomRequestParameters, IRequestAuthUrlParameters
    {
        public RequestUrlAuthUrlParameters(string url)
        {
            CallbackUrl = url;
        }

        public RequestUrlAuthUrlParameters(Uri uri)
        {
            CallbackUrl = uri.AbsoluteUri;
        }

        public RequestUrlAuthUrlParameters(IRequestAuthUrlParameters parameters) : base(parameters)
        {
            CallbackUrl = parameters?.CallbackUrl;
            AuthAccessType = parameters?.AuthAccessType;
            ForceLogin = parameters?.ForceLogin;
            ScreenName = parameters?.ScreenName;
        }

        /// <inheritdoc/>
        public string CallbackUrl { get; set; }
        /// <inheritdoc/>
        public bool? ForceLogin { get; set; }
        /// <inheritdoc/>
        public string ScreenName { get; set; }

        /// <inheritdoc/>
        public AuthAccessType? AuthAccessType { get; set; }
    }
}
