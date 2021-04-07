namespace Chessbook.Data.Configuration
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Chessbook.Data.Configuration.System;
    using Chessbook.Data.Models;

    public class SettingsConfig : BaseEntityConfig<Settings>
    {
        public SettingsConfig() : base("Settings")
        { }

        public override void Configure(EntityTypeBuilder<Settings> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.ThemeName).IsRequired();
        }
    }
}
