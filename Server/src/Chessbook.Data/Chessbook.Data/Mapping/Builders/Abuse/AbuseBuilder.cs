using System.Data;
using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Mapping.Builders;
using Chessbook.Data.Extensions;
using Chessbook.Common;
using Chessbook.Data.Models;

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
