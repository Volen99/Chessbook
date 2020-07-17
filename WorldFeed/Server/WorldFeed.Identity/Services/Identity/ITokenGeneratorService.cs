namespace WorldFeed.Identity.Services.Identity
{
    using System.Collections.Generic;
    using WorldFeed.Common.Models;

    public interface ITokenGeneratorService
    {
        string GenerateToken(ApplicationUser user, IEnumerable<string> roles = null);
    }
}
