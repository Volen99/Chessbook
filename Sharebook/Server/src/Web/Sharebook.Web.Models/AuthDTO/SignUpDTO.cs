namespace Sharebook.Web.Models.AuthDTO
{
    public class SignUpDTO : LoginDTO
    {
        public string FullName { get; set; }
        public string ConfirmPassword { get; set; }
    }
}