﻿using System.Data;
using Chessbook.Data.Models;
using FluentMigrator.Builders.Create.Table;
using Nop.Core.Domain.Common;
using Nop.Core.Domain.Customers;
using Nop.Data.Extensions;

namespace Nop.Data.Mapping.Builders.Customers
{
    /// <summary>
    /// Represents a customer entity builder
    /// </summary>
    public partial class CustomerBuilder : NopEntityBuilder<Customer>
    {
        #region Methods

        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        public override void MapEntity(CreateTableExpressionBuilder table)
        {
            table
                .WithColumn(nameof(Customer.ScreenName)).AsString(1000).Nullable()
                .WithColumn(nameof(Customer.Email)).AsString(1000).Nullable()
                // .WithColumn(nameof(Customer.EmailToRevalidate)).AsString(1000).Nullable()
                .WithColumn(nameof(Customer.SystemName)).AsString(400).Nullable();
        }

        #endregion
    }
}
