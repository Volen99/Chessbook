using System.Linq;
using AutoMapper;
using WorldFeed.Programming.Quiz.Data.Models.Timer;
using WorldFeed.Programming.Quiz.Services.Mapping;
using WorldFeed.Programming.Quiz.Web.ViewModels.Styles;

namespace WorldFeed.Programming.Quiz.Web.ViewModels.Questions
{
    public class QuestionViewModel : IMapFrom<Data.Models.Questions>, IMapTo<Data.Models.Questions>, IHaveCustomMappings
    {
        public int Id { get; set; }

        public string Question { get; set; }

        public string OptionFirst { get; set; }

        public string OptionSecond { get; set; }

        public string OptionThird { get; set; }

        public string OptionFourth { get; set; }

        public string CorrectAnswer { get; set; }

        public int TotalAttempts { get; set; }

        public int RightAnswers { get; set; }

        public int WrongAnswers { get; set; }

        public decimal AverageScore { get; set; }

        public int VotesCount { get; set; }

        public UserPersonalStylesViewModel UserStyles { get; set; }

        public QuestionVoteStylesViewModel QuestionVoteStyles { get; set; }

        public int DisplayProgress { get; set; }

        public int DisplayLives { get; set; }

        public int DisplayCurrentStreak { get; set; }

        public int DisplayBestStreak { get; set; }

        public bool IsSnakeUnlocked { get; set; }

        public QuizTimer Timer { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Data.Models.Questions, QuestionViewModel>()
                .ForMember(p => p.VotesCount, options =>
                {
                    options.MapFrom(x => x.Votes.Sum(v => (int)v.Type));
                });
        }
    }
}
