﻿namespace Chessbook.Web.Api.Identity
{
    using System;
    using System.Security.Claims;

    public static class ClaimsPrincipalExtensions
    {
        // This is so dope 🔥 31.01.2021, Sunday, 21:42 PM | [lyrics] Artik & Asti - Неделимы [LIETUVIŠKAI]
        public static int GetUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
                throw new ArgumentNullException(nameof(principal));

            var stringId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            int.TryParse(stringId, out var currentUserId);

            return currentUserId;
        }
    }
}
