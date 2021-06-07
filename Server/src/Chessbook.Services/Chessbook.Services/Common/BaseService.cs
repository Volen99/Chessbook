using Chessbook.Data.Models.System;
using Chessbook.Services.Data.Services;

namespace Chessbook.Services.Common
{

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
