using Chessbook.Core.Domain.Posts;
using Chessbook.Data.Models;
using FluentMigrator.Builders.Create.Table;
using Nop.Data.Mapping.Builders;
using static Chessbook.Common.ChessbookConstants;
using Nop.Data.Extensions;
using System.Data;

namespace Chessbook.Data.Mapping.Builders.Post
{
    public class PostCommentBuilder : NopEntityBuilder<PostComment>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(PostComment.Url)).AsString(CONSTRAINTS_FIELDS.POSTS.URL.Max).NotNullable()
                .WithColumn(nameof(PostComment.Text)).AsString(1000).NotNullable()
                .WithColumn(nameof(PostComment.PostId)).AsInt32().NotNullable().ForeignKey<Core.Domain.Posts.Post>().OnDelete(Rule.Cascade)
                .WithColumn(nameof(PostComment.OriginCommentId)).AsInt32().Nullable().ForeignKey<PostComment>().OnDelete(Rule.None)
                .WithColumn(nameof(PostComment.InReplyToCommentId)).AsInt32().Nullable().ForeignKey<PostComment>().OnDelete(Rule.None)
                .WithColumn(nameof(PostComment.UserId)).AsInt32().Nullable().ForeignKey<Customer>().OnDelete(Rule.Cascade);
        }
    }
}
