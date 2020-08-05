﻿namespace WorldFeed.Common.Public.Parameters.HelpClient
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models.Interfaces;

    public enum Granularity
    {
        Undefined,
        // ReSharper disable once InconsistentNaming
        POI,
        Neighborhood,
        City,
        Admin,
        Country
    }

    public enum AccuracyMeasure
    {
        Meters,
        Feets
    }

    /// <summary>
    /// For more information read : https://developer.twitter.com/en/docs/geo/places-near-location/api-reference/get-geo-search
    /// </summary>
    public interface IGeoSearchParameters : ICustomRequestParameters
    {
        /// <summary>
        /// Coordinates of the geo location.
        /// </summary>
        ICoordinates Coordinates { get; set; }

        /// <summary>
        /// Free-form text to match against while executing a geo-based query, best suited for finding nearby locations by name.
        /// </summary>
        string Query { get; set; }

        /// <summary>
        /// An Ip address. Used when attempting to fix geolocation based off of the user’s Ip address.
        /// </summary>
        string Ip { get; set; }

        /// <summary>
        /// This is the minimal granularity of place types to return.
        /// </summary>
        Granularity Granularity { get; set; }

        /// <summary>
        /// A hint on the “region” in which to search. If a number, then this is a radius in meters,
        /// but it can also take a string that is suffixed with ft to specify feet.
        /// </summary>
        int? Accuracy { get; set; }

        /// <summary>
        /// Maximum number of places to return.
        /// </summary>
        int? MaximumNumberOfResults { get; set; }

        /// <summary>
        /// This is the place_id which you would like to restrict the search results to.
        /// Setting this value means only places within the given place_id will be found.
        /// </summary>
        string ContainedWithin { get; set; }

        /// <summary>
        /// This parameter searches for places which have the given attributes.
        /// </summary>
        Dictionary<string, string> Attributes { get; }

        /// <summary>
        /// If supplied, the response will use the JSONP format with a callback of the given name.
        /// </summary>
        string Callback { get; set; }

        /// <summary>
        /// Type of measure used in pair with the Accuracy parameters
        /// </summary>
        AccuracyMeasure AccuracyMeasure { get; set; }
    }

    /// <summary>
    /// https://dev.twitter.com/rest/reference/get/geo/search
    /// </summary>
    public class GeoSearchParameters : CustomRequestParameters, IGeoSearchParameters
    {
        public GeoSearchParameters()
        {
            Attributes = new Dictionary<string, string>();
        }

        public ICoordinates Coordinates { get; set; }
        public string Query { get; set; }
        public string Ip { get; set; }
        public Granularity Granularity { get; set; }
        public int? Accuracy { get; set; }
        public int? MaximumNumberOfResults { get; set; }
        public string ContainedWithin { get; set; }
        public Dictionary<string, string> Attributes { get; }
        public string Callback { get; set; }
        public AccuracyMeasure AccuracyMeasure { get; set; }
    }
}
