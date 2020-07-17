namespace WorldFeed.Identity.Data
{
    using System.Linq;
    using System.Threading.Tasks;
    using WorldFeed.Services;
    using Microsoft.AspNetCore.Identity;
    using Models;
    using WorldFeed.Common.Models;

    public class IdentityDataSeeder : IDataSeeder
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public IdentityDataSeeder(
            UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        public void SeedData()
        {
            if (this.roleManager.Roles.Any())
            {
                return;
            }

            Task
                .Run(async () =>
                {
                    var adminRole = new IdentityRole(GlobalConstants.AdministratorRoleName);

                    await this.roleManager.CreateAsync(adminRole);

                    var adminUser = new ApplicationUser
                    {
                        UserName = "admin@crs.com",
                        Email = "admin@crs.com",
                        SecurityStamp = "RandomSecurityStamp"
                    };

                    await userManager.CreateAsync(adminUser, "adminpass12");

                    await userManager.AddToRoleAsync(adminUser, GlobalConstants.AdministratorRoleName);
                })
                .GetAwaiter()
                .GetResult();
        }
    }
}
