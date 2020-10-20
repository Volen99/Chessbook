namespace Sharebook.Identity.API.Configuration
{
    using System.Collections.Generic;
    using IdentityServer4;
    using IdentityServer4.Models;

    // Config.cs - IdentityServer resources and clients configuration file
    public class Config
    {
        public static IEnumerable<ApiScope> GetApiScopes()
        {
            // Starting with v4, scopes have their own definition and can optionally be referenced by resources.
            // Before v4, scopes where always contained within a resource.
            
            // кенов: Scope is what access the user has. In the token we say, The scope on this user are his photos. That means when we call Facebook
            // API and tell him, give me the posts of this user, he will say "sorry, but no". But if you tell him, give the photos, it will give them
            return new List<ApiScope>
            {
                new ApiScope("webspa", "Web Spa"),
                new ApiScope("worldfeedgateway", "World Feed Gateway"),
            };
        }

        // ApiResources define the apis in your system
        // With ApiResource you can now create two logical APIs and their correponding scopes:
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("webspa", "Web Spa")
                {
                    Scopes = {"webspa", "Web Spa" },
                },
                new ApiResource("worldfeedgateway", "Web World Feed Gateway")
                {
                    Scopes = { "worldfeedgateway", "Web World Feed Gateway" },
                },
            };
        }

        // From OpenID Connect
        // Identity resources are data like user ID, name, or email address of a user. They are absolutely like Api Scopes, but for the users
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),     // I want the ID to be provided
                new IdentityResources.Profile(),    // I want the Profile Information to be provided
                // new IdentityResource("worldfeed", new List<string>() 
                // {
                //     "WorldFeed.Car",
                // })
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
                new Client
                {
                   ClientId = "js",

                    // Configures PKCE for a client-only application.
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,

                    RedirectUris = { "http://localhost:4200/" },
                    PostLogoutRedirectUris = { "http://localhost:4200/" },
                    AllowedCorsOrigins = { "http://localhost:4200" },

                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "worldfeedgateway",
                    },

                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,
                },
                new Client
                {
                    ClientId = "science.uploadswaggerui",
                    ClientName = "Science Upload Swagger UI",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,

                    RedirectUris = { $"{clientsUrl["Science.Upload"]}/swagger/oauth2-redirect.html" },
                    PostLogoutRedirectUris = { $"{clientsUrl["Science.Upload"]}/swagger/" },

                    AllowedScopes =
                    {
                        "science.upload"
                    }
                },
            };
        }
    }
}
