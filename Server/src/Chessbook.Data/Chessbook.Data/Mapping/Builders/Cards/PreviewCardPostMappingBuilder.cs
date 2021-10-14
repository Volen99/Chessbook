using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Mapping;
using Chessbook.Data.Mapping.Builders;
using Chessbook.Data.Extensions;
using Chessbook.Core.Domain.Cards;

namespace Chessbook.Data.Mapping.Builders.Cards
{
    public class PreviewCardPostMappingBuilder : NopEntityBuilder<PreviewCardPost>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(NameCompatibilityManager.GetColumnName(typeof(PreviewCardPost), nameof(PreviewCardPost.PreviewCardId)))                    
                    .AsInt32().PrimaryKey().ForeignKey<PreviewCard>()
                .WithColumn(NameCompatibilityManager.GetColumnName(typeof(PreviewCardPost), nameof(PreviewCardPost.PostId)))
                    .AsInt32().PrimaryKey().ForeignKey<Core.Domain.Posts.Post>();
        }
    }
}
