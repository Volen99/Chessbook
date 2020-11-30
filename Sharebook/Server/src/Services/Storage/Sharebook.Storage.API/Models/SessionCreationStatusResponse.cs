using System;
using Sharebook.Storage.API.Data;

namespace Sharebook.Storage.API.Models
{
    /// <summary>
    /// Status of a session creation
    /// </summary>
    [Serializable]
    public class SessionCreationStatusResponse
    {
        public SessionCreationStatusResponse() { }
        public static SessionCreationStatusResponse fromSession(Session session)
        {
            return new SessionCreationStatusResponse
            {
                SessionId = session.MediaId,
                FileName = session.FileInfo.Name
            };
        }

        /// <summary>
        /// File name
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// Session id
        /// </summary>
        public long SessionId { get; set; }
    }
}
