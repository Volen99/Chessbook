using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Mapping;
using Chessbook.Data.Mapping.Builders;
using Chessbook.Data.Extensions;
using Chessbook.Core.Domain.Posts;

namespace Chessbook.Data.Mapping.Builders.Post
{
    public class PostTagMappingBuilder : NopEntityBuilder<PostTag>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(NameCompatibilityManager.GetColumnName(typeof(PostTag), nameof(PostTag.PostId)))                    // CASCADE
                    .AsInt32().PrimaryKey().ForeignKey<Core.Domain.Posts.Post>()
                .WithColumn(NameCompatibilityManager.GetColumnName(typeof(PostTag), nameof(PostTag.TagId)))
                    .AsInt32().PrimaryKey().ForeignKey<Tag>();
        }
    }
}
