namespace Sharebook.Services.Data
{
    using Sharebook.Data.Models.System;
    using Sharebook.Services.Data.Services;

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
