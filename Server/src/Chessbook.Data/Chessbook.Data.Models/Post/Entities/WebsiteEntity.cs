﻿namespace Chessbook.Data.Models.Post.Entities
{
    using global::System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;


    public class WebsiteEntity
    {
        public IEnumerable<UrlEntity> Urls { get; set; }
    }
}
