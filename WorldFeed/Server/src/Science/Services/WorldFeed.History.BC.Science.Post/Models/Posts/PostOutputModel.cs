using AutoMapper;
using Microsoft.Extensions.Options;
using System;
using System.Collections;
using System.Collections.Generic;
using WorldFeed.Common.Services.Mapping;
using WorldFeed.History.BC.Science.Post.Models.Media;

namespace WorldFeed.History.BC.Science.Post.Models.Posts
{
    public class PostOutputModel : IMapFrom<Data.Models.Post>, IMapTo<Data.Models.Post>, IHaveCustomMappings
    {
        public string Id { get; set; }

        public string Text { get; set; }

        public DateTime CreatedOn { get; set; }

        public IEnumerable<MediaInitResponseModel> Media { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Data.Models.Post, PostOutputModel>()
                .ForMember(p => p.Text, options =>
                {
                    options.MapFrom(p => p.Text.Content); // TODO: might bug
                });
        }
    }
}
