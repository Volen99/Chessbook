using System.Data;
using FluentMigrator.Builders.Create.Table;

using Nop.Data.Mapping.Builders;
using Nop.Data.Extensions;
using Chessbook.Core.Domain.Notifications;
using Chessbook.Data.Models;

namespace Chessbook.Data.Mapping.Builders.Notifications
{
    public class UserNotificationModelBuilder : NopEntityBuilder<UserNotification>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(UserNotification.Type)).AsInt32()
                .WithColumn(nameof(UserNotification.UserId)).AsInt32().ForeignKey<Customer>().OnDelete(Rule.None)
                .WithColumn(nameof(UserNotification.PostId)).AsInt32().ForeignKey<Models.Post.Post>().OnDelete(Rule.None);
        }
    }
}
