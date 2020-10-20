using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WorldFeed.Programming.Quiz.Data.Common.Models;

namespace WorldFeed.Programming.Quiz.Data.Models
{
    public class UserQuizToken : BaseDeletableModel<int>
    {
        [Required]
        public int Lifes { get; set; }

        [Required]
        public int QuestionsPassed { get; set; }

        [Required]
        public int CurrentStreak { get; set; }

        [Required]
        public int BestStreak { get; set; }

        [Required]
        public int MaximumSolved { get; set; }

        [Required]
        public int CurrentQuestionId { get; set; }

        public string QuestionsLeft { get; set; }

        public bool IsSnakeUnlocked { get; set; }

        public bool HasUfoPassed { get; set; } = true;

        public bool CanIncreaseLivesFromSnake{ get; set; }

        public int HackingAttempts { get; set; }
    }
}
