import {IUserController} from "../../core/Core/Controllers/IUserController";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {TwitterRequest} from "../../core/Public/TwitterRequest";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';

export class UserController implements IUserController
    {
        private readonly _userQueryExecutor: IUserQueryExecutor;

        constructor(userQueryExecutor: IUserQueryExecutor)
        {
            this._userQueryExecutor = userQueryExecutor;
        }

        public  getAuthenticatedUserAsync(parameters: IGetAuthenticatedUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            return _userQueryExecutor.GetAuthenticatedUserAsync(parameters, request);
        }

        public  getUserAsync(parameters: IGetUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            return _userQueryExecutor.GetUserAsync(parameters, request);
        }

        public getUsersAsync(parameters: IGetUsersParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO[]>>
        {
            return _userQueryExecutor.GetUsersAsync(parameters, request);
        }

        // Friend Ids
        public  getFriendIdsIterator(parameters: IGetFriendIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(
                parameters.cursor,
                cursor =>
                {
                    var cursoredParameters = new GetFriendIdsParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return _userQueryExecutor.GetFriendIdsAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public getFollowerIdsIterator(parameters: IGetFollowerIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(parameters.cursor, cursor =>
                {
                    var cursoredParameters = new GetFollowerIdsParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return _userQueryExecutor.GetFollowerIdsAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public getRelationshipBetweenAsync(parameters: IGetRelationshipBetweenParameters, request: ITwitterRequest): Task<ITwitterResult<IRelationshipDetailsDTO>>
        {
            return _userQueryExecutor.GetRelationshipBetweenAsync(parameters, request);
        }

        // Profile Image
        public getProfileImageStreamAsync(parameters: IGetProfileImageParameters, request: ITwitterRequest): Task<Stream>
        {
            return _userQueryExecutor.GetProfileImageStreamAsync(parameters, request);
        }



        // FOLLOW/UNFOLLOW
        public followUserAsync(parameters: IFollowUserParameters, request: ITwitterRequest):  Task<ITwitterResult<IUserDTO>>
        {
            return _userQueryExecutor.FollowUserAsync(parameters, request);
        }

        public updateRelationshipAsync(parameters: IUpdateRelationshipParameters, request: ITwitterRequest): Task<ITwitterResult<IRelationshipDetailsDTO>>
        {
            return _userQueryExecutor.UpdateRelationshipAsync(parameters, request);
        }

        public unfollowUserAsync(parameters: IUnfollowUserParameters, request: ITwitterRequest):  Task<ITwitterResult<IUserDTO>>
        {
            return this._userQueryExecutor.UnfollowUserAsync(parameters, request);
        }

        // FRIENDSHIP

        public  getRelationshipsWithAsync(parameters: IGetRelationshipsWithParameters, request: ITwitterRequest): Task<ITwitterResult<IRelationshipStateDTO[]>>
        {
            return _userQueryExecutor.GetRelationshipsWithAsync(parameters, request);
        }

        public  getUserIdsRequestingFriendshipIterator(parameters: IGetUserIdsRequestingFriendshipParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            let twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(
                parameters.cursor,
                cursor =>
                {
                    var cursoredParameters = new GetUserIdsRequestingFriendshipParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return _userQueryExecutor.GetUserIdsRequestingFriendshipAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public getUserIdsYouRequestedToFollowIterator(parameters: IGetUserIdsYouRequestedToFollowParameters, request: ITwitterRequest):  ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(
                parameters.cursor,
                cursor =>
                {
                    var cursoredParameters = new GetUserIdsYouRequestedToFollowParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return _userQueryExecutor.GetUserIdsYouRequestedToFollowAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        // BLOCK
        public  blockUserAsync(parameters: IBlockUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            return _userQueryExecutor.BlockUserAsync(parameters, request);
        }

        public unblockUserAsync(parameters: IUnblockUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            return _userQueryExecutor.UnblockUserAsync(parameters, request);
        }

        public reportUserForSpamAsync(parameters: IReportUserForSpamParameters, request: ITwitterRequest):  Task<ITwitterResult<IUserDTO>>
        {
            return _userQueryExecutor.ReportUserForSpamAsync(parameters, request);
        }

        public  getBlockedUserIdsIterator(parameters: IGetBlockedUserIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(
                parameters.cursor,
                cursor =>
                {
                    var cursoredParameters = new GetBlockedUserIdsParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return _userQueryExecutor.GetBlockedUserIdsAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public getBlockedUsersIterator(parameters: IGetBlockedUsersParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>(
                parameters.cursor,
                cursor =>
                {
                    var cursoredParameters = new GetBlockedUsersParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return _userQueryExecutor.GetBlockedUsersAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        // MUTE
        public getUserIdsWhoseRetweetsAreMutedAsync(parameters: IGetUserIdsWhoseRetweetsAreMutedParameters, request: ITwitterRequest):  Task<ITwitterResult<long[]>>
        {
            return _userQueryExecutor.GetUserIdsWhoseRetweetsAreMutedAsync(parameters, request);
        }

        public  getMutedUserIdsIterator(parameters: IGetMutedUserIdsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(
                parameters.cursor,
                cursor =>
                {
                    var cursoredParameters = new GetMutedUserIdsParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return _userQueryExecutor.GetMutedUserIdsAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public  getMutedUsersIterator(parameters: IGetMutedUsersParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>(
                parameters.cursor,
                cursor =>
                {
                    var cursoredParameters = new GetMutedUsersParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return _userQueryExecutor.GetMutedUsersAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public muteUserAsync(parameters: IMuteUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            return _userQueryExecutor.MuteUserAsync(parameters, request);
        }

        public  unmuteUserAsync(parameters: IUnmuteUserParameters, request: ITwitterRequest): Task<ITwitterResult<IUserDTO>>
        {
            return _userQueryExecutor.UnmuteUserAsync(parameters, request);
        }
    }
}
