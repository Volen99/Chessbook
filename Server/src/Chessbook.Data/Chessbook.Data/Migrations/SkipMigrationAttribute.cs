using System;

namespace Chessbook.Data.Migrations
{
    /// <summary>
    /// Attribute to exclude migration from the list
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, Inherited = false)]
    public class SkipMigrationAttribute : Attribute
    {
    }
}
