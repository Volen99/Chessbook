using System;
using System.Collections.Generic;
using System.Text;

namespace WorldFeed.Programming.Quiz.Web.ViewModels.Votes
{
    public class VoteQuestionInputModel
    {
        public int QuestionId { get; set; }

        public bool IsUpVote { get; set; }
    }
}
