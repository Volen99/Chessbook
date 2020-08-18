using WorldFeed.Programming.Quiz.Data.Models.Timer;

namespace WorldFeed.Programming.Quiz.Web.Models.AnonymousUser
{
    public class AnonymousUser : IAnonymousUser
    {
        public int Lives { get; set; }

        public int QuestionsPassed { get; set; }

        public int WrongAnswers { get; set; }

        public int CurrentStreak { get; set; }

        public int BestStreak { get; set; }
            
        public string QuestionsLeft { get; set; }

        public int CurrentQuestionId { get; set; }

        public bool IsSnakeUnlocked { get; set; }

        public bool HasUfoPassed { get; set; }

        public bool CanIncreaseLivesFromSnake { get; set; }

        public QuizTimer QuizTimer { get; set; }
    }
}
