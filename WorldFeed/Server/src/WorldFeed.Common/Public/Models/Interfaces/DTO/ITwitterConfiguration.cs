namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    using System.Collections.Generic;

    using WorldFeed.Common.Public.Models.Entities;

    public interface ITwitterConfiguration
    {
        int CharactersReservedPerMedia { get; }

        int MessageTextCharacterLimit { get; }
        
        int MaxMediaPerUpload { get; }
        
        string[] NonUsernamePaths { get; }
        
        int PhotoSizeLimit { get; }

        Dictionary<string, IMediaEntitySize> PhotoSizes { get; }

        int ShortURLLength { get; }
        
        int ShortURLLengthHttps { get; }
    }
}
