using System;
using System.Collections.Generic;

using Chessbook.Web.Framework.Models;

namespace Chessbook.Web.Models.Polls
{
    public partial record PollModel : BaseNopEntityModel
    {
        public PollModel()
        {
            this.Answers = new List<PollAnswerModel>();
            this.OwnVotes = new List<int>();
        }

        public string Question { get; set; }

        public bool AlreadyVoted { get; set; }

        public int TotalVotes { get; set; }

        public int Views { get; set; }

        public IList<PollAnswerModel> Answers { get; set; }

        public DateTime? StartDateUtc { get; set; }

        public DateTime ExpiresAt { get; set; }

        public List<int> OwnVotes { get; set; }
    }

    public partial record PollAnswerModel : BaseNopEntityModel
    {
        public string Label { get; set; }

        public int NumberOfVotes { get; set; }

        public double PercentOfTotalVotes { get; set; }
    }
}
