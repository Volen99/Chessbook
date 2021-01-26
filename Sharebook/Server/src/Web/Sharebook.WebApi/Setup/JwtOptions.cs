/*
* Copyright (c) Akveo 2019. All Rights Reserved.
* Licensed under the Single Application / Multi Application License.
* See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the ‘docs’ folder for license information on type of purchased license.
*/

using Microsoft.IdentityModel.Tokens;
using System;

namespace Sharebook.Web.Api.Setup
{
    public class JwtOptions
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Subject { get; set; }
        public byte[] AccessSecret { get; set; }
        public byte[] RefreshSecret { get; set; }
        public DateTime IssuedAt => DateTime.UtcNow;
        public TimeSpan AccessValidFor { get; set; } = TimeSpan.FromMinutes(60);
        public TimeSpan RefreshValidFor { get; set; } = TimeSpan.FromMinutes(43200);
        public DateTime NotBefore => DateTime.UtcNow;
        public DateTime AccessExpiration => IssuedAt.Add(AccessValidFor);
        public DateTime RefreshExpiration => IssuedAt.Add(RefreshValidFor);
        public SigningCredentials AccessSigningCredentials { get; set; }
        public SigningCredentials RefreshSigningCredentials { get; set; }
    }
}
