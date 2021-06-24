using System;
using FluentMigrator.Builders.Create.Table;

using Chessbook.Core.Domain.Relationships;
using Nop.Data.Mapping.Builders;
using static Chessbook.Common.ChessbookConstants;
using Nop.Data.Extensions;
using Chessbook.Data.Models;
using System.Data;

namespace Chessbook.Data.Mapping.Builders.Follow
{
    public class UserFollowBuilder : NopEntityBuilder<UserFollow>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(UserFollow.State)).AsInt32().NotNullable()
                .WithColumn(nameof(UserFollow.Score)).AsInt32().NotNullable().WithDefaultValue(USER_FOLLOW_SCORE.BASE)
                .WithColumn(nameof(UserFollow.UserId)).AsInt32().NotNullable().ForeignKey<Customer>().OnDelete(Rule.Cascade)
                .WithColumn(nameof(UserFollow.TargetUserId)).AsInt32().NotNullable().ForeignKey<Customer>().OnDelete(Rule.None); // Rule.None
        }
    }
}
