namespace Sharebook.Book.Client.Tools
{
    using System.Collections.Generic;

    using Sharebook.Book.DTO;
    using Sharebook.Book.Models;

    public interface ITwitterClientFactories
    {
        // LISTS

        /// <summary>
        /// Create TwitterList from json
        /// </summary>
        ITwitterList CreateTwitterList(string json);

        ITwitterList CreateTwitterList(ITwitterListDTO twitterListDTO);

        ITwitterList[] CreateTwitterLists(IEnumerable<ITwitterListDTO> listDTOs);
    }
}