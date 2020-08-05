namespace WorldFeed.Kids.API.Data
{
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;

    using WorldFeed.Common.Data;

    public class KidsDbContext : MessageDbContext  //  IdentityDbContext<ApplicationUser, ApplicationRole, string> // TODO: Do you really need to inherit IdentityDbContext?
    {
        public KidsDbContext(DbContextOptions<KidsDbContext> options)
            : base(options)
        {
        }

        protected override Assembly ConfigurationsAssembly => Assembly.GetExecutingAssembly();
    }
}
