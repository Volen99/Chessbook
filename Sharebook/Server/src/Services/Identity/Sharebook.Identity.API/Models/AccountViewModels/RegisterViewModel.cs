namespace Sharebook.Identity.API.Models.AccountViewModels
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using Sharebook.Identity.API.DTO;
    using Sharebook.Identity.API.Models.ManageViewModels;
    using Sharebook.Identity.API.Models.User.Enums;

    public class RegisterViewModel
    {
        public RegisterViewModel()
        {
        }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public UserDTO User { get; set; }

        public Gender Gender { get; set; }

        public BirthdateViewModel Birthdate { get; set; }
    }

}
