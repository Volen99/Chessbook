using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using WorldFeed.Programming.Quiz.Data.Common.Models;

namespace WorldFeed.Programming.Quiz.Data.Models.Styles
{
    public class UserPersonalStyles : IAuditInfo
    {
        public UserPersonalStyles()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public string QuestionColor { get; set; }

        public string QuestionBackgroundColor { get; set; }

        public string AnswerChoiceColor { get; set; }

        public string LivesColor { get; set; }

        public int ChangesCount { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        [Required]
        [ForeignKey("User")]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
