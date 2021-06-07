namespace Chessbook.Web.Api
{
    using Microsoft.AspNetCore.Http;

    using Chessbook.Data.Models.System;
    using Chessbook.Services.Data.Services;
    using Chessbook.Web.Api.Identity;

    public class CurrentContextProvider : ICurrentContextProvider
    {
        private readonly IHttpContextAccessor _accessor;
        public CurrentContextProvider(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public ContextSession GetCurrentContext()
        {
            if (_accessor.HttpContext != null &&_accessor.HttpContext.User != null && _accessor.HttpContext.User.Identity.IsAuthenticated) // _accessor != null by mi
            {
                var currentUserId = _accessor.HttpContext.User.GetUserId();

                if (currentUserId > 0)
                {
                    return new ContextSession { UserId = currentUserId };
                }
            }

            return null;
        }
    }
}
