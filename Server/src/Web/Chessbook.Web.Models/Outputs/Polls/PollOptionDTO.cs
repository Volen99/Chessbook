using Chessbook.Data.Models.Polls;
using Chessbook.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.Outputs.Polls
{
    public class PollOptionDTO : IMapFrom<PollAnswer>, IMapTo<PollAnswer>
    {
        public int Id { get; set; }

        public int Position { get; set; }

        public string Label { get; set; }

        public int Votes { get; set; }
    }
}
