using FluentMigrator;

using Chessbook.Data.Migrations;
using Chessbook.Data.Models;

namespace Nop.Data.Migrations
{
    [NopMigration("2022/02/07 12:00:00:2551770", "Customer. Add instagram property", UpdateMigrationType.Data)]
    public class InstagramProperty : AutoReversingMigration
    {
        /// <summary>Collect the UP migration expressions</summary>
        public override void Up()
        {
            Create.Column(nameof(Customer.InstagramLink))
            .OnTable(nameof(Customer))
            .AsString(255)
            .Nullable();
        }
    }
}
