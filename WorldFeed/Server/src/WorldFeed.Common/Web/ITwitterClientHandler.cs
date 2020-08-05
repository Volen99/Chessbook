namespace WorldFeed.Common.Web
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    using WorldFeed.Common.Public.Models.Interfaces;

    public interface ITwitterClientHandler
    {
        /// <summary>
        /// Contains all the information required for the HttpClient to create and execute the request.
        /// </summary>
        ITwitterQuery TwitterQuery { get; set; }
    }
}
