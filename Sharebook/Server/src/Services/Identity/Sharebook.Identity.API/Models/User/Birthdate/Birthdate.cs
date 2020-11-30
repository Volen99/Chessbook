namespace Sharebook.Identity.API.Models.User.Birthdate
{
    using System.ComponentModel.DataAnnotations;

    public class Birthdate
    {
        public int Day { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }

        public int Age { get; set; }

        public string Visibility { get; set; }

        public string VisibilityYear { get; set; }
    }
}
