import {ITwitterListController} from "../../core/Core/Controllers/ITwitterListController";
import { TwitterRequest } from 'src/app/core/Public/TwitterRequest';
import { ITwitterResult } from 'src/app/core/Core/Web/TwitterResult';
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";

export class TwitterListController implements ITwitterListController
    {
        private readonly _twitterListQueryExecutor: ITwitterListQueryExecutor;
        private readonly _pageCursorIteratorFactories: IPageCursorIteratorFactories;

        constructor(twitterListQueryExecutor: ITwitterListQueryExecutor, pageCursorIteratorFactories: IPageCursorIteratorFactories)
        {
            this._twitterListQueryExecutor = twitterListQueryExecutor;
            this._pageCursorIteratorFactories = pageCursorIteratorFactories;
        }

        public createListAsync(parameters: ICreateListParameters, request: ITwitterRequest):  Task<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.CreateListAsync(parameters, request);
        }

        public  getListAsync(parameters: IGetListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.GetListAsync(parameters, request);
        }

        public  getListsSubscribedByUserAsync(parameters: IGetListsSubscribedByUserParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO[]>>
        {
            return this._twitterListQueryExecutor.GetListsSubscribedByUserAsync(parameters, request);
        }

        public  updateListAsync(parameters: IUpdateListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.UpdateListAsync(parameters, request);
        }

         ITwitterListController.destroyListAsync(parameters: IDestroyListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.DestroyListAsync(parameters, request);
        }

        public  getListsOwnedByUserIterator(parameters: IGetListsOwnedByUserParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>
        {
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetListsOwnedByAccountByUserParameters(parameters)
                {
                    Cursor = cursor
                };

                return this._twitterListQueryExecutor.GetListsOwnedByUserAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public addMemberToListAsync(parameters: IAddMemberToListParameters, request: ITwitterRequest):  Task<ITwitterResult<ITwitterListDTO>>
{
            return this._twitterListQueryExecutor.AddMemberToListAsync(parameters, request);
        }

        public addMembersToListAsync(parameters: IAddMembersToListParameters, request: ITwitterRequest):  Task<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.AddMembersToListAsync(parameters, request);
        }

        public  getUserListMembershipsIterator(parameters: IGetUserListMembershipsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>
        {
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetUserListMembershipsParameters(parameters)
                {
                    Cursor = cursor
                };

                return this._twitterListQueryExecutor.GetUserListMembershipsAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public getMembersOfListIterator(parameters: IGetMembersOfListParameters, request: ITwitterRequest):  ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>
        {
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetMembersOfListParameters(parameters)
                {
                    Cursor = cursor
                };

                return this._twitterListQueryExecutor.GetMembersOfListAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public checkIfUserIsAListMemberAsync(parameters: ICheckIfUserIsMemberOfListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>
{
            return this._twitterListQueryExecutor.CheckIfUserIsAListMemberAsync(parameters, request);
        }

        public removeMemberFromListAsync(parameters: IRemoveMemberFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>
{
            return this._twitterListQueryExecutor.RemoveMemberFromListAsync(parameters, request);
        }

        public removeMembersFromListAsync(parameters: IRemoveMembersFromListParameters, request: ITwitterRequest):  Task<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.RemoveMembersFromListAsync(parameters, request);
        }

        public subscribeToListAsync(parameters: ISubscribeToListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>
{
            return this._twitterListQueryExecutor.SubscribeToListAsync(parameters, request);
        }

        public unsubscribeFromListAsync(parameters: IUnsubscribeFromListParameters, request: ITwitterRequest): Task<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.UnsubscribeFromListAsync(parameters, request);
        }

        public getListSubscribersIterator(parameters: IGetListSubscribersParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>
{
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                var cursoredParameters = new GetListSubscribersParameters(parameters)
                {
                    Cursor = cursor
                };

                return this._twitterListQueryExecutor.GetListSubscribersAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public  getUserListSubscriptionsIterator(parameters: IGetUserListSubscriptionsParameters, request: ITwitterRequest): ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>>
        {
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                let cursoredParameters = new GetUserListSubscriptionsParameters(parameters)
                {
                    Cursor = cursor
                };

                return this._twitterListQueryExecutor.GetUserListSubscriptionsAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public checkIfUserIsSubscriberOfListAsync(parameters: ICheckIfUserIsSubscriberOfListParameters, request: ITwitterRequest):  Task<ITwitterResult<ITwitterListDTO>>
        {
            return this._twitterListQueryExecutor.CheckIfUserIsSubscriberOfListAsync(parameters, request);
        }

        public getTweetsFromListIterator(parameters: IGetTweetsFromListParameters, request: ITwitterRequest):  ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> // long?
{
            return this._pageCursorIteratorFactories.create(parameters, cursor =>
            {
                let cursoredParameters = new GetTweetsFromListParameters(parameters)
                {
                    MaxId = cursor
                };

                return this._twitterListQueryExecutor.GetTweetsFromListAsync(cursoredParameters, new TwitterRequest(request));
            });
        }
    }
}
