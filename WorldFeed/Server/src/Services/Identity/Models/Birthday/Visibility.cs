using System.ComponentModel.DataAnnotations;

namespace WorldFeed.Identity.API.Models.Birthday
{
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
