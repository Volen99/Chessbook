﻿namespace WorldFeed.Profile.Application.Parameters.UsersClient
{
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters;

    /// <summary>
    /// For more information visit : https://dev.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friendships-show
    /// </summary>
    /// <inheritdoc />
    public interface IGetRelationshipBetweenParameters : ICustomRequestParameters
    {
        /// <summary>
        /// User from whom to check the relationship
        /// </summary>
        IUserIdentifier SourceUser { get; set; }

        /// <summary>
        /// User to whom we want to check the relationship
        /// </summary>
        IUserIdentifier TargetUser { get; set; }
    }

    /// <inheritdoc />
    public class GetRelationshipBetweenParameters : CustomRequestParameters, IGetRelationshipBetweenParameters
    {
        public GetRelationshipBetweenParameters(long sourceUserId, long targetUser)
        {
            SourceUser = new UserIdentifier(sourceUserId);
            TargetUser = new UserIdentifier(targetUser);
        }

        public GetRelationshipBetweenParameters(long sourceUserId, string targetUser)
        {
            SourceUser = new UserIdentifier(sourceUserId);
            TargetUser = new UserIdentifier(targetUser);
        }

        public GetRelationshipBetweenParameters(long sourceUserId, IUserIdentifier targetUser)
        {
            SourceUser = new UserIdentifier(sourceUserId);
            TargetUser = targetUser;
        }

        public GetRelationshipBetweenParameters(string sourceUser, long targetUser)
        {
            SourceUser = new UserIdentifier(sourceUser);
            TargetUser = new UserIdentifier(targetUser);
        }

        public GetRelationshipBetweenParameters(string sourceUser, string targetUser)
        {
            SourceUser = new UserIdentifier(sourceUser);
            TargetUser = new UserIdentifier(targetUser);
        }

        public GetRelationshipBetweenParameters(string sourceUser, IUserIdentifier targetUser)
        {
            SourceUser = new UserIdentifier(sourceUser);
            TargetUser = targetUser;
        }

        public GetRelationshipBetweenParameters(IUserIdentifier sourceUser, long targetUser)
        {
            SourceUser = sourceUser;
            TargetUser = new UserIdentifier(targetUser);
        }

        public GetRelationshipBetweenParameters(IUserIdentifier sourceUser, string targetUser)
        {
            SourceUser = sourceUser;
            TargetUser = new UserIdentifier(targetUser);
        }

        public GetRelationshipBetweenParameters(IUserIdentifier sourceUser, IUserIdentifier targetUser)
        {
            SourceUser = sourceUser;
            TargetUser = targetUser;
        }

        public GetRelationshipBetweenParameters(IGetRelationshipBetweenParameters source) : base(source)
        {
            SourceUser = source?.SourceUser;
            TargetUser = source?.TargetUser;
        }

        /// <inheritdoc />
        public IUserIdentifier SourceUser { get; set; }
        /// <inheritdoc />
        public IUserIdentifier TargetUser { get; set; }
    }
}
