using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Services.Mapping;

namespace WorldFeed.Programming.Quiz.Web.ViewModels.Users
{
    public class UserViewModel : IMapFrom<ApplicationUser>, IMapTo<ApplicationUser>
    {
        private readonly UserManager<ApplicationUser> userManager;

        public UserViewModel(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }
        public string Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public int UserQuizTokenId { get; set; }

        public UserQuizToken UserQuizToken { get; set; }

        public List<ApplicationUser> Standings => this.userManager.Users.
            Include(ut => ut.UserQuizToken)
            .OrderByDescending(ms => ms.UserQuizToken.MaximumSolved)
            .ThenByDescending(bs => bs.UserQuizToken.BestStreak)
            .ThenBy(c => c.UserQuizToken.CreatedOn)
            .ToList();
    }
}
