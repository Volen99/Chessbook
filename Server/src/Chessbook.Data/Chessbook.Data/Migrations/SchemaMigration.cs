using Chessbook.Core.Domain.Notifications;
using Chessbook.Data.Models;
using Chessbook.Data.Models.Comments;
using Chessbook.Data.Models.Contact;
using Chessbook.Data.Models.Media;
using Chessbook.Data.Models.Phone;
using Chessbook.Data.Models.Polls;
using Chessbook.Data.Models.Post;
using Chessbook.Data.Models.Post.Entities;
using FluentMigrator;
using Nop.Core.Domain.Catalog;
using Nop.Core.Domain.Common;
using Nop.Core.Domain.Configuration;
using Nop.Core.Domain.Customers;
using Nop.Core.Domain.Directory;
using Nop.Core.Domain.Localization;
using Nop.Core.Domain.Logging;
using Nop.Core.Domain.Media;
using Nop.Core.Domain.Security;
using Nop.Core.Domain.Stores;
using Nop.Core.Domain.Tasks;

namespace Nop.Data.Migrations
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
            //_migrationManager.BuildTable<CustomerAddressMapping>(Create);

            _migrationManager.BuildTable<CustomerRole>(Create);
            _migrationManager.BuildTable<CustomerCustomerRoleMapping>(Create);

            _migrationManager.BuildTable<Post>(Create);

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

            //_migrationManager.BuildTable<Discount>(Create);

            //_migrationManager.BuildTable<DiscountCategoryMapping>(Create);
            //_migrationManager.BuildTable<DiscountProductMapping>(Create);
            //_migrationManager.BuildTable<DiscountRequirement>(Create);
            //_migrationManager.BuildTable<DiscountUsageHistory>(Create);
            //_migrationManager.BuildTable<DiscountManufacturerMapping>(Create);

            //_migrationManager.BuildTable<PrivateMessage>(Create);
            //_migrationManager.BuildTable<ForumGroup>(Create);
            //_migrationManager.BuildTable<Forum>(Create);
            //_migrationManager.BuildTable<ForumTopic>(Create);
            //_migrationManager.BuildTable<ForumPost>(Create);
            //_migrationManager.BuildTable<ForumPostVote>(Create);
            //_migrationManager.BuildTable<ForumSubscription>(Create);

            _migrationManager.BuildTable<ActivityLogType>(Create);
            _migrationManager.BuildTable<ActivityLog>(Create);
            _migrationManager.BuildTable<Log>(Create);

            _migrationManager.BuildTable<Poll>(Create);
            _migrationManager.BuildTable<PollAnswer>(Create);
            _migrationManager.BuildTable<PollVotingRecord>(Create);

            _migrationManager.BuildTable<AclRecord>(Create);
            _migrationManager.BuildTable<PermissionRecord>(Create);
            _migrationManager.BuildTable<PermissionRecordCustomerRoleMapping>(Create);

            _migrationManager.BuildTable<ScheduleTask>(Create);




            _migrationManager.BuildTable<Relationship>(Create);
            _migrationManager.BuildTable<MediaEntity>(Create);
            _migrationManager.BuildTable<MediaEntitySize>(Create);
            _migrationManager.BuildTable<HashtagEntity>(Create);
            _migrationManager.BuildTable<UrlEntity>(Create);
            _migrationManager.BuildTable<UserMentionEntity>(Create);
            _migrationManager.BuildTable<SymbolEntity>(Create);
            _migrationManager.BuildTable<Indices>(Create);
            _migrationManager.BuildTable<PostVote>(Create);
            _migrationManager.BuildTable<Comment>(Create);
            _migrationManager.BuildTable<Contact>(Create);
            _migrationManager.BuildTable<PhoneCall>(Create);
            _migrationManager.BuildTable<ContactPhoto>(Create);
            _migrationManager.BuildTable<TwitchLoginName>(Create);
            _migrationManager.BuildTable<PostReshare>(Create);
            _migrationManager.BuildTable<Settings>(Create);

            _migrationManager.BuildTable<UserNotification>(Create);
            _migrationManager.BuildTable<UserNotificationSettingModel>(Create);

        }
    }
}
