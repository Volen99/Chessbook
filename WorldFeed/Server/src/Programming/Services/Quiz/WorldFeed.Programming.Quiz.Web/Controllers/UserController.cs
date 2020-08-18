using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WorldFeed.Programming.Quiz.Data;
using WorldFeed.Programming.Quiz.Data.Models;

namespace WorldFeed.Programming.Quiz.Web.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext db;
        private readonly UserManager<Data.Models.ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<ApplicationRole> roleManager;

        public UserController(ApplicationDbContext db, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager)
        {
            this.db = db;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }

        // [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create()
        {
            // var result = await this.userManager.CreateAsync(new ApplicationUser
            // {
            //     UserName = "Volencho99",
            //     Email = "volen1999@gmail.com",
            //     UserQuizTokenId = 1
            // }, "lovechess7"); ;


            var user = await this.userManager.GetUserAsync(this.User);
            var result = await this.roleManager.CreateAsync(new ApplicationRole
            {
                Name = "Admin"
            });

            await this.userManager.AddToRoleAsync(user, "Admin");

            // var result = await this.roleManager.CreateAsync(new IdentityRole
            // {
            //     Name = "Admin"
            // });
            // 
            // await userManager.AddToRoleAsync(user, "Admin");

            // var user = await this.userManager.GetUserAsync(this.User);
            // var result = await this.userManager.AddClaimAsync(user, new Claim(ClaimTypes.Gender, "female"));

            //var user = await this.userManager.GetUserAsync(this.User);
            //var result = await this.userManager.AddClaimAsync(user, new Claim("Key", JsonConvert.SerializeObject(db.Questions.ToList()[700])));

            // return Json(this.User.Claims.FirstOrDefault(x => x.Type == x.Type));

            //var result = await this.signInManager.PasswordSignInAsync("Volencho99", "lovechess7", true, true);

            //var user = await this.userManager.FindByEmailAsync("volen1999@gmail.com");
            //var token = this.db.UserQuizTokens.FirstOrDefault();
            //token.Lifes = 5;
            //token.MaximumSolved = 5;
            //user.UserQuizToken = token;
            //await this.db.SaveChangesAsync();

            // var user = await this.userManager.FindByNameAsync(User.Identity.Name);
            // user.UserQuizTokenId = 1;
            // this.db.SaveChanges();

            return Json(result);
        }
    }
}