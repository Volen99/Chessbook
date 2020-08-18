using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using WorldFeed.Programming.Quiz.Data.Models;
using WorldFeed.Programming.Quiz.Services.Mapping;

namespace WorldFeed.Programming.Quiz.Web.ViewModels.UsersQuizTokens
{
    public class UserQuizTokenViewModel : IMapFrom<UserQuizToken>, IMapTo<UserQuizToken>, IHaveCustomMappings
    {
        public int Id { get; set; }
        public int Lifes { get; set; }

        public int QuestionsPassed { get; set; }

        public int CurrentStreak { get; set; }

        public int BestStreak { get; set; }

        public int MaximumSolved { get; set; }

        public string CurrentQuestion { get; set; }

        public string QuestionsLeft { get; set; }

        public bool IsSnakeUnlocked { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<UserQuizToken, UserQuizTokenViewModel>();
        }
    }
}
