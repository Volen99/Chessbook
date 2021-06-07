namespace Chessbook.Web.Models.Inputs
{
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Data.Models.Post.Enums;

    public class QueryVoteParams
    {
        public int Id { get; set; }

        [BindProperty(Name = "is_up")]
        public bool IsUp { get; set; }
    }
}
