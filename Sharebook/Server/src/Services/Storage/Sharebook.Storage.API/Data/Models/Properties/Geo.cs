namespace Sharebook.Storage.API.Data.Models.Properties
{
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json;

    using Sharebook.Common.Extensions;
    using Sharebook.Common.Public.Models;

    /// <summary>
    /// Geographic information of a location
    /// </summary>
    public class Geo /*: ValueObject*/
    {
        public Geo(string type, List<Coordinates> coordinates)
        {
            this.Type = type;
            this.Coordinates = coordinates;
        }

        private Geo()
        {

        }

        public int Id { get; set; } // del

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
