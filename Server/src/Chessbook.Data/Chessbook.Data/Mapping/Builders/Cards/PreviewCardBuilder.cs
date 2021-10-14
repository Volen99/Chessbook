using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Mapping.Builders;
using Chessbook.Core.Domain.Cards;

namespace Chessbook.Data.Mapping.Builders.Cards
{
    public class PreviewCardBuilder : NopEntityBuilder<PreviewCard>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(PreviewCard.Url)).AsString(400).NotNullable()
                .WithColumn(nameof(PreviewCard.Type)).AsInt32().NotNullable();
        }
    }
}
