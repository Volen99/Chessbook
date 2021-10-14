using FluentMigrator.Builders.Create.Table;

using Chessbook.Core.Domain.Customers;
using Chessbook.Data.Extensions;
using Chessbook.Data.Models;

namespace Chessbook.Data.Mapping.Builders.Customers
{
    /// <summary>
    /// Represents a customer password entity builder
    /// </summary>
    public partial class CustomerPasswordBuilder : NopEntityBuilder<CustomerPassword>
    {
        #region Methods

        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table.WithColumn(nameof(CustomerPassword.CustomerId)).AsInt32().ForeignKey<Customer>();
        }

        #endregion
    }
}
