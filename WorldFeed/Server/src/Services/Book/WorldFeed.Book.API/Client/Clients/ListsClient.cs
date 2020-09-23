namespace WorldFeed.Book.Client.Clients
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using WorldFeed.Book.Application.Parameters.ListsClient;
    using WorldFeed.Book.Application.Parameters.ListsClient.Members;
    using WorldFeed.Book.Application.Parameters.ListsClient.Subscribers;
    using WorldFeed.Book.Client.Requesters;
    using WorldFeed.Book.DTO.QueryDTO.Cursor;
    using WorldFeed.Book.Models;
    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Exceptions.Public;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public.Iterators;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class ListsClient : IListsClient
    {
        private readonly ITwitterListsRequester twitterListsRequester;
        private readonly ITwitterClient client;

        public ListsClient(ITwitterListsRequester twitterListsRequester, ITwitterClient client)
        {
            this.twitterListsRequester = twitterListsRequester;
            this.client = client;
        }

        public ITwitterListsClientParametersValidator ParametersValidator => this.client.ParametersValidator;

        public Task<ITwitterList> CreateListAsync(string name)
        {
            return CreateListAsync(new CreateListParameters(name));
        }

        public Task<ITwitterList> CreateListAsync(string name, PrivacyMode privacyMode)
        {
            return CreateListAsync(new CreateListParameters(name)
            {
                PrivacyMode = privacyMode
            });
        }

        public async Task<ITwitterList> CreateListAsync(ICreateListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.CreateListAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateTwitterList(twitterResult?.Model);
        }

        public Task<ITwitterList> GetListAsync(long listId)
        {
            return GetListAsync(new GetListParameters(listId));
        }

        public Task<ITwitterList> GetListAsync(string slug, IUserIdentifier user)
        {
            return GetListAsync(new GetListParameters(slug, user));
        }

        public Task<ITwitterList> GetListAsync(ITwitterListIdentifier listId)
        {
            return GetListAsync(new GetListParameters(listId));
        }

        public async Task<ITwitterList> GetListAsync(IGetListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.GetListAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateTwitterList(twitterResult?.Model);
        }

        public Task<ITwitterList[]> GetListsSubscribedByAccountAsync()
        {
            return GetListsSubscribedByAccountAsync(new GetListsSubscribedByAccountParameters());
        }

        public Task<ITwitterList[]> GetListsSubscribedByAccountAsync(IGetListsSubscribedByAccountParameters parameters)
        {
            return GetListsSubscribedByUserAsync(new GetListsSubscribedByUserParameters(parameters));
        }

        public Task<ITwitterList[]> GetListsSubscribedByUserAsync(long userId)
        {
            return GetListsSubscribedByUserAsync(new GetListsSubscribedByUserParameters(userId));
        }

        public Task<ITwitterList[]> GetListsSubscribedByUserAsync(string username)
        {
            return GetListsSubscribedByUserAsync(new GetListsSubscribedByUserParameters(username));
        }

        public Task<ITwitterList[]> GetListsSubscribedByUserAsync(IUserIdentifier user)
        {
            return GetListsSubscribedByUserAsync(new GetListsSubscribedByUserParameters(user));
        }

        public async Task<ITwitterList[]> GetListsSubscribedByUserAsync(IGetListsSubscribedByUserParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.GetListsSubscribedByUserAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateTwitterLists(twitterResult?.Model);
        }

        public async Task<ITwitterList> UpdateListAsync(IUpdateListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.UpdateListAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateTwitterList(twitterResult?.Model);
        }

        public Task<ITwitterList> DestroyListAsync(long listId)
        {
            return DestroyListAsync(new DestroyListParameters(listId));
        }

        public Task<ITwitterList> DestroyListAsync(string slug, IUserIdentifier user)
        {
            return DestroyListAsync(new DestroyListParameters(slug, user));
        }

        public Task<ITwitterList> DestroyListAsync(ITwitterListIdentifier list)
        {
            return DestroyListAsync(new DestroyListParameters(list));
        }

        public async Task<ITwitterList> DestroyListAsync(IDestroyListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.DestroyListAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateTwitterList(twitterResult?.Model);
        }

        public Task<ITwitterList[]> GetListsOwnedByAccountAsync()
        {
            return GetListsOwnedByAccountAsync(new GetListsOwnedByAccountParameters());
        }

        public async Task<ITwitterList[]> GetListsOwnedByAccountAsync(IGetListsOwnedByAccountParameters parameters)
        {
            var iterator = GetListsOwnedByAccountIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<ITwitterList> GetListsOwnedByAccountIterator()
        {
            return GetListsOwnedByAccountIterator(new GetListsOwnedByAccountParameters());
        }

        public ITwitterIterator<ITwitterList> GetListsOwnedByAccountIterator(IGetListsOwnedByAccountParameters parameters)
        {
            return GetListsOwnedByUserIterator(new GetListsOwnedByAccountByUserParameters(parameters));
        }

        public Task<ITwitterList[]> GetListsOwnedByUserAsync(long userId)
        {
            return GetListsOwnedByUserAsync(new GetListsOwnedByAccountByUserParameters(userId));
        }

        public Task<ITwitterList[]> GetListsOwnedByUserAsync(string username)
        {
            return GetListsOwnedByUserAsync(new GetListsOwnedByAccountByUserParameters(username));
        }

        public Task<ITwitterList[]> GetListsOwnedByUserAsync(IUserIdentifier user)
        {
            return GetListsOwnedByUserAsync(new GetListsOwnedByAccountByUserParameters(user));
        }

        public async Task<ITwitterList[]> GetListsOwnedByUserAsync(IGetListsOwnedByUserParameters parameters)
        {
            var iterator = GetListsOwnedByUserIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<ITwitterList> GetListsOwnedByUserIterator(long userId)
        {
            return GetListsOwnedByUserIterator(new GetListsOwnedByAccountByUserParameters(userId));
        }

        public ITwitterIterator<ITwitterList> GetListsOwnedByUserIterator(string username)
        {
            return GetListsOwnedByUserIterator(new GetListsOwnedByAccountByUserParameters(username));
        }

        public ITwitterIterator<ITwitterList> GetListsOwnedByUserIterator(IUser user)
        {
            return GetListsOwnedByUserIterator(new GetListsOwnedByAccountByUserParameters(user));
        }

        public ITwitterIterator<ITwitterList> GetListsOwnedByUserIterator(IGetListsOwnedByUserParameters parameters)
        {
            var iterator = this.twitterListsRequester.GetListsOwnedByUserIterator(parameters);
            return new TwitterIteratorProxy<ITwitterResult<ITwitterListCursorQueryResultDTO>, ITwitterList>(iterator, pageResult =>
            {
                var listDtos = pageResult?.Model?.TwitterLists;
                return listDtos?.Select(dto => this.client.Factories.CreateTwitterList(dto)).ToArray();
            });
        }

        public Task<ITwitterList> AddMemberToListAsync(long listId, long userId)
        {
            return AddMemberToListAsync(new TwitterListIdentifier(listId), userId);
        }

        public Task<ITwitterList> AddMemberToListAsync(ITwitterListIdentifier list, long userId)
        {
            return AddMemberToListAsync(new AddMemberToListParameters(list, userId));
        }

        public Task<ITwitterList> AddMemberToListAsync(ITwitterListIdentifier list, string username)
        {
            return AddMemberToListAsync(new AddMemberToListParameters(list, username));
        }

        public Task<ITwitterList> AddMemberToListAsync(ITwitterListIdentifier list, IUserIdentifier user)
        {
            return AddMemberToListAsync(new AddMemberToListParameters(list, user));
        }

        public async Task<ITwitterList> AddMemberToListAsync(IAddMemberToListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.AddMemberToListAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Result;
        }

        public Task<ITwitterList> AddMembersToListAsync(long listId, IEnumerable<long> userIds)
        {
            return AddMembersToListAsync(new AddMembersToListParameters(listId, userIds));
        }

        public Task<ITwitterList> AddMembersToListAsync(long listId, IEnumerable<string> usernames)
        {
            return AddMembersToListAsync(new AddMembersToListParameters(listId, usernames));
        }

        public Task<ITwitterList> AddMembersToListAsync(long listId, IEnumerable<IUserIdentifier> users)
        {
            return AddMembersToListAsync(new AddMembersToListParameters(listId, users));
        }

        public Task<ITwitterList> AddMembersToListAsync(ITwitterListIdentifier list, IEnumerable<long> userIds)
        {
            return AddMembersToListAsync(new AddMembersToListParameters(list, userIds));
        }

        public Task<ITwitterList> AddMembersToListAsync(ITwitterListIdentifier list, IEnumerable<string> usernames)
        {
            return AddMembersToListAsync(new AddMembersToListParameters(list, usernames));
        }

        public Task<ITwitterList> AddMembersToListAsync(ITwitterListIdentifier list, IEnumerable<IUserIdentifier> users)
        {
            return AddMembersToListAsync(new AddMembersToListParameters(list, users));
        }

        public async Task<ITwitterList> AddMembersToListAsync(IAddMembersToListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.AddMembersToListAsync(parameters).ConfigureAwait(false);
            return twitterResult?.Result;
        }

        public Task<ITwitterList[]> GetAccountListMembershipsAsync()
        {
            return GetAccountListMembershipsAsync(new GetAccountListMembershipsParameters());
        }

        public async Task<ITwitterList[]> GetAccountListMembershipsAsync(IGetAccountListMembershipsParameters parameters)
        {
            var iterator = GetAccountListMembershipsIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<ITwitterList> GetAccountListMembershipsIterator()
        {
            return GetAccountListMembershipsIterator(new GetAccountListMembershipsParameters());
        }

        public ITwitterIterator<ITwitterList> GetAccountListMembershipsIterator(IGetAccountListMembershipsParameters parameters)
        {
            return GetUserListMembershipsIterator(new GetUserListMembershipsParameters(parameters));
        }

        public Task<ITwitterList[]> GetUserListMembershipsAsync(long userId)
        {
            return GetUserListMembershipsAsync(new GetUserListMembershipsParameters(userId));
        }

        public Task<ITwitterList[]> GetUserListMembershipsAsync(string username)
        {
            return GetUserListMembershipsAsync(new GetUserListMembershipsParameters(username));
        }

        public Task<ITwitterList[]> GetUserListMembershipsAsync(IUserIdentifier user)
        {
            return GetUserListMembershipsAsync(new GetUserListMembershipsParameters(user));
        }

        public async Task<ITwitterList[]> GetUserListMembershipsAsync(IGetUserListMembershipsParameters parameters)
        {
            var iterator = GetUserListMembershipsIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<ITwitterList> GetUserListMembershipsIterator(long userId)
        {
            return GetUserListMembershipsIterator(new GetUserListMembershipsParameters(userId));
        }

        public ITwitterIterator<ITwitterList> GetUserListMembershipsIterator(string username)
        {
            return GetUserListMembershipsIterator(new GetUserListMembershipsParameters(username));
        }

        public ITwitterIterator<ITwitterList> GetUserListMembershipsIterator(IUserIdentifier user)
        {
            return GetUserListMembershipsIterator(new GetUserListMembershipsParameters(user));
        }

        public ITwitterIterator<ITwitterList> GetUserListMembershipsIterator(IGetUserListMembershipsParameters parameters)
        {
            var iterator = this.twitterListsRequester.GetUserListMembershipsIterator(parameters);
            return new TwitterIteratorProxy<ITwitterResult<ITwitterListCursorQueryResultDTO>, ITwitterList>(iterator, pageResult =>
            {
                var listDtos = pageResult.Model.TwitterLists;
                return listDtos?.Select(dto => this.client.Factories.CreateTwitterList(dto)).ToArray();
            });
        }

        public Task<IUser[]> GetMembersOfListAsync(long listId)
        {
            return GetMembersOfListAsync(new GetMembersOfListParameters(listId));
        }

        public Task<IUser[]> GetMembersOfListAsync(ITwitterListIdentifier list)
        {
            return GetMembersOfListAsync(new GetMembersOfListParameters(list));
        }

        public async Task<IUser[]> GetMembersOfListAsync(IGetMembersOfListParameters parameters)
        {
            var iterator = GetMembersOfListIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<IUser> GetMembersOfListIterator(long listId)
        {
            return GetMembersOfListIterator(new GetMembersOfListParameters(listId));
        }

        public ITwitterIterator<IUser> GetMembersOfListIterator(ITwitterListIdentifier list)
        {
            return GetMembersOfListIterator(new GetMembersOfListParameters(list));
        }

        public ITwitterIterator<IUser> GetMembersOfListIterator(IGetMembersOfListParameters parameters)
        {
            var iterator = this.twitterListsRequester.GetMembersOfListIterator(parameters);
            return new TwitterIteratorProxy<ITwitterResult<IUserCursorQueryResultDTO>, IUser>(iterator, pageResult =>
            {
                return this.client.Factories.CreateUsers(pageResult?.Model?.Users);
            });
        }

        public Task<bool> CheckIfUserIsMemberOfListAsync(long listId, long userId)
        {
            return CheckIfUserIsMemberOfListAsync(new CheckIfUserIsMemberOfListParameters(listId, userId));
        }

        public Task<bool> CheckIfUserIsMemberOfListAsync(long listId, string username)
        {
            return CheckIfUserIsMemberOfListAsync(new CheckIfUserIsMemberOfListParameters(listId, username));
        }

        public Task<bool> CheckIfUserIsMemberOfListAsync(long listId, IUserIdentifier user)
        {
            return CheckIfUserIsMemberOfListAsync(new CheckIfUserIsMemberOfListParameters(listId, user));
        }

        public Task<bool> CheckIfUserIsMemberOfListAsync(ITwitterListIdentifier list, long userId)
        {
            return CheckIfUserIsMemberOfListAsync(new CheckIfUserIsMemberOfListParameters(list, userId));
        }

        public Task<bool> CheckIfUserIsMemberOfListAsync(ITwitterListIdentifier list, string username)
        {
            return CheckIfUserIsMemberOfListAsync(new CheckIfUserIsMemberOfListParameters(list, username));
        }

        public Task<bool> CheckIfUserIsMemberOfListAsync(ITwitterListIdentifier list, IUserIdentifier user)
        {
            return CheckIfUserIsMemberOfListAsync(new CheckIfUserIsMemberOfListParameters(list, user));
        }

        public async Task<bool> CheckIfUserIsMemberOfListAsync(ICheckIfUserIsMemberOfListParameters parameters)
        {
            try
            {
                await this.twitterListsRequester.CheckIfUserIsAListMemberAsync(parameters).ConfigureAwait(false);
                return true;
            }
            catch (TwitterException e)
            {
                if (e.StatusCode == 404)
                {
                    // This is a special case where the request actually throws expectedly
                    // When a user is not a member of a list this operation returns a 404.
                    return false;
                }

                throw;
            }
        }

        public Task<ITwitterList> RemoveMemberFromListAsync(long listId, long userId)
        {
            return RemoveMemberFromListAsync(new RemoveMemberFromListParameters(listId, userId));
        }

        public Task<ITwitterList> RemoveMemberFromListAsync(long listId, string username)
        {
            return RemoveMemberFromListAsync(new RemoveMemberFromListParameters(listId, username));
        }

        public Task<ITwitterList> RemoveMemberFromListAsync(long listId, IUserIdentifier user)
        {
            return RemoveMemberFromListAsync(new RemoveMemberFromListParameters(listId, user));
        }

        public Task<ITwitterList> RemoveMemberFromListAsync(ITwitterListIdentifier list, long userId)
        {
            return RemoveMemberFromListAsync(new RemoveMemberFromListParameters(list, userId));
        }

        public Task<ITwitterList> RemoveMemberFromListAsync(ITwitterListIdentifier list, string username)
        {
            return RemoveMemberFromListAsync(new RemoveMemberFromListParameters(list, username));
        }

        public Task<ITwitterList> RemoveMemberFromListAsync(ITwitterListIdentifier list, IUserIdentifier user)
        {
            return RemoveMemberFromListAsync(new RemoveMemberFromListParameters(list, user));
        }

        public async Task<ITwitterList> RemoveMemberFromListAsync(IRemoveMemberFromListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.RemoveMemberFromListAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateTwitterList(twitterResult?.Model);
        }

        public Task<ITwitterList> RemoveMembersFromListAsync(long listId, IEnumerable<long> userIds)
        {
            return RemoveMembersFromListAsync(new RemoveMembersFromListParameters(listId, userIds));
        }

        public Task<ITwitterList> RemoveMembersFromListAsync(long listId, IEnumerable<string> usernames)
        {
            return RemoveMembersFromListAsync(new RemoveMembersFromListParameters(listId, usernames));
        }

        public Task<ITwitterList> RemoveMembersFromListAsync(long listId, IEnumerable<IUserIdentifier> users)
        {
            return RemoveMembersFromListAsync(new RemoveMembersFromListParameters(listId, users));
        }

        public Task<ITwitterList> RemoveMembersFromListAsync(ITwitterListIdentifier list, IEnumerable<long> userIds)
        {
            return RemoveMembersFromListAsync(new RemoveMembersFromListParameters(list, userIds));
        }

        public Task<ITwitterList> RemoveMembersFromListAsync(ITwitterListIdentifier list, IEnumerable<string> usernames)
        {
            return RemoveMembersFromListAsync(new RemoveMembersFromListParameters(list, usernames));
        }

        public Task<ITwitterList> RemoveMembersFromListAsync(ITwitterListIdentifier list, IEnumerable<IUserIdentifier> users)
        {
            return RemoveMembersFromListAsync(new RemoveMembersFromListParameters(list, users));
        }

        public async Task<ITwitterList> RemoveMembersFromListAsync(IRemoveMembersFromListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.RemoveMembersFromListAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateTwitterList(twitterResult?.Model);
        }

        // ***********
        // SUBSCRIBERS
        // ***********

        public Task<ITwitterList> SubscribeToListAsync(long listId)
        {
            return SubscribeToListAsync(new SubscribeToListParameters(listId));
        }

        public Task<ITwitterList> SubscribeToListAsync(ITwitterListIdentifier list)
        {
            return SubscribeToListAsync(new SubscribeToListParameters(list));
        }

        public async Task<ITwitterList> SubscribeToListAsync(ISubscribeToListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.SubscribeToListAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateTwitterList(twitterResult?.Model);
        }

        public Task<ITwitterList> UnsubscribeFromListAsync(long listId)
        {
            return UnsubscribeFromListAsync(new UnsubscribeFromListParameters(listId));
        }

        public Task<ITwitterList> UnsubscribeFromListAsync(ITwitterListIdentifier list)
        {
            return UnsubscribeFromListAsync(new UnsubscribeFromListParameters(list));
        }

        public async Task<ITwitterList> UnsubscribeFromListAsync(IUnsubscribeFromListParameters parameters)
        {
            var twitterResult = await this.twitterListsRequester.UnsubscribeFromListAsync(parameters).ConfigureAwait(false);
            return this.client.Factories.CreateTwitterList(twitterResult?.Model);
        }

        public Task<IUser[]> GetListSubscribersAsync(long listId)
        {
            return GetListSubscribersAsync(new GetListSubscribersParameters(listId));
        }

        public Task<IUser[]> GetListSubscribersAsync(ITwitterListIdentifier list)
        {
            return GetListSubscribersAsync(new GetListSubscribersParameters(list));
        }

        public async Task<IUser[]> GetListSubscribersAsync(IGetListSubscribersParameters parameters)
        {
            var iterator = GetListSubscribersIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<IUser> GetListSubscribersIterator(long listId)
        {
            return GetListSubscribersIterator(new GetListSubscribersParameters(listId));
        }

        public ITwitterIterator<IUser> GetListSubscribersIterator(ITwitterListIdentifier list)
        {
            return GetListSubscribersIterator(new GetListSubscribersParameters(list));
        }

        public ITwitterIterator<IUser> GetListSubscribersIterator(IGetListSubscribersParameters parameters)
        {
            var pageIterator = this.twitterListsRequester.GetListSubscribersIterator(parameters);
            return new TwitterIteratorProxy<ITwitterResult<IUserCursorQueryResultDTO>, IUser>(pageIterator, pageResult =>
            {
                return this.client.Factories.CreateUsers(pageResult?.Model?.Users);
            });
        }

        public ITwitterIterator<ITwitterList> GetAccountListSubscriptionsIterator(IGetAccountListSubscriptionsParameters parameters)
        {
            return GetUserListSubscriptionsIterator(new GetUserListSubscriptionsParameters(parameters));
        }

        public Task<ITwitterList[]> GetUserListSubscriptionsAsync(long userId)
        {
            return GetUserListSubscriptionsAsync(new GetUserListSubscriptionsParameters(userId));
        }

        public Task<ITwitterList[]> GetUserListSubscriptionsAsync(string username)
        {
            return GetUserListSubscriptionsAsync(new GetUserListSubscriptionsParameters(username));
        }

        public Task<ITwitterList[]> GetUserListSubscriptionsAsync(IUserIdentifier user)
        {
            return GetUserListSubscriptionsAsync(new GetUserListSubscriptionsParameters(user));
        }

        public async Task<ITwitterList[]> GetUserListSubscriptionsAsync(IGetUserListSubscriptionsParameters parameters)
        {
            var iterator = GetUserListSubscriptionsIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<ITwitterList> GetUserListSubscriptionsIterator(long userId)
        {
            return GetUserListSubscriptionsIterator(new GetUserListSubscriptionsParameters(userId));
        }

        public ITwitterIterator<ITwitterList> GetUserListSubscriptionsIterator(string username)
        {
            return GetUserListSubscriptionsIterator(new GetUserListSubscriptionsParameters(username));
        }

        public ITwitterIterator<ITwitterList> GetUserListSubscriptionsIterator(IUserIdentifier user)
        {
            return GetUserListSubscriptionsIterator(new GetUserListSubscriptionsParameters(user));
        }

        public ITwitterIterator<ITwitterList> GetUserListSubscriptionsIterator(IGetUserListSubscriptionsParameters parameters)
        {
            var pageIterator = this.twitterListsRequester.GetUserListSubscriptionsIterator(parameters);
            return new TwitterIteratorProxy<ITwitterResult<ITwitterListCursorQueryResultDTO>, ITwitterList>(pageIterator, pageResult =>
            {
                var twitterListDtos = pageResult.Model.TwitterLists;
                return this.client.Factories.CreateTwitterLists(twitterListDtos);
            });
        }

        Task<bool> IListsClient.CheckIfUserIsSubscriberOfListAsync(long listId, long userId)
        {
            return CheckIfUserIsSubscriberOfListAsync(new CheckIfUserIsSubscriberOfListParameters(listId, userId));
        }

        public Task<bool> CheckIfUserIsSubscriberOfListAsync(long listId, string username)
        {
            return CheckIfUserIsSubscriberOfListAsync(new CheckIfUserIsSubscriberOfListParameters(listId, username));
        }

        public Task<bool> CheckIfUserIsSubscriberOfListAsync(long listId, IUserIdentifier user)
        {
            return CheckIfUserIsSubscriberOfListAsync(new CheckIfUserIsSubscriberOfListParameters(listId, user));
        }

        public Task<bool> CheckIfUserIsSubscriberOfListAsync(ITwitterListIdentifier list, long userId)
        {
            return CheckIfUserIsSubscriberOfListAsync(new CheckIfUserIsSubscriberOfListParameters(list, userId));
        }

        public Task<bool> CheckIfUserIsSubscriberOfListAsync(ITwitterListIdentifier list, string username)
        {
            return CheckIfUserIsSubscriberOfListAsync(new CheckIfUserIsSubscriberOfListParameters(list, username));
        }

        public Task<bool> CheckIfUserIsSubscriberOfListAsync(ITwitterListIdentifier list, IUserIdentifier user)
        {
            return CheckIfUserIsSubscriberOfListAsync(new CheckIfUserIsSubscriberOfListParameters(list, user));
        }

        public async Task<bool> CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters parameters)
        {
            try
            {
                await this.twitterListsRequester.CheckIfUserIsSubscriberOfListAsync(parameters).ConfigureAwait(false);
                return true;
            }
            catch (TwitterException e)
            {
                if (e.StatusCode == 404)
                {
                    // This is a special case where the request actually throws expectedly
                    // When a user is not a member of a list this operation returns a 404.
                    return false;
                }

                throw;
            }
        }

        // ***********
        // GET TWEETS
        // ***********

        public Task<ITweet[]> GetTweetsFromListAsync(long listId)
        {
            return GetTweetsFromListAsync(new GetTweetsFromListParameters(listId));
        }

        public Task<ITweet[]> GetTweetsFromListAsync(ITwitterListIdentifier list)
        {
            return GetTweetsFromListAsync(new GetTweetsFromListParameters(list));
        }

        public async Task<ITweet[]> GetTweetsFromListAsync(IGetTweetsFromListParameters parameters)
        {
            var iterator = GetTweetsFromListIterator(parameters);
            return (await iterator.NextPageAsync().ConfigureAwait(false)).ToArray();
        }

        public ITwitterIterator<ITweet, long?> GetTweetsFromListIterator(long listId)
        {
            return GetTweetsFromListIterator(new GetTweetsFromListParameters(listId));
        }

        public ITwitterIterator<ITweet, long?> GetTweetsFromListIterator(ITwitterListIdentifier list)
        {
            return GetTweetsFromListIterator(new GetTweetsFromListParameters(list));
        }

        public ITwitterIterator<ITweet, long?> GetTweetsFromListIterator(IGetTweetsFromListParameters parameters)
        {
            var pageIterator = this.twitterListsRequester.GetTweetsFromListIterator(parameters);
            return new TwitterIteratorProxy<ITwitterResult<ITweetDTO[]>, ITweet, long?>(pageIterator,
                twitterResult => this.client.Factories.CreateTweets(twitterResult?.Model));
        }
    }
}
