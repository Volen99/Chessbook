namespace Sharebook.Storage.API.Data.Models.Properties
{
    using System.Collections.Generic;

    using Sharebook.Storage.API.Data.Models.Enums;

    public interface IPlace
    {
        string IdStr { get; }

        string Name { get; set; }

        string FullName { get; set; }

        string Url { get; set; }

        PlaceType PlaceType { get; set; }

        string Country { get; set; }

        string CountryCode { get; set; }

        Dictionary<string, string> Attributes { get; set; }

        List<Place> ContainedWithin { get; set; }

        Geo BoundingBox { get; set; }

        Geo Geometry { get; set; }
    }
}
