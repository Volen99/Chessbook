using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.Polls
{
    public class PollCreateBody
    {
        public string[] Options { get; set; }

        [BindProperty(Name = "expires_in")]
        public int ExpiresIn { get; set; }

        public bool Multiple { get; set; }
    }
}
