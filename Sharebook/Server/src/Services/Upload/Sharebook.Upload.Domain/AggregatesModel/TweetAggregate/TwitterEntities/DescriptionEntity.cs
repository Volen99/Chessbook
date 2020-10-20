﻿namespace Sharebook.Upload.Domain.AggregatesModel.PostAggregate.TwitterEntities
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    using Sharebook.Upload.Domain.AggregatesModel.PostAggregate.Entities;

    public class DescriptionEntity : IDescriptionEntity
    {
        [JsonProperty("urls")]
        public IEnumerable<IUrlEntity> Urls { get; set; }
    }
}