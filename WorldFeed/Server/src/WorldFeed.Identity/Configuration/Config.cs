namespace WorldFeed.Identity.API.Configuration
{
    using IdentityServer4;
    using IdentityServer4.Models;
    using System.Collections.Generic;

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
        public static IEnumerable<Client> GetClients()
        {
            // You can think of the ClientId and the ClientSecret as the login and password for your application itself. It identifies
            // your application to the identity server so that it knows which application is trying to connect to it
            //
            return new List<Client>
            {
                // The Client class models an OpenID Connect or OAuth 2.0 client - e.g. a native application, a web application or a JS-based application.
                new Client
                {
                    ClientId = "mvc",
                    ClientName = "MVC Client",
                    ClientSecrets = new List<Secret>
                    {
                        new Secret("secret".Sha256()),
                    },
                    // No interactive user, uses the ClientId & Secret for authentication.
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowAccessTokensViaBrowser = false,
                    RequireConsent = false,
                    AllowOfflineAccess = true,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    RedirectUris = new List<string>                                           // where to redirect to after login
                    {
                        "https://localhost:5002/signin-oidc",
                    },                           
                    PostLogoutRedirectUris = new List<string>                                 // where to redirect to after logout
                    {
                        "https://localhost:5002/signout-callback-oidc",
                    },
                    // Scopes that this client has access to.
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        "science",
                        //"basket",
                        //"locations",
                        //"marketing",
                        //"webshoppingagg",
                        //"orders.signalrhub",
                        //"webhooks"
                    },
                    AccessTokenLifetime = 60*60*2, // 2 hours
                    IdentityTokenLifetime= 60*60*2 // 2 hours
                }
            };
        }
    }
}
