namespace Sharebook.Storage.API.Service
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Collections.Generic;
    using MoreLinq.Extensions;

    using Sharebook.Storage.API.Data;
    using Sharebook.Storage.API.Exception;
    using Sharebook.Storage.API.Common;

    public class UploadService
    {
        private const int CHUNK_LIMIT = 1024 * 1024;

        private Dictionary<long, Session> sessions;
        private FileRepository fileStorage;

        public UploadService(FileRepository storage)
        {
            this.fileStorage = storage;
            sessions = new Dictionary<long, Session>();
        }

        public Session createSession(string fileName, long fileSize, string mediaType, string mediaCategory)
        {
            //if (string.IsNullOrWhiteSpace(fileName))
            //    throw new BadRequestException("File name missing");


            //if (chunkSize > CHUNK_LIMIT)
            //    throw new BadRequestException(string.Format("Maximum chunk size is {0} bytes", CHUNK_LIMIT));

            //if (chunkSize < 1)
            //    throw new BadRequestException("Chunk size must be greater than zero");

            if (fileSize < 1)
            {
                throw new BadRequestException("Total size must be greater than zero");
            }

            var session = new Session(new FileInformation(fileName, fileSize, mediaType, mediaCategory, StorageLimits.UPLOAD_MAX_CHUNK_SIZE));
            sessions.Add(session.MediaId, session);

            return session;
        }

        public Session getSession(long id)
        {
            return sessions[id];
        }

        public List<Session> getAllSessions()
        {
            return sessions.Values.ToList();
        }

        public void PersistBlock(long sessionId, int chunkNumber, byte[] buffer)
        {
            Session session = getSession(sessionId);
            try
            {
                if (session == null)
                {
                    throw new NotFoundException("Session not found");
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

        public void WriteToS3()
        {

        }

        public Stream GetFileStream(Session session)
        {
            return fileStorage.GetFileStream(session);
        }
    }
}
