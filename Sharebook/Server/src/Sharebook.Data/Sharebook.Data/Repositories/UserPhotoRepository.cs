namespace Sharebook.Data.Repositories
{
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    using Sharebook.Data.Models.System;
    using Sharebook.Data.Models;
    using Sharebook.Data.Common.Repositories;

    public class UserPhotoRepository : BaseRepository<UserPhoto, DataContext>, IUserPhotoRepository
    {
        public UserPhotoRepository(DataContext context) : base(context)
        {
        }

        public override async Task<bool> Exists(UserPhoto obj, ContextSession session)
        {
            var context = GetContext(session);
            return await context.UserPhotos.Where(x => x.Id == obj.Id).AsNoTracking().CountAsync() > 0;
        }

        public override async Task<UserPhoto> Get(int id, ContextSession session)
        {
            var context = GetContext(session);
            return await context.UserPhotos.Where(obj => obj.Id == id).AsNoTracking().FirstOrDefaultAsync();
        }
    }
}
