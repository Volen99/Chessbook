﻿namespace WorldFeed.Post.Domain.AggregatesModel.TweetAggregate.Properties
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// Geographic information of a location
    /// </summary>
    public interface IGeo
    {
        /// <summary>
        /// Type of geographic location.
        /// </summary>
        string Type { get; set; }

        /// <summary>
        /// Collection of coordinates forming a polygone representing a location.
        /// </summary>
        List<ICoordinates> Coordinates { get; set; }
    }
}
