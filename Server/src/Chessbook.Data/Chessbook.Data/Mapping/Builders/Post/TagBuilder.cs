using FluentMigrator.Builders.Create.Table;

using Nop.Data.Mapping.Builders;
using Chessbook.Core.Domain.Posts;

namespace Chessbook.Data.Mapping.Builders.Post
{
    public class TagBuilder : NopEntityBuilder<Tag>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table.WithColumn(nameof(Tag.Name)).AsString(400).NotNullable();
        }
    }
}
