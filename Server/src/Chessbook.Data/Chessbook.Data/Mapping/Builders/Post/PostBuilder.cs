using System.Data;
using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Mapping.Builders;
using Chessbook.Data.Extensions;
using Chessbook.Data.Models;

namespace Chessbook.Data.Mapping.Builders.Post
{
    public class PostBuilder : NopEntityBuilder<Core.Domain.Posts.Post>
    {
        #region Methods

        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                  .WithColumn(nameof(Core.Domain.Posts.Post.UserId)).AsInt32().ForeignKey<Customer>().OnDelete(Rule.None)
                  .WithColumn(nameof(Core.Domain.Posts.Post.RepostId)).AsInt32().Nullable().ForeignKey<Core.Domain.Posts.Post>().OnDelete(Rule.None);
        }

        #endregion
    }
}
