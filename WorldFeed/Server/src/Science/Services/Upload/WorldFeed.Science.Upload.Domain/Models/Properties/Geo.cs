namespace WorldFeed.Science.Upload.Domain.Models.Properties
{
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

    [Owned]
    public class Geo
    {
        public string Type { get; set; }

        public List<Coordinates> Coordinates { get; set; }
    }
}
