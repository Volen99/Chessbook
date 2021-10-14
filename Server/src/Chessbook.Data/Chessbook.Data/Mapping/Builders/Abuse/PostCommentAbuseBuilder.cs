using System.Data;
using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Extensions;
using Chessbook.Data.Mapping.Builders;
using Chessbook.Core.Domain.Posts;
using Chessbook.Core.Domain.Abuse;

namespace Chessbook.Data.Mapping.Builders.Abuse
{
    public class PostCommentAbuseBuilder : NopEntityBuilder<PostCommentAbuseModel>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(PostCommentAbuseModel.AbuseId)).AsInt32().NotNullable().ForeignKey<Core.Domain.Abuse.Abuse>().OnDelete(Rule.Cascade)
                .WithColumn(nameof(PostCommentAbuseModel.PostCommentId)).AsInt32().Nullable().ForeignKey<PostComment>().OnDelete(Rule.SetNull);

        }
    }
}
