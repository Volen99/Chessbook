using System.Data;
using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Extensions;
using Chessbook.Core.Domain.Abuse;

namespace Chessbook.Data.Mapping.Builders.Abuse
{
    public class PostAbuseBuilder : NopEntityBuilder<PostAbuseModel>
    {
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(PostAbuseModel.AbuseId)).AsInt32().NotNullable().ForeignKey<Core.Domain.Abuse.Abuse>().OnDelete(Rule.Cascade)
                .WithColumn(nameof(PostAbuseModel.PostId)).AsInt32().Nullable().ForeignKey<Core.Domain.Posts.Post>().OnDelete(Rule.SetNull);
        }
    }
}
