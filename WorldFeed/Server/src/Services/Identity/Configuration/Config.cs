namespace WorldFeed.Identity.API.Configuration
{
    using System.Collections.Generic;
    using IdentityServer4;
    using IdentityServer4.Models;

    // Config.cs - IdentityServer resources and clients configuration file
    public class Config
    {
        // ApiResources define the apis in your system
        public static IEnumerable<ApiScope> GetApiScopes()
        {
            // Starting with v4, scopes have their own definition and can optionally be referenced by resources.
            // Before v4, scopes where always contained within a resource.
            
            // кенов: Scope is what access the user has. In the token we say, The scope on this user are his photos. That means when we call Facebook
            // API and tell him, give me the posts of this user, he will say "sorry, but no". But if you tell him, give the photos, it will give them
            return new List<ApiScope>
            {
                new ApiScope("science", "Science Service"),
            };
        }

        // With ApiResource you can now create two logical APIs and their correponding scopes:
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("science", "Science Service")
                {
                    Scopes = { "science", "Science Service" }
                }
            };
        }

        // Identity resources are data like user ID, name, or email address of a user
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        // client want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients(Dictionary<string, string> clientsUrl)
        {
            // You can think of the ClientId and the ClientSecret as the login and password for your application itself. It identifies
            // your application to the identity server so that it knows which application is trying to connect to it
            //
            return new List<Client>
            {
                // The Client class models an OpenID Connect or OAuth 2.0 client - e.g. a native application, a web application or a JS-based application
                //
                new Client
                {
                    ClientId = "js",                                       // JavaScript Client (SPA)
                    ClientName = "WorldFeed SPA OpenId Client",
                    AllowedGrantTypes = GrantTypes.Implicit,               // TODO: plz dont use this coz of security reasons kk..
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris =           { $"{clientsUrl["Spa"]}/" },
                    RequireConsent = false,
                    PostLogoutRedirectUris = { $"{clientsUrl["Spa"]}/" },
                    AllowedCorsOrigins =     { $"{clientsUrl["Spa"]}" },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "webshoppingagg",
                        "orders.signalrhub",
                        "webhooks"
                    },
                },
            };
        }
    }
}
