import HttpMethod from '../c#-objects/TypeScript.NET-Core/packages/Web/source/Net/Http/HttpMethod';

    export static class HttpMethodExtensions
    {
        public static  ToTweetinviHttpMethod(/*this*/ /*System.Net.Http.*/method: HttpMethod): HttpMethod
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
