using System.Data;
using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Extensions;
using Chessbook.Core.Domain.Notifications;
using Chessbook.Data.Models;

namespace Chessbook.Data.Mapping.Builders.Notifications
{
    public class UserNotificationSettingModelBuilder : NopEntityBuilder<UserNotificationSettingModel>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(UserNotificationSettingModel.AbuseAsModerator)).AsInt32()
                .WithColumn(nameof(UserNotificationSettingModel.AbuseNewMessage)).AsInt32()
                .WithColumn(nameof(UserNotificationSettingModel.AbuseStateChange)).AsInt32()
                .WithColumn(nameof(UserNotificationSettingModel.BlacklistOnMyVideo)).AsInt32()
                .WithColumn(nameof(UserNotificationSettingModel.CommentMention)).AsInt32()
                .WithColumn(nameof(UserNotificationSettingModel.NewCommentOnMyVideo)).AsInt32()
                .WithColumn(nameof(UserNotificationSettingModel.NewFollow)).AsInt32()
                .WithColumn(nameof(UserNotificationSettingModel.NewVideoFromSubscription)).AsInt32()
                .WithColumn(nameof(UserNotificationSettingModel.CustomerId)).AsInt32().ForeignKey<Customer>().OnDelete(Rule.Cascade);
        }
    }
}
