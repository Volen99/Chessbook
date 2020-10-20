﻿namespace Sharebook.Upload.DTO
{
    public interface ITweetTextParts
    {
        string Content { get; }

        string Prefix { get; }

        string[] Mentions { get; }
    }
}
