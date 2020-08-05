namespace WorldFeed.Common.Public.Models.Interfaces.DTO
{
    using System;

    using WorldFeed.Common.Public.Models.Enums;

    public interface ITwitterListDTO : ITwitterListIdentifier
    {
        string IdStr { get; set; }

        string Name { get; set; }
        string FullName { get; set; }

        IUserDTO Owner { get; set; }
        DateTime CreatedAt { get; set; }
        string Uri { get; set; }
        string Description { get; set; }
        bool Following { get; set; }
        PrivacyMode PrivacyMode { get; set; }

        int MemberCount { get; set; }        
        int SubscriberCount { get; set; }
    }
}
