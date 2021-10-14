using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Extensions;
using Chessbook.Data.Models.Media;
using Chessbook.Core.Domain.Posts;

namespace Chessbook.Data.Mapping.Builders.Catalog
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
                .WithColumn(nameof(PostPicture.PostId)).AsInt32().ForeignKey<Chessbook.Core.Domain.Posts.Post>();
        }

        #endregion
    }
}
