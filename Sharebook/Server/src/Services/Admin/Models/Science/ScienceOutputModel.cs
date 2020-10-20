using System;

namespace Sharebook.Admin.Models.Science
{
    public class ScienceOutputModel
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
