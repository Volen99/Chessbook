using AutoMapper.Configuration.Annotations;
using WorldFeed.Common.Services.Mapping;

namespace WorldFeed.History.BC.Science.Post.Models.Media
{
    public class MediaOutputModel : IMapFrom<Data.Models.Media>, IMapTo<Data.Models.Media>
    {
        public string Id { get; set; }

        public long Size { get; set; }

        public string Path { get; set; }

        public string FileExtension { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }
    }
}
