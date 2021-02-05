namespace Sharebook.Web.Models.Inputs
{
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    public class QueryVoteParams
    {
        public int Id { get; set; }

        [BindProperty(Name = "is_up")]
        public bool IsUp { get; set; }
    }
}
