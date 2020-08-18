using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using WorldFeed.Programming.Quiz.Data.Common.Models;

namespace WorldFeed.Programming.Quiz.Data.Models
{
    public class VoteQuestion : IAuditInfo
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        public int QuestionId { get; set; }

        public virtual Questions Question { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public VoteType Type { get; set; }
    }
}
