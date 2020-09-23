namespace WorldFeed.Post.Domain.AggregatesModel.TweetAggregate.Properties
{
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Upload.Domain.Common;

    /// <summary>
    /// Geographic information of a location
    /// </summary>
    public class Geo : ValueObject
    {
        internal Geo(string type, List<Coordinates> coordinates)
        {
            this.Type = type;
            this.Coordinates = coordinates;
        }

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
                    this.Coordinates = null;
                }
                else if (value.IsEmpty())
                {
                    this.Coordinates = new List<Coordinates>();
                }
                else
                {
                    var coordinatesInfo = value[0];
                    this.Coordinates = coordinatesInfo.Select(x => (Coordinates)new Coordinates(x[1], x[0])).ToList();
                }
            }
        }

        [JsonIgnore]
        public List<Coordinates> Coordinates { get; set; }
    }
}
