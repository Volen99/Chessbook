using FluentMigrator;

using Chessbook.Core.Domain.Common;
using Chessbook.Core.Domain.Configuration;
using Chessbook.Core.Domain.Customers;
using Chessbook.Core.Domain.Directory;
using Chessbook.Core.Domain.Localization;
using Chessbook.Core.Domain.Logging;
using Chessbook.Core.Domain.Security;
using Chessbook.Core.Domain.Stores;
using Chessbook.Core.Domain.Tasks;
using Chessbook.Core.Domain.Abuse;
using Chessbook.Core.Domain.Notifications;
using Chessbook.Core.Domain.Posts;
using Chessbook.Core.Domain.Relationships;
using Chessbook.Data.Models;
using Chessbook.Data.Models.Comments;
using Chessbook.Data.Models.Contact;
using Chessbook.Data.Models.Media;
using Chessbook.Data.Models.Phone;
using Chessbook.Core.Domain.Tournaments;
using Chessbook.Core.Domain.Cards;
using Chessbook.Core.Domain.Polls;
using Chessbook.Core.Domain.Chat;
using Chessbook.Core.Domain.Messages;
using Chessbook.Core.Domain.Gdpr;
using Chessbook.Core.Domain.Videos;
using Chessbook.Core.Domain.Donations;

namespace Chessbook.Data.Migrations
{
    [SkipMigrationOnUpdate]
    [NopMigration("2020/01/31 11:24:16:2551771", "Nop.Data base schema")]
    public class SchemaMigration : AutoReversingMigration
    {
        private readonly IMigrationManager _migrationManager;

        public SchemaMigration(IMigrationManager migrationManager)
        {
            _migrationManager = migrationManager;
        }

        /// <summary>
        /// Collect the UP migration expressions
        /// <remarks>
        /// We use an explicit table creation order instead of an automatic one
        /// due to problems creating relationships between tables
        /// </remarks>
        /// </summary>
        public override void Up()
        {
            _migrationManager.BuildTable<GenericAttribute>(Create);
            _migrationManager.BuildTable<Country>(Create);
            _migrationManager.BuildTable<MeasureDimension>(Create);
            _migrationManager.BuildTable<MeasureWeight>(Create);
            _migrationManager.BuildTable<StateProvince>(Create);

            //_migrationManager.BuildTable<CustomerAttribute>(Create);
            //_migrationManager.BuildTable<CustomerAttributeValue>(Create);

            _migrationManager.BuildTable<Customer>(Create);
            _migrationManager.BuildTable<CustomerPassword>(Create);

            _migrationManager.BuildTable<CustomerRole>(Create);
            _migrationManager.BuildTable<CustomerCustomerRoleMapping>(Create);

            _migrationManager.BuildTable<Post>(Create);
            _migrationManager.BuildTable<Tag>(Create);
            _migrationManager.BuildTable<PostTag>(Create);

            _migrationManager.BuildTable<Store>(Create);
            _migrationManager.BuildTable<StoreMapping>(Create);

            _migrationManager.BuildTable<Language>(Create);
            _migrationManager.BuildTable<LocaleStringResource>(Create);
            // _migrationManager.BuildTable<LocalizedProperty>(Create);

            // _migrationManager.BuildTable<Download>(Create);
            _migrationManager.BuildTable<Picture>(Create);
            // _migrationManager.BuildTable<PictureBinary>(Create);


            _migrationManager.BuildTable<PostPicture>(Create);

            _migrationManager.BuildTable<Setting>(Create);

            _migrationManager.BuildTable<GdprConsent>(Create);
            _migrationManager.BuildTable<GdprLog>(Create);

            _migrationManager.BuildTable<ActivityLogType>(Create);
            _migrationManager.BuildTable<ActivityLog>(Create);
            _migrationManager.BuildTable<Log>(Create);

            _migrationManager.BuildTable<EmailAccount>(Create);
            _migrationManager.BuildTable<MessageTemplate>(Create);
            _migrationManager.BuildTable<QueuedEmail>(Create);

            _migrationManager.BuildTable<Poll>(Create);
            _migrationManager.BuildTable<PollAnswer>(Create);
            _migrationManager.BuildTable<PollVotingRecord>(Create);

            _migrationManager.BuildTable<AclRecord>(Create);
            _migrationManager.BuildTable<PermissionRecord>(Create);
            _migrationManager.BuildTable<PermissionRecordCustomerRoleMapping>(Create);

            _migrationManager.BuildTable<ScheduleTask>(Create);




            _migrationManager.BuildTable<Relationship>(Create);
            _migrationManager.BuildTable<UserFollow>(Create);
            //_migrationManager.BuildTable<MediaEntity>(Create);
            _migrationManager.BuildTable<PostVote>(Create);
            _migrationManager.BuildTable<Comment>(Create);
            _migrationManager.BuildTable<Contact>(Create);
            _migrationManager.BuildTable<PhoneCall>(Create);
            _migrationManager.BuildTable<ContactPhoto>(Create);
            _migrationManager.BuildTable<TwitchLoginName>(Create);
            _migrationManager.BuildTable<PostComment>(Create);
            _migrationManager.BuildTable<Settings>(Create);

            _migrationManager.BuildTable<Abuse>(Create);
            _migrationManager.BuildTable<PostCommentAbuseModel>(Create);
            _migrationManager.BuildTable<PostAbuseModel>(Create);

            _migrationManager.BuildTable<UserNotification>(Create);
            _migrationManager.BuildTable<UserNotificationSettingModel>(Create);

            _migrationManager.BuildTable<UserBlocklist>(Create);
            _migrationManager.BuildTable<Tournament>(Create);

            _migrationManager.BuildTable<PreviewCard>(Create);
            _migrationManager.BuildTable<PreviewCardPost>(Create);

            _migrationManager.BuildTable<PrivateMessage>(Create);
            _migrationManager.BuildTable<YoutubeVideo>(Create);

            _migrationManager.BuildTable<Donator>(Create);

        }
    }
}
