namespace WorldFeed.Book.Models
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using WorldFeed.Book.Application.Parameters.ListsClient;
    using WorldFeed.Book.Application.Parameters.ListsClient.Interfaces;
    using WorldFeed.Book.Application.Parameters.ListsClient.Members;
    using WorldFeed.Book.DTO;
    using WorldFeed.Common.Public.Models.Interfaces;

    public class TwitterList : ITwitterList
    {
        private ITwitterListDTO twitterListDTO;
        private IUser owner;

        public TwitterList(ITwitterListDTO twitterListDTO, ITwitterClient client)
        {
            // ! order is important, client should be at the top so that `UpdateOwner`
            // can use the client factories to create the owner user.
            Client = client;

            this.twitterListDTO = twitterListDTO;
            UpdateOwner();
        }

        public ITwitterListDTO TwitterListDTO
        {
            get => this.twitterListDTO;
            set
            {
                this.twitterListDTO = value;
                UpdateOwner();
            }
        }

        public ITwitterClient Client { get; }

        public long Id => this.twitterListDTO.Id;

        public string IdStr => this.twitterListDTO.IdStr;

        public string Slug => this.twitterListDTO.Slug;

        public long OwnerId => this.twitterListDTO.OwnerId;

        public string OwnerScreenName => this.twitterListDTO.OwnerScreenName;

        public string Name => this.twitterListDTO.Name;

        public string FullName => this.twitterListDTO.FullName;

        public IUser Owner => this.owner;

        public DateTime CreatedAt => this.twitterListDTO.CreatedAt;

        public string Uri => this.twitterListDTO.Uri;

        public string Description => this.twitterListDTO.Description;

        public bool Following => this.twitterListDTO.Following;

        public PrivacyMode PrivacyMode => this.twitterListDTO.PrivacyMode;

        public int MemberCount => this.twitterListDTO.MemberCount;

        public int SubscriberCount => this.twitterListDTO.SubscriberCount;

        public Task<ITweet[]> GetTweetsAsync()
        {
            return Client.Lists.GetTweetsFromListAsync(this);
        }

        // Members
        public Task<IUser[]> GetMembersAsync()
        {
            return Client.Lists.GetMembersOfListAsync(new GetMembersOfListParameters(this));
        }

        public Task AddMemberAsync(long userId)
        {
            return Client.Lists.AddMemberToListAsync(this, userId);
        }

        public Task AddMemberAsync(string username)
        {
            return Client.Lists.AddMemberToListAsync(this, username);
        }

        public Task AddMemberAsync(IUserIdentifier user)
        {
            return Client.Lists.AddMemberToListAsync(this, user);
        }

        public Task AddMembersAsync(IEnumerable<long> userIds)
        {
            return Client.Lists.AddMembersToListAsync(this, userIds);
        }

        public Task AddMembersAsync(IEnumerable<string> usernames)
        {
            return Client.Lists.AddMembersToListAsync(this, usernames);
        }

        public Task AddMembersAsync(IEnumerable<IUserIdentifier> users)
        {
            return Client.Lists.AddMembersToListAsync(this, users);
        }


        public Task<bool> RemoveMemberAsync(long userId)
        {
            return Client.Lists.CheckIfUserIsMemberOfListAsync(this, userId);
        }

        public Task<bool> RemoveMemberAsync(string username)
        {
            return Client.Lists.CheckIfUserIsMemberOfListAsync(this, username);
        }

        public Task<bool> RemoveMemberAsync(IUserIdentifier user)
        {
            return Client.Lists.CheckIfUserIsMemberOfListAsync(this, user);
        }

        public Task RemoveMembersAsync(IEnumerable<long> userIds)
        {
            return Client.Lists.RemoveMembersFromListAsync(this, userIds);
        }

        public Task RemoveMembersAsync(IEnumerable<string> usernames)
        {
            return Client.Lists.RemoveMembersFromListAsync(this, usernames);
        }

        public Task RemoveMembersAsync(IEnumerable<IUserIdentifier> users)
        {
            return Client.Lists.RemoveMembersFromListAsync(this, users);
        }


        public Task<bool> CheckUserMembershipAsync(long userId)
        {
            return Client.Lists.CheckIfUserIsMemberOfListAsync(this, userId);
        }

        public Task<bool> CheckUserMembershipAsync(string userScreenName)
        {
            return Client.Lists.CheckIfUserIsMemberOfListAsync(this, userScreenName);
        }

        public Task<bool> CheckUserMembershipAsync(IUserIdentifier user)
        {
            return Client.Lists.CheckIfUserIsMemberOfListAsync(this, user);
        }

        // Subscribers
        public Task<IUser[]> GetSubscribersAsync()
        {
            return Client.Lists.GetListSubscribersAsync(this);
        }

        public Task<ITwitterList> SubscribeAsync()
        {
            return Client.Lists.SubscribeToListAsync(this);
        }

        public Task<ITwitterList> UnsubscribeAsync()
        {
            return Client.Lists.UnsubscribeFromListAsync(this);
        }

        public Task<bool> CheckUserSubscriptionAsync(long userId)
        {
            return Client.Lists.CheckIfUserIsSubscriberOfListAsync(this, userId);
        }

        public Task<bool> CheckUserSubscriptionAsync(string username)
        {
            return Client.Lists.CheckIfUserIsSubscriberOfListAsync(this, username);
        }

        public Task<bool> CheckUserSubscriptionAsync(IUserIdentifier user)
        {
            return Client.Lists.CheckIfUserIsSubscriberOfListAsync(this, user);
        }

        public async Task UpdateAsync(IListMetadataParameters parameters)
        {
            var updateListParams = new UpdateListParameters(this)
            {
                Name = parameters?.Name,
                Description = parameters?.Description,
                PrivacyMode = parameters?.PrivacyMode
            };

            var updateList = await Client.Lists.UpdateListAsync(updateListParams).ConfigureAwait(false);

            if (updateList != null)
            {
                this.twitterListDTO = updateList.TwitterListDTO;
            }
        }

        public Task DestroyAsync()
        {
            return Client.Lists.DestroyListAsync(this);
        }

        private void UpdateOwner()
        {
            if (this.twitterListDTO != null)
            {
                this.owner = Client.Factories.CreateUser(this.twitterListDTO.Owner);
            }
        }
    }
}
