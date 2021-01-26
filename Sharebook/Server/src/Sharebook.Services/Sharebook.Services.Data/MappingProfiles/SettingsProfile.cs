namespace Sharebook.Services.Data.MappingProfiles
{
    using AutoMapper;

    using Sharebook.Data.Models;
    using Sharebook.Web.Models;

    public class SettingsProfile : Profile
    {
        public SettingsProfile()
        {
            CreateMap<Settings, SettingsDTO>().ReverseMap();
        }
    }
}
