using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sharebook.Storage.API.Data.Models.Properties
{
    public class Coordinates
    {
        public Coordinates(double latitude, double longitude)
        {
            this.Latitude = latitude;
            this.Longitude = longitude;
        }

        private Coordinates()
        {

        }

        public int Id { get; set; } // del

        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}
