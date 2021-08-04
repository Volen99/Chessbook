using Chessbook.Common;
using Chessbook.Data.Models;
using FluentMigrator.Builders.Create.Table;
using Nop.Data.Mapping.Builders;
using Nop.Data.Extensions;
using System.Data;

namespace Chessbook.Data.Mapping.Builders.Abuse
{
    public class AbuseBuilder : NopEntityBuilder<Core.Domain.Abuse.Abuse>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(Core.Domain.Abuse.Abuse.Reason)).AsString(ChessbookConstants.CONSTRAINTS_FIELDS.ABUSES.REASON.Max).NotNullable()
                .WithColumn(nameof(Core.Domain.Abuse.Abuse.State)).AsInt32().NotNullable()
                .WithColumn(nameof(Core.Domain.Abuse.Abuse.ModerationComment)).AsString(ChessbookConstants.CONSTRAINTS_FIELDS.ABUSES.MODERATION_COMMENT.Max).Nullable()
                .WithColumn(nameof(Core.Domain.Abuse.Abuse.PredefinedReasons)).AsString().Nullable()
                .WithColumn(nameof(Core.Domain.Abuse.Abuse.ReporterAccountId)).AsInt32().Nullable().ForeignKey<Customer>().OnDelete(Rule.SetNull)
                .WithColumn(nameof(Core.Domain.Abuse.Abuse.FlaggedAccountId)).AsInt32().Nullable().ForeignKey<Customer>().OnDelete(Rule.None);
        }
    }
}
