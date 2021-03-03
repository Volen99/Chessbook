namespace Sharebook.Web.Models.Inputs
{
    using Microsoft.AspNetCore.Mvc;

    using Sharebook.Data.Models.Post.Enums;

    public class QueryVoteParams
    {
        public int Id { get; set; }

        [BindProperty(Name = "rate_type")]
        public PostRateType RateType { get; set; }
    }
}
