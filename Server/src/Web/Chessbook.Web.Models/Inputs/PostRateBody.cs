namespace Chessbook.Web.Models.Inputs
{
    using Microsoft.AspNetCore.Mvc;

    using Chessbook.Data.Models.Post.Enums;

    public class PostRateBody
    {
        public PostRateType Rating { get; set; }
    }
}
