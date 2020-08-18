using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WorldFeed.Programming.Quiz.Data.Models.Timer
{
    public class QuizTimer
    {
        [Key]
        public int Id { get; set; }

        public int Days { get; set; }

        public int Hours { get; set; }

        public int Minutes { get; set; }

        // [ConcurrencyCheck] 
        public int Seconds { get; set; }

        public int UserQuizTokenId { get; set; }

        public UserQuizToken UserQuizToken { get; set; }
    }
}
