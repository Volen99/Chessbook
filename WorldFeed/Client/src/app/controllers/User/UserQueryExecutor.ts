import {ITwitterResult, TwitterResult} from "../../core/Core/Web/TwitterResult";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {Stream} from "stream";
import { ITwitterAccessor } from 'src/app/core/Core/Web/ITwitterAccessor';
import {IUserQueryGenerator} from "../../core/Core/QueryGenerators/IUserQueryGenerator";
import { HttpMethod } from 'src/app/core/Public/Models/Enum/HttpMethod';


export interface IUserQueryExecutor {
  GetAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>;

  // USERS
  GetUserAsync(parameters: IGetUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>;

  GetUsersAsync(parameters: IGetUsersParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO[]>>;

  // FRIENDS
  GetFriendIdsAsync(parameters: IGetFriendIdsParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>;

  GetFollowerIdsAsync(parameters: IGetFollowerIdsParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>;

  // BLOCK
  BlockUserAsync(parameters: IBlockUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>;

  UnblockUserAsync(parameters: IUnblockUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>;

  ReportUserForSpamAsync(parameters: IReportUserForSpamParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>;

  GetBlockedUserIdsAsync(parameters: IGetBlockedUserIdsParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>;

  GetBlockedUsersAsync(parameters: IGetBlockedUsersParameters, request: ITwitterRequest): Task<ITwitterResult<IUserCursorQueryResultDTO>>;

  // FOLLOWERS
  FollowUserAsync(parameters: IFollowUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>;

  UnfollowUserAsync(parameters: IUnfollowUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>;

  // ONGOING REQUESTS
  GetUserIdsRequestingFriendshipAsync(parameters: IGetUserIdsRequestingFriendshipParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>;

  GetUserIdsYouRequestedToFollowAsync(parameters: IGetUserIdsYouRequestedToFollowParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>;

  // FRIENDSHIPS
  GetRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters, request: ITwitterRequest): Task<ITwitterResult<IRelationshipDetailsDTO>>;

  GetRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters, request: ITwitterRequest): Task<ITwitterResult<IRelationshipStateDTO[]>>;

  // MUTE
  GetMutedUserIdsAsync(parameters: IGetMutedUserIdsParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>;

  GetMutedUsersAsync(cursoredParameters: IGetMutedUsersParameters, request: ITwitterRequest): Task<ITwitterResult<IUserCursorQueryResultDTO>>;

  MuteUserAsync(parameters: IMuteUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>;

  UnmuteUserAsync(parameters: IUnmuteUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>;

  UpdateRelationshipAsync(parameters: IUpdateRelationshipParameters, request: ITwitterRequest): Task<ITwitterResult<IRelationshipDetailsDTO>>;

  GetUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters, request: ITwitterRequest): Task<ITwitterResult<number[]>>;

  GetProfileImageStreamAsync(parameters: IGetProfileImageParameters, request: ITwitterRequest): Task<Stream>;
}

    export class UserQueryExecutor implements IUserQueryExecutor
    {
        private readonly _userQueryGenerator: IUserQueryGenerator;
        private readonly _twitterAccessor: ITwitterAccessor;
        private readonly _webHelper: IWebHelper;

        constructor(userQueryGenerator: IUserQueryGenerator, twitterAccessor: ITwitterAccessor, webHelper: IWebHelper)
        {
            this._userQueryGenerator = userQueryGenerator;
            this._twitterAccessor = twitterAccessor;
            this._webHelper = webHelper;
        }

        public  GetAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            let query = this._userQueryGenerator.getAuthenticatedUserQuery(parameters);

            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;

            return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
        }

        public GetUserAsync(parameters: IGetUserParameters, request: ITwitterRequest):  Task<ITwitterResult<IUserDTO>>
{
            let query = this._userQueryGenerator.getUserQuery(parameters);

            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;

            return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
        }

        public GetUsersAsync(parameters: IGetUsersParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO[]>>
{
            if (parameters.Users.Length === 0)
            {
                ITwitterResult<IUserDTO[]> result = new TwitterResult<IUserDTO[]>(null)
                {
                    Request = null,
                    Response = null,
                    Model = new IUserDTO[0]
                };

                return Task.FromResult(result);
            }

            let query = this._userQueryGenerator.getUsersQuery(parameters);

            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;

            return this._twitterAccessor.executeRequestAsync<IUserDTO[]>(request);
        }

        public GetFollowerIdsAsync(parameters: IGetFollowerIdsParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>
{
            let query = this._userQueryGenerator.getFollowerIdsQuery(parameters);

            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;

            return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public GetFriendIdsAsync(parameters: IGetFriendIdsParameters, request: ITwitterRequest):  Task<ITwitterResult<IIdsCursorQueryResultDTO>>
{
            let query = this._userQueryGenerator.getFriendIdsQuery(parameters);

            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;

            return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public GetRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters, request: ITwitterRequest):  Task<ITwitterResult<IRelationshipDetailsDTO>>
        {
            let query = this._userQueryGenerator.getRelationshipBetweenQuery(parameters);

            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;

            return this._twitterAccessor.executeRequestAsync<IRelationshipDetailsDTO>(request);
        }

        // Stream Profile Image
        public  GetProfileImageStreamAsync(parameters: IGetProfileImageParameters, request: ITwitterRequest): Task<Stream>
        {
            let url = this._userQueryGenerator.downloadProfileImageURL(parameters);

            request.query.url = url;
            request.query.httpMethod = HttpMethod.GET;

            return this._webHelper.getResponseStreamAsync(request);
        }

        // BLOCK
        public BlockUserAsync(parameters: IBlockUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
{
            let query = this._userQueryGenerator.getBlockUserQuery(parameters);

            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;

            return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
        }

        public UnblockUserAsync(parameters: IUnblockUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
{
            let query = this._userQueryGenerator.getUnblockUserQuery(parameters);

            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;

            return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
        }

        public  ReportUserForSpamAsync(parameters: IReportUserForSpamParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            let query = this._userQueryGenerator.getReportUserForSpamQuery(parameters);

            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;

            return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
        }

        public  GetBlockedUserIdsAsync(parameters: IGetBlockedUserIdsParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            let query = this._userQueryGenerator.getBlockedUserIdsQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;
            return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public  GetBlockedUsersAsync(parameters: IGetBlockedUsersParameters, request: ITwitterRequest): Task<ITwitterResult<IUserCursorQueryResultDTO>>
        {
            let query = this._userQueryGenerator.getBlockedUsersQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;
            return this._twitterAccessor.executeRequestAsync<IUserCursorQueryResultDTO>(request);
        }

        // FOLLOWERS
        public  FollowUserAsync(parameters: IFollowUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            let query = this._userQueryGenerator.getFollowUserQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;
            return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
        }

        public  UpdateRelationshipAsync(parameters: IUpdateRelationshipParameters, request: ITwitterRequest): Task<ITwitterResult<IRelationshipDetailsDTO>>
        {
            let query = this._userQueryGenerator.getUpdateRelationshipQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;
            return this._twitterAccessor.executeRequestAsync<IRelationshipDetailsDTO>(request);
        }

        public UnfollowUserAsync(parameters: IUnfollowUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
{
            let query = this._userQueryGenerator.getUnfollowUserQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;
            return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
        }

        public  GetUserIdsRequestingFriendshipAsync(parameters: IGetUserIdsRequestingFriendshipParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            let query = this._userQueryGenerator.getUserIdsRequestingFriendshipQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;
            return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public  GetUserIdsYouRequestedToFollowAsync(parameters: IGetUserIdsYouRequestedToFollowParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            let query = this._userQueryGenerator.getUserIdsYouRequestedToFollowQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;
            return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        // FRIENDSHIPS
        public  GetRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters, request: ITwitterRequest): Task<ITwitterResult<IRelationshipStateDTO[]>>
        {
            let query = this._userQueryGenerator.getRelationshipsWithQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;
            return this._twitterAccessor.executeRequestAsync<IRelationshipStateDTO[]>(request);
        }

        // MUTE
        public GetUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters, request: ITwitterRequest): Task<ITwitterResult<number[]>>
{
            let query = this._userQueryGenerator.getUserIdsWhoseRetweetsAreMutedQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;
            return this._twitterAccessor.executeRequestAsync<number[]>(request);
        }

        public GetMutedUserIdsAsync(parameters: IGetMutedUserIdsParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>
{
            let query = this._userQueryGenerator.getMutedUserIdsQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;
            return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public GetMutedUsersAsync(parameters: IGetMutedUsersParameters, request: ITwitterRequest): Task<ITwitterResult<IUserCursorQueryResultDTO>>
{
            let query = this._userQueryGenerator.getMutedUsersQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.GET;
            return this._twitterAccessor.executeRequestAsync<IUserCursorQueryResultDTO>(request);
        }

        public MuteUserAsync(parameters: IMuteUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            let query = this._userQueryGenerator.getMuteUserQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;
            return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
        }

        public  UnmuteUserAsync(parameters: IUnmuteUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            let query = this._userQueryGenerator.getUnmuteUserQuery(parameters);
            request.query.url = query;
            request.query.httpMethod = HttpMethod.POST;
            return this._twitterAccessor.executeRequestAsync<IUserDTO>(request);
        }
    }
