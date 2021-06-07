using System;
using System.Collections.Generic;
using Nop.Web.Framework.Models;

namespace Nop.Web.Models.Polls
{
    public partial record PollModel : BaseNopEntityModel
    {
        public PollModel()
        {
            Answers = new List<PollAnswerModel>();
        }

        public string Question { get; set; }

        public bool AlreadyVoted { get; set; }

        public int TotalVotes { get; set; }

        public int Views { get; set; }

        public IList<PollAnswerModel> Answers { get; set; }

        public DateTime? StartDateUtc { get; set; }
    }

    public partial record PollAnswerModel : BaseNopEntityModel
    {
        public string Label { get; set; }

        public int NumberOfVotes { get; set; }

        public double PercentOfTotalVotes { get; set; }
    }
}
