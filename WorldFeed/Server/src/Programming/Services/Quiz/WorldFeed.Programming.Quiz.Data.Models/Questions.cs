using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WorldFeed.Programming.Quiz.Data.Models
{
    public class Questions
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(1024)]
        public string Question { get; set; }

        [Required]
        [MaxLength(1024)]
        public string OptionFirst { get; set; }

        [Required]
        [MaxLength(1024)]
        public string OptionSecond { get; set; }

        [Required]
        [MaxLength(1024)]
        public string OptionThird { get; set; }

        [Required]
        [MaxLength(1024)]
        public string OptionFourth { get; set; }

        [Required]
        [MaxLength(1024)]
        public string CorrectAnswer { get; set; }

        [Required]
        public int TotalAttempts { get; set; }

        [Required]
        public int RightAnswers { get; set; }

        [Required]
        public int WrongAnswers { get; set; }

        [Required]
        public decimal AverageScore { get; set; }

        public virtual ICollection<VoteQuestion> Votes { get; set; }
    }
}
