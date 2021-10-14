using FluentMigrator.Builders.Create.Table;

using Chessbook.Data.Extensions;
using Chessbook.Data.Models;
using Chessbook.Core.Domain.Polls;

namespace Chessbook.Data.Mapping.Builders.Polls
{
    /// <summary>
    /// Represents a poll voting record entity builder
    /// </summary>
    public partial class PollVotingRecordBuilder : NopEntityBuilder<PollVotingRecord>
    {
        #region Methods

        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(PollVotingRecord.PollAnswerId)).AsInt32().ForeignKey<PollAnswer>()
                .WithColumn(nameof(PollVotingRecord.CustomerId)).AsInt32().ForeignKey<Customer>();
        }

        #endregion
    }
}
