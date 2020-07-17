namespace WorldFeed.Identity.Models.Identity
{
    using System.ComponentModel.DataAnnotations;

    using WorldFeed.Common.Models.Enums;

    using static Data.DataConstants.Identity;

    public class UserLoginRequestModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [DataType(DataType.EmailAddress)]
        [RegularExpression(GlobalConstants.EmailRegEx, ErrorMessageResourceName = "Mail_invalid")]
        [Required(ErrorMessageResourceName = "Mail_required")]
        [StringLength(GlobalConstants.EmailMaxLength, ErrorMessageResourceName = "Mail_length")]
        [UIHint("SingleLineText")] // TODO: Might not work, as you are using Angular
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public int BirthdayMonth { get; set; }

        public int BirthdayDay { get; set; }

        public int BirthdayYear { get; set; }

        public int Gender { get; set; }
    }
}
