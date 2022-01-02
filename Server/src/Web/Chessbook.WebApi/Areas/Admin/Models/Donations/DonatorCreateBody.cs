namespace Chessbook.Web.Api.Areas.Admin.Models.Donations
{
    public class DonatorCreateBody
    {
        public string Name { get; set; }

        public string Link { get; set; }

        public string Message { get; set; }

        public string Type { get; set; }

        public int Col { get; set; }

    }
}
