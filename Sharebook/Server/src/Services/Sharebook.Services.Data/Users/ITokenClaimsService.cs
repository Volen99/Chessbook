namespace Sharebook.Services.Data.Users
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;

    public interface ITokenClaimsService
    {
        Task<string> GetTokenAsync(string userName);
    }
}
