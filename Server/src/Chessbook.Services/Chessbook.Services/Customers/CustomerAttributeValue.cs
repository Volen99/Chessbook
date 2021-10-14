using Chessbook.Data.Models;

namespace Chessbook.Services.Customers
{
    /// <summary>
    /// Represents a customer attribute value
    /// </summary>
    public partial class CustomerAttributeValue : BaseEntity
    {
        /// <summary>
        /// Gets or sets the customer attribute identifier
        /// </summary>
        public int CustomerAttributeId { get; set; }

        /// <summary>
        /// Gets or sets the checkout attribute name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the value is pre-selected
        /// </summary>
        public bool IsPreSelected { get; set; }

        /// <summary>
        /// Gets or sets the display order
        /// </summary>
        public int DisplayOrder { get; set; }
    }
}
