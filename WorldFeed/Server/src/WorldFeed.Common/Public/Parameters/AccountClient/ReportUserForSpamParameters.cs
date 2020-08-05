﻿namespace WorldFeed.Common.Public.Parameters.AccountClient
{
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// https://dev.twitter.com/en/docs/accounts-and-users/mute-block-report-users/api-reference/post-users-report_spam
    /// </summary>
    /// <inheritdoc />
    public interface IReportUserForSpamParameters : ICustomRequestParameters
    {
        /// <summary>
        /// The user you want to block
        /// </summary>
        IUserIdentifier User { get; set; }

        /// <summary>
        /// Whether you want to block the user in addition to report him
        /// </summary>
        bool? PerformBlock { get; set; }
    }

    /// <inheritdoc />
    public class ReportUserForSpamParameters : CustomRequestParameters, IReportUserForSpamParameters
    {
        public ReportUserForSpamParameters(IUserIdentifier user)
        {
            User = user;
        }

        public ReportUserForSpamParameters(string username)
            : this(new UserIdentifier(username))
        {
        }

        public ReportUserForSpamParameters(long userId) 
            : this(new UserIdentifier(userId))
        {
        }

        public ReportUserForSpamParameters(IReportUserForSpamParameters source) : base(source)
        {
            User = source?.User;
            PerformBlock = source?.PerformBlock;
        }

        /// <inheritdoc />
        public IUserIdentifier User { get; set; }
        /// <inheritdoc />
        public bool? PerformBlock { get; set; }
    }
}
