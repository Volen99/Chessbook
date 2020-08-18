using System.ComponentModel.DataAnnotations;
using WorldFeed.Programming.Quiz.Data.Models.Styles;
using WorldFeed.Programming.Quiz.Services.Mapping;

namespace WorldFeed.Programming.Quiz.Web.ViewModels.Styles
{
    public class UserPersonalStylesViewModel : IMapFrom<UserPersonalStyles>, IMapTo<UserPersonalStyles>
    {
        [Display(Name = "Question color")]
        public string QuestionColor { get; set; }

        [Display(Name = "Question Background")]
        public string QuestionBackgroundColor { get; set; }

        [Display(Name = "Answer choice color")]
        public string AnswerChoiceColor { get; set; }

        [Display(Name = "Lives color")]
        public string LivesColor { get; set; }
    }
}
