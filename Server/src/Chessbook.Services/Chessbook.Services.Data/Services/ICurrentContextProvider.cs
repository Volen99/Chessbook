namespace Chessbook.Services.Data.Services
{
    using Chessbook.Data.Models.System;

    public interface ICurrentContextProvider
    {
        ContextSession GetCurrentContext();
    }
}
