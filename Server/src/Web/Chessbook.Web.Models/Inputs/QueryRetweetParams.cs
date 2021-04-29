using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Web.Models.Inputs
{
    public class QueryRetweetParams
    {
        public int Id { get; set; }

        [BindProperty(Name = "trim_user")]
        public bool TrimUser { get; set; }
    }
}
