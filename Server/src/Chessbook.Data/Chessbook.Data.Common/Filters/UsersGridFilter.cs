namespace Chessbook.Data.Common.Filters
{
    public class UsersGridFilter : BaseFilter
    {
        public string FilterByFirstName { get; set; }
        public string FilterByLastName { get; set; }
        public string FilterByLogin { get; set; }
        public string FilterByEmail { get; set; }
        public string FilterByAge { get; set; }
        public string FilterByStreet { get; set; }
        public string FilterByCity { get; set; }
        public string FilterByZipCode { get; set; }
    }
}
