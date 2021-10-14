﻿using FluentMigrator.Builders.Create.Table;

namespace Chessbook.Data.Mapping.Builders
{
    /// <summary>
    /// Represents database entity builder
    /// </summary>
    public interface IEntityBuilder
    {
        /// <summary>
        /// Apply entity configuration
        /// </summary>
        /// <param name="table">Create table expression builder</param>
        void MapEntity(CreateTableExpressionBuilder table);
    }
}
