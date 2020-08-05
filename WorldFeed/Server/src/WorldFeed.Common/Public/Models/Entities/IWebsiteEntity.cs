namespace WorldFeed.Common.Public.Models.Entities
{
    using System.Collections.Generic;

    public interface IWebsiteEntity
    {
        /// <summary>
        /// Website urls
        /// </summary>
        IEnumerable<IUrlEntity> Urls { get; set; }
    }
}
