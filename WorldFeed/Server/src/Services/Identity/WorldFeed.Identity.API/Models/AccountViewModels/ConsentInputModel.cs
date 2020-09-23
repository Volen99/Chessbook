namespace WorldFeed.Identity.API.Models.AccountViewModels
{
    using System.Collections.Generic;

    public class ConsentInputModel
    {
        public string Button { get; set; }

        public IEnumerable<string> ScopesConsented { get; set; }

        public bool RememberConsent { get; set; }

        public string ReturnUrl { get; set; }
    }
}
