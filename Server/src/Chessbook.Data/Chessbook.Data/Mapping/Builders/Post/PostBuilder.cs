using FluentMigrator.Builders.Create.Table;
using Nop.Data.Mapping.Builders;

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
          
        }

        #endregion
    }
}
