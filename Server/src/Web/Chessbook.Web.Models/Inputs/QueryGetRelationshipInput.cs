using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.Inputs
{
    public class QueryGetRelationshipInput
    {
        [BindProperty(Name = "source_id")]
        public int SourceId { get; set; }               // User from whom to check the relationship

        [BindProperty(Name = "target_id")]
        public int TargetId { get; set; }               // User to whom we want to check the relationship
    }
}
