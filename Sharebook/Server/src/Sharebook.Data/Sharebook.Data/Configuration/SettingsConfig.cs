namespace Sharebook.Data.Configuration
{
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    using Sharebook.Data.Configuration.System;
    using Sharebook.Data.Models;

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
