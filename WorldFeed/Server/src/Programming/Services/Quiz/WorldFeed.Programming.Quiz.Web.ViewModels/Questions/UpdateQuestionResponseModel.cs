using System;
using System.Collections.Generic;
using System.Text;

namespace WorldFeed.Programming.Quiz.Web.ViewModels.Questions
{
    public class UpdateQuestionResponseModel
    {
        public int TotalAttempts { get; set; }

        public decimal AverageScore { get; set; }

        public bool IsQuestionAnsweredCorrectly { get; set; }

        public string CorrectAnswer { get; set; }

        public string RedirectUrl { get; set; }
    }
}
