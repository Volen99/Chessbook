namespace WorldFeed.Identity.API.Application.QueryExecutors
{
    using System;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Upload;
    using WorldFeed.Identity.API.Application.Parameters;
    using WorldFeed.Identity.API.Application.QueryGenerators;
    using WorldFeed.Identity.API.Application.Requesters;
    using WorldFeed.Identity.API.Application.Web;
    using WorldFeed.Identity.API.DTO;

    using HttpMethod = Common.Public.Models.Enums.HttpMethod;

    public interface IAccountSettingsQueryExecutor
    {
        Task<ITwitterResult<IAccountSettingsDTO>> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IAccountSettingsDTO>> UpdateAccountSettingsAsync(IUpdateAccountSettingsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> UpdateProfileAsync(IUpdateProfileParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> UpdateProfileImageAsync(IUpdateProfileImageParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> UpdateProfileBannerAsync(IUpdateProfileBannerParameters parameters, ITwitterRequest request);

        Task<ITwitterResult> RemoveProfileBannerAsync(IRemoveProfileBannerParameters parameters, ITwitterRequest request);
    }

    public class AccountSettingsQueryExecutor : IAccountSettingsQueryExecutor
    {
        private readonly IAccountSettingsQueryGenerator accountSettingsQueryGenerator;
        private readonly ITwitterAccessor twitterAccessor;

        public AccountSettingsQueryExecutor(IAccountSettingsQueryGenerator accountSettingsQueryGenerator, ITwitterAccessor twitterAccessor)
        {
            this.accountSettingsQueryGenerator = accountSettingsQueryGenerator;
            this.twitterAccessor = twitterAccessor;
        }

        public Task<ITwitterResult<IAccountSettingsDTO>> GetAccountSettingsAsync(IGetAccountSettingsParameters parameters, ITwitterRequest request)
        {
            var query = this.accountSettingsQueryGenerator.GetAccountSettingsQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IAccountSettingsDTO>(request);
        }

        public Task<ITwitterResult<IAccountSettingsDTO>> UpdateAccountSettingsAsync(IUpdateAccountSettingsParameters parameters, ITwitterRequest request)
        {
            var query = this.accountSettingsQueryGenerator.GetUpdateAccountSettingsQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IAccountSettingsDTO>(request);
        }

        public Task<ITwitterResult<IUserDTO>> UpdateProfileAsync(IUpdateProfileParameters parameters, ITwitterRequest request)
        {
            var query = this.accountSettingsQueryGenerator.GetUpdateProfileQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult<IUserDTO>> UpdateProfileImageAsync(IUpdateProfileImageParameters parameters, ITwitterRequest request)
        {
            var query = this.accountSettingsQueryGenerator.GetUpdateProfileImageQuery(parameters);

            var multipartQuery = new MultipartTwitterQuery(request.Query)
            {
                Url = query,
                HttpMethod = HttpMethod.POST,
                Binaries = new[] { parameters.Binary },
                ContentId = "image",
                Timeout = parameters.Timeout ?? TimeSpan.FromMilliseconds(System.Threading.Timeout.Infinite),
                UploadProgressChanged = parameters.UploadProgressChanged,
            };

            request.Query = multipartQuery;

            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult> UpdateProfileBannerAsync(IUpdateProfileBannerParameters parameters, ITwitterRequest request)
        {
            var query = this.accountSettingsQueryGenerator.GetUpdateProfileBannerQuery(parameters);
            var banner = StringFormater.UrlEncode(Convert.ToBase64String(parameters.Binary));
            var bannerHttpContent = new StringContent($"banner={banner}", Encoding.UTF8, "application/x-www-form-urlencoded");

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            request.Query.HttpContent = new ProgressableStreamContent(bannerHttpContent, parameters.UploadProgressChanged);
            request.Query.IsHttpContentPartOfQueryParams = true;
            request.Query.Timeout = parameters.Timeout ?? TimeSpan.FromMilliseconds(System.Threading.Timeout.Infinite);

            return this.twitterAccessor.ExecuteRequestAsync(request);
        }

        public Task<ITwitterResult> RemoveProfileBannerAsync(IRemoveProfileBannerParameters parameters, ITwitterRequest request)
        {
            var query = this.accountSettingsQueryGenerator.GetRemoveProfileBannerQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync(request);
        }
    }
}
