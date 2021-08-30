using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Models.Media;
using Nop.Data.Extensions;
using Chessbook.Core.Domain.Posts;

namespace Nop.Data.Mapping.Builders.Catalog
{
    /// <summary>
    /// Represents a product picture entity builder
    /// </summary>
    public partial class PostPictureBuilder : NopEntityBuilder<PostPicture>
    {
        #region Methods

        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(PostPicture.PictureId)).AsInt32().ForeignKey<Picture>()
                .WithColumn(nameof(PostPicture.PostId)).AsInt32().ForeignKey<Post>();
        }

        #endregion
    }
}
