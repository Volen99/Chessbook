using System.Data;
using FluentMigrator.Builders.Create.Table;

using Nop.Data.Mapping.Builders;
using Nop.Data.Extensions;
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
                  .WithColumn(nameof(Core.Domain.Posts.Post.UserId)).AsInt32().ForeignKey<Customer>().OnDelete(Rule.None);
        }

        #endregion
    }
}
