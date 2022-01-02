using System.Data;
using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Extensions;
using Chessbook.Data.Models;
using Chessbook.Core.Domain.Customers;

namespace Chessbook.Data.Mapping.Builders.Customers
{
    public class UserBlocklistBuilder : NopEntityBuilder<UserBlocklist>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(UserBlocklist.UserId)).AsInt32().NotNullable().ForeignKey<Customer>().OnDelete(Rule.Cascade)
                .WithColumn(nameof(UserBlocklist.TargetUserId)).AsInt32().NotNullable().ForeignKey<Customer>().OnDelete(Rule.None); // CASCADE!!
        }
    }
}
