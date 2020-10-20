namespace Sharebook.Profile.Domain.AggregatesModel.UserAggregate.Birthdate
{
    using System.ComponentModel.DataAnnotations;

    // TODO: Put [Attributes] in Application Layer!!
    public enum Visibility
    {
        Public = 1,
        [Display(Name = "Your followers")]
        Followers = 2,
        [Display(Name = "People you follow")]
        Following = 3,
        [Display(Name = "You follow each other")]
        MutualFollow = 4,
        [Display(Name = "Only you")]
        Self = 5,
    }
}
