namespace Chessbook.Services.Data.MappingProfiles
{
    using AutoMapper;

    using Chessbook.Data.Models;
    using Chessbook.Web.Models;

    public class SettingsProfile : Profile
    {
        public SettingsProfile()
        {
            CreateMap<Settings, SettingsDTO>().ReverseMap();
        }
    }
}
