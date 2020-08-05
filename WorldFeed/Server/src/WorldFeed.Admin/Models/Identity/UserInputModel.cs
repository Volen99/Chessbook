namespace WorldFeed.Admin.Models.Identity
{
    using WorldFeed.Common.Models;

    public class UserInputModel : IMapFrom<LoginFormModel>
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
