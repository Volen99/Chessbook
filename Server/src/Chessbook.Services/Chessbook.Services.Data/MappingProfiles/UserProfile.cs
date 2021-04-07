namespace Chessbook.Services.Data.MappingProfiles
{
    using AutoMapper;

    using Chessbook.Data.Models;
    using Chessbook.Web.Models;

    public class UserProfile : Profile
    {
        public UserProfile()
        {
            //CreateMap<User, UserDTO>()
            //    .ForMember(d => d.Address,
            //        opt => opt.MapFrom(src => new AddressDTO(src.AddressCity, src.AddressStreet, src.AddressZipCode,
            //            src.AddressLat, src.AddressLng)))
            //    .ReverseMap()
            //    .ForMember(d => d.AddressStreet, opt => opt.MapFrom(src => src.Address.Street))
            //    .ForMember(d => d.AddressCity, opt => opt.MapFrom(src => src.Address.City))
            //    .ForMember(d => d.AddressZipCode, opt => opt.MapFrom(src => src.Address.ZipCode))
            //    .ForMember(d => d.AddressLat, opt => opt.MapFrom(src => src.Address.Lat))
            //    .ForMember(d => d.AddressLng, opt => opt.MapFrom(src => src.Address.Lng));
        }
    }
}
