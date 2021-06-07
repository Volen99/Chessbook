namespace Chessbook.Services.Data.Services.Upload
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.IO;

    using Chessbook.Data.Common.Repositories;
    using Chessbook.Data.Models.Memory;
    using Chessbook.Data.Repositories;
    using Chessbook.Data.Models.Post.Entities;
    using Chessbook.Common;
    using System.Threading.Tasks;
    using Chessbook.Data;

    public class UploadService : IUploadService
    {
        private const int CHUNK_LIMIT = 1024 * 1024;

        private readonly IRepository<Session> votesRepository;

        private Dictionary<long, Session> sessions;
        private FileRepository fileStorage;

        public UploadService(FileRepository storage)
        {
            this.fileStorage = storage;
            sessions = new Dictionary<long, Session>();
        }

        public Session CreateSession(long mediaId, string fileName, long fileSize, string mediaType, string mediaCategory)
        {
            //if (string.IsNullOrWhiteSpace(fileName))
            //    throw new BadRequestException("File name missing");


            //if (chunkSize > CHUNK_LIMIT)
            //    throw new BadRequestException(string.Format("Maximum chunk size is {0} bytes", CHUNK_LIMIT));

            //if (chunkSize < 1)
            //    throw new BadRequestException("Chunk size must be greater than zero");

            if (fileSize < 1)
            {
                throw new ArgumentException("Total size must be greater than zero");
            }

            var session = new Session(mediaId, new FileInformation(fileName, fileSize, mediaType, mediaCategory, ChessbookLimits.UPLOAD_MAX_CHUNK_SIZE));
            sessions.Add(session.MediaId, session);

            return session;
        }

        public Session GetSession(long id)
        {
            return sessions[id];
        }

        public List<Session> GetAllSessions()
        {
            return sessions.Values.ToList();
        }

        public void PersistBlock(long sessionId, int chunkNumber, byte[] buffer)
        {
            Session session = GetSession(sessionId);
            try
            {
                if (session == null)
                {
                    throw new ArgumentException("Session not found");
                }

                fileStorage.Persist(sessionId, chunkNumber, buffer);

                session.FileInfo.MarkChunkAsPersisted(chunkNumber);
                session.RenewTimeout();
            }
            catch (Exception e)
            {
                if (session != null)
                {
                    session.MaskAsFailed();

                }

                throw e;
            }
        }

        public void WriteToStream(Stream stream, Session session)
        {
            fileStorage.WriteToStream(stream, session);
        }

        public void WriteToFileStream(FileStream stream, Session session)
        {
            fileStorage.WriteToFileStream(stream, session);
        }

        public Stream GetFileStream(Session session)
        {
            return fileStorage.GetFileStream(session);
        }
    }
}
