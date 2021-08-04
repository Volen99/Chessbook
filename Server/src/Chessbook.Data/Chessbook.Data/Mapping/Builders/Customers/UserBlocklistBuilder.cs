using Chessbook.Core.Domain.Customers;
using Chessbook.Data.Models;
using FluentMigrator.Builders.Create.Table;
using Nop.Data.Mapping.Builders;
using Nop.Data.Extensions;
using System.Data;

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
