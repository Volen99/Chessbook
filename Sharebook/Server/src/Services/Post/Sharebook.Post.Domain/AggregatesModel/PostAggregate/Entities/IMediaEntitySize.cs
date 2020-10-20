﻿namespace Sharebook.Post.Domain.AggregatesModel.PostAggregate.Entities
{
    /// <summary>
    /// Information related with a twitter media element size
    /// </summary>
    public interface IMediaEntitySize
    {
        /// <summary>
        /// Media Width
        /// </summary>
        int? Width { get; set; }

        /// <summary>
        /// Media Height
        /// </summary>
        int? Height { get; set; }

        /// <summary>
        /// How does the media has been resized
        /// </summary>
        string Resize { get; set; }
    }
}
