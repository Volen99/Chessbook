namespace Chessbook.Data.Models.Polls
{
    /// <summary>
    /// Represents a poll answer
    /// </summary>
    public partial class PollOption : BaseEntity
    {
        /// <summary>
        /// Gets or sets the poll identifier
        /// </summary>
        public int PollId { get; set; }

        /// <summary>
        /// Gets or sets the poll answer name
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// Gets or sets the current number of votes
        /// </summary>
        public int Votes { get; set; }

        /// <summary>
        /// Gets or sets the display order
        /// </summary>
        public int Position { get; set; }        
    }
}
