namespace Chessbook.Data.Models.Post.Properties
{
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// Geographic information of a location
    /// </summary>
    [Owned]
    public class Geo
    {
        public string Type { get; set; }

        //// ReSharper disable once UnusedMember.Local -- This is used during the deserialization
        //[JsonProperty("coordinates")]
        //private List<double[][]> _storedCoordinates
        //{
        //    set
        //    {
        //        if (value == null)
        //        {
        //            this.Coordinates = null;
        //        }
        //        else if (value.IsEmpty())
        //        {
        //            this.Coordinates = new List<Coordinates>();
        //        }
        //        else
        //        {
        //            var coordinatesInfo = value[0];
        //            this.Coordinates = coordinatesInfo.Select(x => (Coordinates)new Coordinates(x[1], x[0])).ToList();
        //        }
        //    }
        //}

        //[JsonIgnore]
        //public List<Coordinates> Coordinates { get; set; }
    }
}
