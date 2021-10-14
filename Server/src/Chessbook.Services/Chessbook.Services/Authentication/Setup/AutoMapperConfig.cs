namespace Chessbook.Web.Api.Setup
{
    using AutoMapper.Configuration;

    using Chessbook.Services.Data.MappingProfiles;

    public static class AutoMapperConfigAdmin
    {
        public static void Configure(MapperConfigurationExpression config)
        {
            config.AllowNullCollections = false;

            config.AddProfile<SettingsProfile>();
        }
    }
}
