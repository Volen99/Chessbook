using Chessbook.Common;
using Chessbook.Data.Models.Media;
using Chessbook.Services.Data.Services.Entities;
using Chessbook.Services.Data.Services.Media;
using Chessbook.Web.Models;
using Nop.Services.Helpers;
using System;
using System.Threading.Tasks;

namespace Chessbook.Web.Api.Factories
{
    public class UserModelFactory : IUserModelFactory
    {
        private readonly IPictureService pictureService;
        private readonly IPostsService postsService;
        private readonly IDateTimeHelper dateTimeHelper;

        public UserModelFactory(IPictureService pictureService, IPostsService postsService, IDateTimeHelper dateTimeHelper)
        {
            this.pictureService = pictureService;
            this.postsService = postsService;
            this.dateTimeHelper = dateTimeHelper;
        }

        public async Task<UserDTO> PrepareCustomerModelAsync(UserDTO model, bool excludeProperties = false)
        {
            var avatarPictureId = model.ProfilePictureId; // await _genericAttributeService.GetAttributeAsync<int>(customer, NopCustomerDefaults.AvatarPictureIdAttribute);
            var profilePictureUrl = await this.pictureService.GetPictureUrlAsync(avatarPictureId, 400, true, defaultPictureType: PictureType.Avatar);

            model.ProfileImageUrlHttps = ChessbookConstants.SiteHttps + profilePictureUrl;

            model.StatusesCount = await this.postsService.GetPostsCountByUserId(model.Id);

            model.CreatedOn = await dateTimeHelper.ConvertToUserTimeAsync(model.CreatedOn, DateTimeKind.Utc, model.Id);
            // customerModel.LastActivityDate = await _dateTimeHelper.ConvertToUserTimeAsync(customer.LastActivityDateUtc, DateTimeKind.Utc);

            return model;

        }
    }

}
