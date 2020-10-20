using System;
using System.Collections.Generic;
using System.Text;
using WorldFeed.Programming.Quiz.Data.Common.Models;

namespace WorldFeed.Programming.Quiz.Data.Models.Styles
{
    public class QuestionVoteStyles : BaseDeletableModel<int>, IAuditInfo
    {
        public string QuestionLiked { get; set; }

        public string QuestionDisliked { get; set; }

        public int QuestionId { get; set; }
        public Questions Question { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
