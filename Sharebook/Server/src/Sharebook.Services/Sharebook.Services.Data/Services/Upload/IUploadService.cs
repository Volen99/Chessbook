namespace Sharebook.Services.Data.Services.Upload
{
    using System.Collections.Generic;
    using System.IO;

    using Sharebook.Data.Models.Memory;

    public interface IUploadService
    {
        public Session CreateSession(long mediaId, string fileName, long fileSize, string mediaType, string mediaCategory);

        public Session GetSession(long id);

        public List<Session> GetAllSessions();

        public void PersistBlock(long sessionId, int chunkNumber, byte[] buffer);

        public void WriteToStream(Stream stream, Session session);

        public void WriteToFileStream(FileStream stream, Session session);

        public Stream GetFileStream(Session session);

    }
}
