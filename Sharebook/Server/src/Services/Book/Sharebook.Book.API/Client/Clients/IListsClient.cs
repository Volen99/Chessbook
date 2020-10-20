namespace Sharebook.Book.Client.Clients
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Sharebook.Book.Application.Parameters.ListsClient;
    using Sharebook.Book.Application.Parameters.ListsClient.Members;
    using Sharebook.Book.Application.Parameters.ListsClient.Subscribers;
    using Sharebook.Book.Models;
    using Sharebook.Common.Client.Validators;
    using Sharebook.Common.Public.Iterators;
    using Sharebook.Common.Public.Models.Interfaces;
   
    public interface IListsClient
    {
        /// <summary>
        /// Validate all the List client parameters
        /// </summary>
        ITwitterListsClientParametersValidator ParametersValidator { get; }

        /// <inheritdoc cref="IListsClient.CreateListAsync(ICreateListParameters)"/>
        Task<ITwitterList> CreateListAsync(string name);

        /// <inheritdoc cref="IListsClient.CreateListAsync(ICreateListParameters)"/>
        Task<ITwitterList> CreateListAsync(string name, PrivacyMode privacyMode);

        /// <summary>
        /// Create a list on Twitter
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-create </para>
        /// <returns>Created list</returns>
        Task<ITwitterList> CreateListAsync(ICreateListParameters parameters);

        /// <inheritdoc cref="IListsClient.GetListAsync(IGetListParameters)"/>
        Task<ITwitterList> GetListAsync(long listId);

        /// <inheritdoc cref="IListsClient.GetListAsync(IGetListParameters)"/>
        Task<ITwitterList> GetListAsync(string slug, IUserIdentifier user);

        /// <inheritdoc cref="IListsClient.GetListAsync(IGetListParameters)"/>
        Task<ITwitterList> GetListAsync(ITwitterListIdentifier listId);

        /// <summary>
        /// Get a specific list from Twitter
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-show </para>
        /// <returns>List requested</returns>
        Task<ITwitterList> GetListAsync(IGetListParameters parameters);

        /// <inheritdoc cref="IListsClient.GetListsSubscribedByAccountAsync(IGetListsSubscribedByAccountParameters)"/>
        Task<ITwitterList[]> GetListsSubscribedByAccountAsync();

        /// <summary>
        /// Get lists subscribed by the current account
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-list </para>
        /// <returns>Account user's lists</returns>
        Task<ITwitterList[]> GetListsSubscribedByAccountAsync(IGetListsSubscribedByAccountParameters parameters);

        /// <inheritdoc cref="IListsClient.GetListsSubscribedByUserAsync(IGetListsSubscribedByUserParameters)"/>
        Task<ITwitterList[]> GetListsSubscribedByUserAsync(long userId);
        /// <inheritdoc cref="IListsClient.GetListsSubscribedByUserAsync(IGetListsSubscribedByUserParameters)"/>
        Task<ITwitterList[]> GetListsSubscribedByUserAsync(string username);
        /// <inheritdoc cref="IListsClient.GetListsSubscribedByUserAsync(IGetListsSubscribedByUserParameters)"/>
        Task<ITwitterList[]> GetListsSubscribedByUserAsync(IUserIdentifier user);

        /// <summary>
        /// Get lists subscribed by a specific user
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-list </para>
        /// <returns>User's lists</returns>
        Task<ITwitterList[]> GetListsSubscribedByUserAsync(IGetListsSubscribedByUserParameters parameters);

        /// <summary>
        /// Update information of a Twitter list
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-update </para>
        /// <returns>Updated list</returns>
        Task<ITwitterList> UpdateListAsync(IUpdateListParameters parameters);

        /// <inheritdoc cref="IListsClient.DestroyListAsync(IDestroyListParameters)"/>
        Task<ITwitterList> DestroyListAsync(long listId);

        /// <inheritdoc cref="IListsClient.DestroyListAsync(IDestroyListParameters)"/>
        Task<ITwitterList> DestroyListAsync(string slug, IUserIdentifier user);

        /// <inheritdoc cref="IListsClient.DestroyListAsync(IDestroyListParameters)"/>
        Task<ITwitterList> DestroyListAsync(ITwitterListIdentifier listId);

        /// <summary>
        /// Destroy a list from Twitter
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-destroy </para>
        Task<ITwitterList> DestroyListAsync(IDestroyListParameters parameters);

        /// <inheritdoc cref="IListsClient.GetListsOwnedByAccountAsync(IGetListsOwnedByAccountParameters)"/>
        Task<ITwitterList[]> GetListsOwnedByAccountAsync();

        /// <summary>
        /// Get the lists owned by the account
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
        /// <returns>Lists owned by the account</returns>
        Task<ITwitterList[]> GetListsOwnedByAccountAsync(IGetListsOwnedByAccountParameters parameters);

        /// <inheritdoc cref="GetListsOwnedByAccountIterator(IGetListsOwnedByAccountParameters)"/>
        ITwitterIterator<ITwitterList> GetListsOwnedByAccountIterator();

        /// <summary>
        /// Get the lists owned by the account
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
        /// <returns>An iterator over the lists owned by the account</returns>
        ITwitterIterator<ITwitterList> GetListsOwnedByAccountIterator(IGetListsOwnedByAccountParameters parameters);

        /// <inheritdoc cref="IListsClient.GetListsOwnedByUserAsync(IGetListsOwnedByUserParameters)"/>
        Task<ITwitterList[]> GetListsOwnedByUserAsync(long userId);
        /// <inheritdoc cref="IListsClient.GetListsOwnedByUserAsync(IGetListsOwnedByUserParameters)"/>
        Task<ITwitterList[]> GetListsOwnedByUserAsync(string username);
        /// <inheritdoc cref="IListsClient.GetListsOwnedByUserAsync(IGetListsOwnedByUserParameters)"/>
        Task<ITwitterList[]> GetListsOwnedByUserAsync(IUserIdentifier user);

        /// <summary>
        /// Get the lists owned by a user
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
        /// <returns>Lists owned by a user</returns>
        Task<ITwitterList[]> GetListsOwnedByUserAsync(IGetListsOwnedByUserParameters parameters);

        /// <inheritdoc cref="GetListsOwnedByUserIterator(IGetListsOwnedByUserParameters)"/>
        ITwitterIterator<ITwitterList> GetListsOwnedByUserIterator(long userId);
        /// <inheritdoc cref="GetListsOwnedByUserIterator(IGetListsOwnedByUserParameters)"/>
        ITwitterIterator<ITwitterList> GetListsOwnedByUserIterator(string username);
        /// <inheritdoc cref="GetListsOwnedByUserIterator(IGetListsOwnedByUserParameters)"/>
        ITwitterIterator<ITwitterList> GetListsOwnedByUserIterator(IUser user);

        /// <summary>
        /// Get the lists owned by a user
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships </para>
        /// <returns>An iterator over the lists owned by the user</returns>
        ITwitterIterator<ITwitterList> GetListsOwnedByUserIterator(IGetListsOwnedByUserParameters parameters);

        // ***********
        // MEMBERSHIP
        // ***********

        /// <inheritdoc cref="IListsClient.AddMemberToListAsync(IAddMemberToListParameters)"/>
        Task<ITwitterList> AddMemberToListAsync(long listId, long userId);
        /// <inheritdoc cref="IListsClient.AddMemberToListAsync(IAddMemberToListParameters)"/>
        Task<ITwitterList> AddMemberToListAsync(ITwitterListIdentifier list, long userId);
        /// <inheritdoc cref="IListsClient.AddMemberToListAsync(IAddMemberToListParameters)"/>
        Task<ITwitterList> AddMemberToListAsync(ITwitterListIdentifier list, string username);
        /// <inheritdoc cref="IListsClient.AddMemberToListAsync(IAddMemberToListParameters)"/>
        Task<ITwitterList> AddMemberToListAsync(ITwitterListIdentifier list, IUserIdentifier user);

        /// <summary>
        /// Add a member to a twitter list
        /// </summary>
        /// <para> https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create </para>
        Task<ITwitterList> AddMemberToListAsync(IAddMemberToListParameters parameters);

        /// <inheritdoc cref="IListsClient.AddMembersToListAsync(IAddMembersToListParameters)"/>
        Task<ITwitterList> AddMembersToListAsync(long listId, IEnumerable<long> userIds);
        /// <inheritdoc cref="IListsClient.AddMembersToListAsync(IAddMembersToListParameters)"/>
        Task<ITwitterList> AddMembersToListAsync(long listId, IEnumerable<string> usernames);
        /// <inheritdoc cref="IListsClient.AddMembersToListAsync(IAddMembersToListParameters)"/>
        Task<ITwitterList> AddMembersToListAsync(long listId, IEnumerable<IUserIdentifier> users);
        /// <inheritdoc cref="IListsClient.AddMembersToListAsync(IAddMembersToListParameters)"/>
        Task<ITwitterList> AddMembersToListAsync(ITwitterListIdentifier list, IEnumerable<long> userIds);
        /// <inheritdoc cref="IListsClient.AddMembersToListAsync(IAddMembersToListParameters)"/>
        Task<ITwitterList> AddMembersToListAsync(ITwitterListIdentifier list, IEnumerable<string> usernames);
        /// <inheritdoc cref="IListsClient.AddMembersToListAsync(IAddMembersToListParameters)"/>
        Task<ITwitterList> AddMembersToListAsync(ITwitterListIdentifier list, IEnumerable<IUserIdentifier> users);

        /// <summary>
        /// Add multiple members to a list
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create_all </para>
        /// </summary>
        Task<ITwitterList> AddMembersToListAsync(IAddMembersToListParameters parameters);

        /// <inheritdoc cref="IListsClient.GetAccountListMembershipsAsync(IGetAccountListMembershipsParameters)"/>
        Task<ITwitterList[]> GetAccountListMembershipsAsync();

        /// <summary>
        /// Get the lists the account is member of
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
        /// </summary>
        /// <returns>Lists the account is member of</returns>
        Task<ITwitterList[]> GetAccountListMembershipsAsync(IGetAccountListMembershipsParameters parameters);

        /// <inheritdoc cref="GetAccountListMembershipsIterator(IGetAccountListMembershipsParameters)"/>
        ITwitterIterator<ITwitterList> GetAccountListMembershipsIterator();

        /// <summary>
        /// Get an iterator to retrieve all the lists the account is member of
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
        /// </summary>
        /// <returns>An iterator to retrieve all the lists the account is member of</returns>
        ITwitterIterator<ITwitterList> GetAccountListMembershipsIterator(IGetAccountListMembershipsParameters parameters);

        /// <inheritdoc cref="IListsClient.GetUserListMembershipsAsync(IGetUserListMembershipsParameters)"/>
        Task<ITwitterList[]> GetUserListMembershipsAsync(long userId);
        /// <inheritdoc cref="IListsClient.GetUserListMembershipsAsync(IGetUserListMembershipsParameters)"/>
        Task<ITwitterList[]> GetUserListMembershipsAsync(string username);
        /// <inheritdoc cref="IListsClient.GetUserListMembershipsAsync(IGetUserListMembershipsParameters)"/>
        Task<ITwitterList[]> GetUserListMembershipsAsync(IUserIdentifier user);

        /// <summary>
        /// Get an iterator to retrieve all the lists a user is member of
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
        /// </summary>
        /// <returns>Lists a user is member of</returns>
        Task<ITwitterList[]> GetUserListMembershipsAsync(IGetUserListMembershipsParameters parameters);

        /// <inheritdoc cref="GetUserListMembershipsIterator(IGetUserListMembershipsParameters)"/>
        ITwitterIterator<ITwitterList> GetUserListMembershipsIterator(long userId);
        /// <inheritdoc cref="GetUserListMembershipsIterator(IGetUserListMembershipsParameters)"/>
        ITwitterIterator<ITwitterList> GetUserListMembershipsIterator(string username);
        /// <inheritdoc cref="GetUserListMembershipsIterator(IGetUserListMembershipsParameters)"/>
        ITwitterIterator<ITwitterList> GetUserListMembershipsIterator(IUserIdentifier user);

        /// <summary>
        /// Get an iterator to retrieve all the lists a user is member of
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-memberships </para>
        /// </summary>
        /// <returns>An iterator to retrieve all the lists a user is member of</returns>
        ITwitterIterator<ITwitterList> GetUserListMembershipsIterator(IGetUserListMembershipsParameters parameters);

        /// <inheritdoc cref="IListsClient.GetMembersOfListAsync(IGetMembersOfListParameters)"/>
        Task<IUser[]> GetMembersOfListAsync(long listId);
        /// <inheritdoc cref="IListsClient.GetMembersOfListAsync(IGetMembersOfListParameters)"/>
        Task<IUser[]> GetMembersOfListAsync(ITwitterListIdentifier list);

        /// <summary>
        /// Get the members of the specified list.
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members </para>
        /// </summary>
        /// <returns>Members of the list</returns>
        Task<IUser[]> GetMembersOfListAsync(IGetMembersOfListParameters parameters);

        /// <inheritdoc cref="GetMembersOfListIterator(IGetMembersOfListParameters)"/>
        ITwitterIterator<IUser> GetMembersOfListIterator(long listId);
        /// <inheritdoc cref="GetMembersOfListIterator(IGetMembersOfListParameters)"/>
        ITwitterIterator<IUser> GetMembersOfListIterator(ITwitterListIdentifier list);

        /// <summary>
        /// Get the members of the specified list.
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members </para>
        /// </summary>
        /// <returns>An iterator to list the users members of the list</returns>
        ITwitterIterator<IUser> GetMembersOfListIterator(IGetMembersOfListParameters parameters);

        /// <inheritdoc cref="IListsClient.CheckIfUserIsMemberOfListAsync(ICheckIfUserIsMemberOfListParameters)"/>
        Task<bool> CheckIfUserIsMemberOfListAsync(long listId, long userId);
        /// <inheritdoc cref="IListsClient.CheckIfUserIsMemberOfListAsync(ICheckIfUserIsMemberOfListParameters)"/>
        Task<bool> CheckIfUserIsMemberOfListAsync(long listId, string username);
        /// <inheritdoc cref="IListsClient.CheckIfUserIsMemberOfListAsync(ICheckIfUserIsMemberOfListParameters)"/>
        Task<bool> CheckIfUserIsMemberOfListAsync(long listId, IUserIdentifier user);

        /// <inheritdoc cref="IListsClient.CheckIfUserIsMemberOfListAsync(ICheckIfUserIsMemberOfListParameters)"/>
        Task<bool> CheckIfUserIsMemberOfListAsync(ITwitterListIdentifier list, long userId);
        /// <inheritdoc cref="IListsClient.CheckIfUserIsMemberOfListAsync(ICheckIfUserIsMemberOfListParameters)"/>
        Task<bool> CheckIfUserIsMemberOfListAsync(ITwitterListIdentifier list, string username);
        /// <inheritdoc cref="IListsClient.CheckIfUserIsMemberOfListAsync(ICheckIfUserIsMemberOfListParameters)"/>
        Task<bool> CheckIfUserIsMemberOfListAsync(ITwitterListIdentifier list, IUserIdentifier user);

        /// <summary>
        /// Check if a user is a member of a list
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members-show </para>
        /// </summary>
        /// <returns>Returns whether the user is a member of a list</returns>
        Task<bool> CheckIfUserIsMemberOfListAsync(ICheckIfUserIsMemberOfListParameters parameters);

        /// <inheritdoc cref="IListsClient.RemoveMemberFromListAsync(IRemoveMemberFromListParameters)"/>
        Task<ITwitterList> RemoveMemberFromListAsync(long listId, long userId);
        /// <inheritdoc cref="IListsClient.RemoveMemberFromListAsync(IRemoveMemberFromListParameters)"/>
        Task<ITwitterList> RemoveMemberFromListAsync(long listId, string username);
        /// <inheritdoc cref="IListsClient.RemoveMemberFromListAsync(IRemoveMemberFromListParameters)"/>
        Task<ITwitterList> RemoveMemberFromListAsync(long listId, IUserIdentifier user);
        /// <inheritdoc cref="IListsClient.RemoveMemberFromListAsync(IRemoveMemberFromListParameters)"/>
        Task<ITwitterList> RemoveMemberFromListAsync(ITwitterListIdentifier list, long userId);
        /// <inheritdoc cref="IListsClient.RemoveMemberFromListAsync(IRemoveMemberFromListParameters)"/>
        Task<ITwitterList> RemoveMemberFromListAsync(ITwitterListIdentifier list, string username);
        /// <inheritdoc cref="IListsClient.RemoveMemberFromListAsync(IRemoveMemberFromListParameters)"/>
        Task<ITwitterList> RemoveMemberFromListAsync(ITwitterListIdentifier list, IUserIdentifier user);

        /// <summary>
        /// Remove a member from a list
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy </para>
        /// </summary>
        Task<ITwitterList> RemoveMemberFromListAsync(IRemoveMemberFromListParameters parameters);

        /// <inheritdoc cref="IListsClient.RemoveMembersFromListAsync(IRemoveMembersFromListParameters)"/>
        Task<ITwitterList> RemoveMembersFromListAsync(long listId, IEnumerable<long> userIds);
        /// <inheritdoc cref="IListsClient.RemoveMembersFromListAsync(IRemoveMembersFromListParameters)"/>
        Task<ITwitterList> RemoveMembersFromListAsync(long listId, IEnumerable<string> usernames);
        /// <inheritdoc cref="IListsClient.RemoveMembersFromListAsync(IRemoveMembersFromListParameters)"/>
        Task<ITwitterList> RemoveMembersFromListAsync(long listId, IEnumerable<IUserIdentifier> users);
        /// <inheritdoc cref="IListsClient.RemoveMembersFromListAsync(IRemoveMembersFromListParameters)"/>
        Task<ITwitterList> RemoveMembersFromListAsync(ITwitterListIdentifier list, IEnumerable<long> userIds);
        /// <inheritdoc cref="IListsClient.RemoveMembersFromListAsync(IRemoveMembersFromListParameters)"/>
        Task<ITwitterList> RemoveMembersFromListAsync(ITwitterListIdentifier list, IEnumerable<string> usernames);
        /// <inheritdoc cref="IListsClient.RemoveMembersFromListAsync(IRemoveMembersFromListParameters)"/>
        Task<ITwitterList> RemoveMembersFromListAsync(ITwitterListIdentifier list, IEnumerable<IUserIdentifier> users);

        /// <summary>
        /// Remove multiple members from a list
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-destroy_all </para>
        /// </summary>
        Task<ITwitterList> RemoveMembersFromListAsync(IRemoveMembersFromListParameters parameters);

        // ***********
        // SUBSCRIBERS
        // ***********

        /// <inheritdoc cref="IListsClient.SubscribeToListAsync(ITwitterListIdentifier)" />
        Task<ITwitterList> SubscribeToListAsync(long listId);
        /// <inheritdoc cref="IListsClient.SubscribeToListAsync(ITwitterListIdentifier)" />
        Task<ITwitterList> SubscribeToListAsync(ITwitterListIdentifier list);

        /// <summary>
        /// Subscribe the authenticated account to the specified list
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-create </para>
        /// </summary>
        /// <returns>The latest version of the list</returns>
        Task<ITwitterList> SubscribeToListAsync(ISubscribeToListParameters parameters);

        /// <inheritdoc cref="IListsClient.UnsubscribeFromListAsync(IUnsubscribeFromListParameters)" />
        Task<ITwitterList> UnsubscribeFromListAsync(long listId);
        /// <inheritdoc cref="IListsClient.UnsubscribeFromListAsync(IUnsubscribeFromListParameters)" />
        Task<ITwitterList> UnsubscribeFromListAsync(ITwitterListIdentifier list);

        /// <summary>
        /// Unsubscribe the authenticated account from the specified list
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-destroy </para>
        /// </summary>
        /// <returns>The latest version of the list</returns>
        Task<ITwitterList> UnsubscribeFromListAsync(IUnsubscribeFromListParameters parameters);

        /// <inheritdoc cref="IListsClient.GetListSubscribersAsync(ITwitterListIdentifier)" />
        Task<IUser[]> GetListSubscribersAsync(long listId);
        /// <inheritdoc cref="IListsClient.GetListSubscribersAsync(ITwitterListIdentifier)" />
        Task<IUser[]> GetListSubscribersAsync(ITwitterListIdentifier list);

        /// <summary>
        /// Returns the users subscribed to a list
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers </para>
        /// </summary>
        /// <returns>Subscribers of the list</returns>
        Task<IUser[]> GetListSubscribersAsync(IGetListSubscribersParameters parameters);

        /// <inheritdoc cref="GetListSubscribersIterator(ITwitterListIdentifier)" />
        ITwitterIterator<IUser> GetListSubscribersIterator(long listId);
        /// <inheritdoc cref="GetListSubscribersIterator(ITwitterListIdentifier)" />
        ITwitterIterator<IUser> GetListSubscribersIterator(ITwitterListIdentifier list);

        /// <summary>
        /// Returns the users subscribed to a list
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers </para>
        /// </summary>
        /// <returns>An iterator to get through the subscribers of the list</returns>
        ITwitterIterator<IUser> GetListSubscribersIterator(IGetListSubscribersParameters parameters);

        /// <summary>
        /// Returns the lists the account subscribed to
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions </para>
        /// </summary>
        /// <returns>An iterator the get though the lists the account subscribed to</returns>
        ITwitterIterator<ITwitterList> GetAccountListSubscriptionsIterator(IGetAccountListSubscriptionsParameters parameters);

        /// <inheritdoc cref="IListsClient.GetUserListSubscriptionsAsync(IGetUserListSubscriptionsParameters)" />
        Task<ITwitterList[]> GetUserListSubscriptionsAsync(long userId);
        /// <inheritdoc cref="IListsClient.GetUserListSubscriptionsAsync(IGetUserListSubscriptionsParameters)" />
        Task<ITwitterList[]> GetUserListSubscriptionsAsync(string username);
        /// <inheritdoc cref="IListsClient.GetUserListSubscriptionsAsync(IGetUserListSubscriptionsParameters)" />
        Task<ITwitterList[]> GetUserListSubscriptionsAsync(IUserIdentifier user);

        /// <summary>
        /// Returns the lists a user subscribed to
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions </para>
        /// </summary>
        /// <returns>Lists a user subscribed to</returns>
        Task<ITwitterList[]> GetUserListSubscriptionsAsync(IGetUserListSubscriptionsParameters parameters);

        /// <inheritdoc cref="GetUserListSubscriptionsIterator(IGetUserListSubscriptionsParameters)" />
        ITwitterIterator<ITwitterList> GetUserListSubscriptionsIterator(long userId);
        /// <inheritdoc cref="GetUserListSubscriptionsIterator(IGetUserListSubscriptionsParameters)" />
        ITwitterIterator<ITwitterList> GetUserListSubscriptionsIterator(string username);
        /// <inheritdoc cref="GetUserListSubscriptionsIterator(IGetUserListSubscriptionsParameters)" />
        ITwitterIterator<ITwitterList> GetUserListSubscriptionsIterator(IUserIdentifier user);

        /// <summary>
        /// Returns the lists a user subscribed to
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscriptions </para>
        /// </summary>
        /// <returns>An iterator the get though the lists a user subscribed to</returns>
        ITwitterIterator<ITwitterList> GetUserListSubscriptionsIterator(IGetUserListSubscriptionsParameters parameters);

        /// <inheritdoc cref="IListsClient.CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters)" />
        Task<bool> CheckIfUserIsSubscriberOfListAsync(long listId, long userId);
        /// <inheritdoc cref="IListsClient.CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters)" />
        Task<bool> CheckIfUserIsSubscriberOfListAsync(long listId, string username);
        /// <inheritdoc cref="IListsClient.CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters)" />
        Task<bool> CheckIfUserIsSubscriberOfListAsync(long listId, IUserIdentifier user);
        /// <inheritdoc cref="IListsClient.CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters)" />
        Task<bool> CheckIfUserIsSubscriberOfListAsync(ITwitterListIdentifier list, long userId);
        /// <inheritdoc cref="IListsClient.CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters)" />
        Task<bool> CheckIfUserIsSubscriberOfListAsync(ITwitterListIdentifier list, string username);
        /// <inheritdoc cref="IListsClient.CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters)" />
        Task<bool> CheckIfUserIsSubscriberOfListAsync(ITwitterListIdentifier list, IUserIdentifier user);

        /// <summary>
        /// Check if a user is a subscriber of a list
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-subscribers-show </para>
        /// </summary>
        /// <returns>Whether the user is a subscriber of the list</returns>
        Task<bool> CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters parameters);

        // ***********
        // TWEETS
        // ***********

        /// <inheritdoc cref="IListsClient.GetTweetsFromListAsync(IGetTweetsFromListParameters)" />
        Task<ITweet[]> GetTweetsFromListAsync(long listId);
        /// <inheritdoc cref="IListsClient.GetTweetsFromListAsync(IGetTweetsFromListParameters)" />
        Task<ITweet[]> GetTweetsFromListAsync(ITwitterListIdentifier list);

        /// <summary>
        /// Returns the tweets authored by the members of the list.
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-statuses </para>
        /// </summary>
        /// <returns>Tweets of a list</returns>
        Task<ITweet[]> GetTweetsFromListAsync(IGetTweetsFromListParameters parameters);

        /// <inheritdoc cref="GetTweetsFromListIterator(IGetTweetsFromListParameters)" />
        ITwitterIterator<ITweet, long?> GetTweetsFromListIterator(long listId);
        /// <inheritdoc cref="GetTweetsFromListIterator(IGetTweetsFromListParameters)" />
        ITwitterIterator<ITweet, long?> GetTweetsFromListIterator(ITwitterListIdentifier list);

        /// <summary>
        /// Returns the tweets authored by the members of the list.
        /// <para>Read more : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-statuses </para>
        /// </summary>
        /// <returns>An iterator to get through the tweets of a list</returns>
        ITwitterIterator<ITweet, long?> GetTweetsFromListIterator(IGetTweetsFromListParameters parameters);
    }
}
