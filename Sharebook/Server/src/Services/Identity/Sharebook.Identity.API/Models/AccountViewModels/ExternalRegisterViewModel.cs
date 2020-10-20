namespace Sharebook.Identity.API.Models.AccountViewModels
{
    public class ExternalRegisterViewModel
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public string ReturnUrl { get; set; }
    }
}
