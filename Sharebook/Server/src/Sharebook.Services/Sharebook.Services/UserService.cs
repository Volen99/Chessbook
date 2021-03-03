namespace Sharebook.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Sharebook.Data.Common.Filters;
    using Sharebook.Data.Common.System;
    using Sharebook.Data.Models;
    using Sharebook.Data.Models.System;
    using Sharebook.Data.Repositories;
    using Sharebook.Services.Data;
    using Sharebook.Services.Data.Services;
    using Sharebook.Services.Mapping;
    using Sharebook.Web.Models;

    public class UserService<TUser> : BaseService, IUserService where TUser : User, new()
    {
        protected readonly IUserRepository<TUser> userRepository;
        protected readonly IUserPhotoRepository userPhotoRepository;

        public UserService(ICurrentContextProvider contextProvider, IUserRepository<TUser> userRepository,
            IUserPhotoRepository userPhotoRepository) : base(contextProvider)
        {
            this.userRepository = userRepository;
            this.userPhotoRepository = userPhotoRepository;
        }

        public async Task<GridData<UserDTO>> GetDataForGrid(UsersGridFilter filter, bool includeDeleted = false)
        {
            var tuple = await userRepository.GetFilteredListWithTotalCount(filter, Session, includeDeleted);

            return new GridData<UserDTO>
            {
                Items = tuple.Item1.MapTo<IEnumerable<UserDTO>>(),
                TotalCount = tuple.Item2
            };
        }

        public async Task<bool> Delete(int id)
        {
            await userRepository.Delete(id, Session);
            return true;
        }

        public async Task<UserDTO> Edit(UserDTO dto)
        {
            var user = dto.MapTo<TUser>();
            await userRepository.Edit(user, Session);
            return user.MapTo<UserDTO>();
        }

        public async Task<byte[]> GetUserPhoto(int userId)
        {
            var photoContent = await userPhotoRepository.Get(userId, Session);
            return photoContent?.Image;
        }

        public async Task<UserDTO> GetById(int id, bool includeDeleted = false)
        {
            var user = await userRepository.Get(id, Session, includeDeleted);
            return user.MapTo<UserDTO>();
        }

        public async Task<UserDTO> GetByLogin(string login, bool includeDeleted = false)
        {
            var user = await userRepository.GetByLogin(login, Session, includeDeleted);
            return user.MapTo<UserDTO>();
        }

        public async Task<(IEnumerable<TUser>, int)> GetFilteredListWithTotalCount(UsersGridFilter filter,
            ContextSession session, bool includeDeleted = false)
        {
            var query = GetEntities(session, includeDeleted).ApplyFilter(filter);
            return (
                await query
                    .Skip(filter.PageSize * (filter.PageNumber - 1))
                    .Take(filter.PageSize)
                    .Include(u => u.UserRoles)
                    .ThenInclude(x => x.Role)
                    .Include(u => u.Settings)
                    .ToArrayAsync(),
                await query
                    .CountAsync());
        }
    }
}
