namespace WorldFeed.Common.Public.Models
{
    using WorldFeed.Common.Public.Models.Interfaces;

    public class Coordinates : ICoordinates
    {
        public Coordinates(double latitude, double longitude)
        {
            Longitude = longitude;
            Latitude = latitude;
        }

        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}
