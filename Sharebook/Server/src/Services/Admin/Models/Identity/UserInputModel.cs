namespace Sharebook.Admin.Models.Identity
{
    using Sharebook.Common.Models;

    public class UserInputModel : IMapFrom<LoginFormModel>
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
