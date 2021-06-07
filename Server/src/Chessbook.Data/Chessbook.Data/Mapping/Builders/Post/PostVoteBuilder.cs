using FluentMigrator.Builders.Create.Table;

using Nop.Data.Extensions;
using Chessbook.Data.Models.Post;

namespace Nop.Data.Mapping.Builders.Forums
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
                .WithColumn(nameof(PostVote.PostId)).AsInt32().ForeignKey<Post>();
        }

        #endregion
    }
}
