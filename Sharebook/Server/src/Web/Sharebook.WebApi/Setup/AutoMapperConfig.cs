namespace Sharebook.Web.Api.Setup
{
    using AutoMapper.Configuration;

    using Sharebook.Services.Data.MappingProfiles;

    public static class AutoMapperConfigAdmin
    {
        public static void Configure(MapperConfigurationExpression config)
        {
            config.AllowNullCollections = false;

            config.AddProfile<UserProfile>();
            config.AddProfile<SettingsProfile>();
        }
    }
}
