namespace Sharebook.Services.Data.Services
{
    using Sharebook.Data.Models.System;

    public interface ICurrentContextProvider
    {
        ContextSession GetCurrentContext();
    }
}
