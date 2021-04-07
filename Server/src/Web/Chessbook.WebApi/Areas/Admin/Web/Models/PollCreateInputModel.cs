using Chessbook.Web.Models.Polls;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Areas.Admin.Web.Models
{
    public class PollCreateInputModel : PollCreateBody
    {
        public string Question { get; set; }
    }
}
