namespace Sharebook.Data.Repositories
{
    using System.Threading.Tasks;

    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;

    public interface IUserPhotoRepository
    {
        Task<UserPhoto> Get(int id, ContextSession session);
    }
}
