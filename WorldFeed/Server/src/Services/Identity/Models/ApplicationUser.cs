namespace WorldFeed.Identity.API.Models
{
    using System.ComponentModel.DataAnnotations;
    using Microsoft.AspNetCore.Identity;

    // Add profile data for application users by adding properties to the ApplicationUser class 
    public class ApplicationUser : IdentityUser
    {   
        //  [Required]            // interesting regex
        //  [RegularExpression(@"(0[1-9]|1[0-2])\/[0-9]{2}", ErrorMessage = "Expiration should match a valid MM/YY value")]
        //  public string Expiration { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }
    }
}
