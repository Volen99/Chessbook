namespace WorldFeed.WebLogic
{
    using System;

    using WorldFeed.Common.Public.Models.Enums;

    public static class HttpMethodExtensions
    {
        public static HttpMethod ToTweetinviHttpMethod(this System.Net.Http.HttpMethod method)
        {
            switch (method.Method)
            {
                case "GET":
                    return HttpMethod.GET;
                case "POST":
                    return HttpMethod.POST;
                case "PUT":
                    return HttpMethod.PUT;
                case "DELETE":
                    return HttpMethod.DELETE;
            }

            throw new InvalidCastException("Cannot convert http method");
        }
    }
}
