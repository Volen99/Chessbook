namespace Chessbook.Web.Models.AuthDTO
{
    public class SignUpDTO : LoginDTO
    {
        public string DisplayName { get; set; }

        public string Username { get; set; }

        public string ConfirmPassword { get; set; }

        public bool Terms { get; set; }
    }
}