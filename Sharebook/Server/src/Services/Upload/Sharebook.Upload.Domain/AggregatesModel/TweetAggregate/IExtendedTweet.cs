﻿
namespace Sharebook.Upload.Domain.AggregatesModel.TweetAggregate
{
    using Sharebook.Upload.Domain.AggregatesModel.PostAggregate.Entities;

    public interface IExtendedTweet
    {
        string Text { get; set; }

        string FullText { get; set; }

        int[] DisplayTextRange { get; set; }

        ITweetEntities LegacyEntities { get; set; }

        ITweetEntities ExtendedEntities { get; set; }
    }
}