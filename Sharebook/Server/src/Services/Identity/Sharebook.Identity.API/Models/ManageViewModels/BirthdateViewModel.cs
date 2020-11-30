namespace Sharebook.Identity.API.Models.ManageViewModels
{
    using Sharebook.Identity.API.Models.User.Birthdate;
    using System.ComponentModel.DataAnnotations;

    public class BirthdateViewModel // Do mapping
    {
        public int Day { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }

        public int Age { get; set; }

        [Display(Name = "Month and day")]
        public Visibility Visibility { get; set; }

        [Display(Name = "Year")]
        public Visibility VisibilityYear { get; set; }
    }
}
