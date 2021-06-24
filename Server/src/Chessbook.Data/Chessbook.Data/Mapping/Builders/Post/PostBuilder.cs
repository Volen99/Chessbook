using Chessbook.Data.Models;
using FluentMigrator.Builders.Create.Table;
using Nop.Data.Mapping.Builders;
using System.Data;
using Nop.Data.Extensions;

namespace Chessbook.Data.Mapping.Builders.Post
{
    public class PostBuilder : NopEntityBuilder<Models.Post.Post>
    {
        #region Methods

        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                  .WithColumn(nameof(Models.Post.Post.UserId)).AsInt32().ForeignKey<Customer>().OnDelete(Rule.None);
        }

        #endregion
    }
}
