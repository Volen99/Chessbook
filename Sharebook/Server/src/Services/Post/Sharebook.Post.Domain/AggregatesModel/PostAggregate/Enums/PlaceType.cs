namespace Sharebook.Post.Domain.AggregatesModel.PostAggregate.Enums
{
    using Sharebook.Upload.Domain.Common;

    public class PlaceType : Enumeration
    {
        private PlaceType(int id, string name) : base(id, name)
        {
        }

        private PlaceType(int value)
            :this(value, FromValue<PlaceType>(value).Name)
        {

        }

        public static PlaceType Undefined = new PlaceType(0, nameof(Undefined));
        public static PlaceType Admin = new PlaceType(1, nameof(Admin));
        public static PlaceType Poi = new PlaceType(2, nameof(Poi));
        public static PlaceType Neighborhood = new PlaceType(5, nameof(Neighborhood));
        public static PlaceType City = new PlaceType(6, nameof(City));
        public static PlaceType Town = new PlaceType(7, nameof(Town));
        public static PlaceType AdministrativeArea1 = new PlaceType(8, nameof(AdministrativeArea1));
        public static PlaceType AdministrativeArea2 = new PlaceType(9, nameof(AdministrativeArea2));
        public static PlaceType AdministrativeArea3 = new PlaceType(10, nameof(AdministrativeArea3));
        public static PlaceType PostalCode = new PlaceType(11, nameof(PostalCode));
        public static PlaceType Country = new PlaceType(12, nameof(Country));
        public static PlaceType SuperName = new PlaceType(19, nameof(SuperName)); // Multiple countries, regions (latin america), historical location (USSR)
        public static PlaceType Suburb = new PlaceType(22, nameof(Suburb));
        public static PlaceType Colloquial = new PlaceType(24, nameof(Colloquial));
        public static PlaceType Continent = new PlaceType(29, nameof(Continent));
        public static PlaceType TimeZone = new PlaceType(31, nameof(TimeZone));

        // Undefined = 0,
        // Admin = 1,
        // Poi = 2,
        // Neighborhood = 5,
        // City = 6,
        // Town = 7,
        // AdministrativeArea1 = 8,
        // AdministrativeArea2 = 9,
        // AdministrativeArea3 = 10,
        // PostalCode = 11,
        // Country = 12,
        // SuperName = 19, // Multiple countries, regions (latin america), historical location (USSR)
        // Suburb = 22,
        // Colloquial = 24,
        // Continent = 29,
        // TimeZone = 31,
    }
}
