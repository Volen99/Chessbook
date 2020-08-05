namespace WorldFeed.Common.Public.Models.Interfaces
{
    using System.Collections.Generic;

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
