using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.Inputs.Polls
{
    public class PollAnswerVoteInputModel
    {
        public int PollId { get; set; }

        public int OptionId { get; set; }

    }
}
