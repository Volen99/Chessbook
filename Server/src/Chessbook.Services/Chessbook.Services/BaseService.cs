namespace Chessbook.Services.Data
{
    using Chessbook.Data.Models.System;
    using Chessbook.Services.Data.Services;

    public abstract class BaseService
    {
        protected ICurrentContextProvider contextProvider;
        protected readonly ContextSession Session;

        protected BaseService(ICurrentContextProvider contextProvider)
        {
            this.contextProvider = contextProvider;
            Session = contextProvider.GetCurrentContext();
        }
    }
}
