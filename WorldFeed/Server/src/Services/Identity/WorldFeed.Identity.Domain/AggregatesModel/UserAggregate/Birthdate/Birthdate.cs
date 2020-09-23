namespace WorldFeed.Identity.Domain.AggregatesModel.UserAggregate.Birthdate
{
    using System.ComponentModel.DataAnnotations;

    public class Birthdate
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
