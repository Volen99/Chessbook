using System.Data;
using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Extensions;
using Chessbook.Core.Domain.Posts;

namespace Chessbook.Data.Mapping.Builders.Forums
{
    /// <summary>
    /// Represents a forum post vote entity builder
    /// </summary>
    public partial class PostVoteBuilder : NopEntityBuilder<PostVote>
    {
        #region Methods

        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(PostVote.PostId)).AsInt32().NotNullable().ForeignKey<Chessbook.Core.Domain.Posts.Post>().OnDelete(Rule.Cascade)
                .WithColumn(nameof(PostVote.Type)).AsInt32().NotNullable();
        }

        #endregion
    }
}
