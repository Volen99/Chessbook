namespace WorldFeed.Identity.Models.Identity
{
    using System.ComponentModel.DataAnnotations;

    using WorldFeed.Common.Models.Enums;

    using static Data.DataConstants.Identity;

    public class UserInputModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [EmailAddress]
        [Required]
        [MinLength(MinEmailLength)]
        [MaxLength(MaxEmailLength)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public int BirthdayMonth { get; set; }

        public int BirthdayDay { get; set; }

        public int BirthdayYear { get; set; }

        public int Gender { get; set; }
    }
}
