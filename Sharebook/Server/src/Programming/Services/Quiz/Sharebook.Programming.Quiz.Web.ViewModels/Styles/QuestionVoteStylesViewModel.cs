using System;
using System.Collections.Generic;
using System.Text;
using WorldFeed.Programming.Quiz.Data.Models.Styles;
using WorldFeed.Programming.Quiz.Services.Mapping;

namespace WorldFeed.Programming.Quiz.Web.ViewModels.Styles
{
    public class QuestionVoteStylesViewModel : IMapFrom<QuestionVoteStyles>, IMapTo<QuestionVoteStyles>
    {
        public string QuestionLiked { get; set; }

        public string QuestionDisliked { get; set; }

        public string UserId { get; set; }
        public int QuestionId { get; set; }
    }
}
