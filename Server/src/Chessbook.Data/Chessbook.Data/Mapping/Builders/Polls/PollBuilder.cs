using Chessbook.Data.Models.Polls;
using FluentMigrator.Builders.Create.Table;
using Nop.Data.Extensions;

namespace Nop.Data.Mapping.Builders.Polls
{
    /// <summary>
    /// Represents a poll entity builder
    /// </summary>
    public partial class PollBuilder : NopEntityBuilder<Poll>
    {
        #region Methods

        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            //table
            //    .WithColumn(nameof(Poll.Name)).AsString(int.MaxValue).NotNullable();
        }

        #endregion
    }

}