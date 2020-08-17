﻿namespace WorldFeed.Common.Models.Properties
{
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json;

    using global::WorldFeed.Common.Extensions;
    using global::WorldFeed.Common.Public.Models;
    using global::WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// Geographic information of a location
    /// </summary>
    public class Geo : IGeo
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        // ReSharper disable once UnusedMember.Local -- This is used during the deserialization
        [JsonProperty("coordinates")]
        private List<double[][]> _storedCoordinates
        {
            set
            {
                if (value == null)
                {
                    Coordinates = null;
                }
                else if (value.IsEmpty())
                {
                    Coordinates = new List<ICoordinates>();
                }
                else
                {
                    var coordinatesInfo = value[0];
                    Coordinates = coordinatesInfo.Select(x => (ICoordinates)new Coordinates(x[1], x[0])).ToList();
                }
            }
        }

        [JsonIgnore]
        public List<ICoordinates> Coordinates { get; set; }
    }
}
