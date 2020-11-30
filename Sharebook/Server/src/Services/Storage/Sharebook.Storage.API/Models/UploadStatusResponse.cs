using System;
using System.Linq;
using System.Collections.Generic;
using Sharebook.Storage.API.Data;

namespace Sharebook.Storage.API.Models
{
    [Serializable]
    public class UploadStatusResponse
    {
        public static UploadStatusResponse fromSession(Session session)
        {
            return new UploadStatusResponse
            {
                ChunkSize = session.FileInfo.ChunkSize,
                FileName = session.FileInfo.Name,
                TotalNumberOfChunks = session.FileInfo.TotalNumberOfChunks,

                Concluded = session.IsConcluded,
                CreatedDate = session.CreatedDate.ToString(),
                Expired = session.IsExpired,

                LastUpdate = session.LastUpdate.ToString(),
                Progress = session.Progress,
                SuccessfulChunks = session.SuccessfulChunks,

                Id = session.MediaId,
                Status = session.Status
            };
        }

        public static List<UploadStatusResponse> fromSessionList(List<Session> sessions)
        {
            return sessions.Select(session => fromSession(session)).ToList();
        }

        public int ChunkSize { get; set; }

        public bool Concluded { get; set; }

        public string CreatedDate { get; set; }

        public bool Expired { get; set; }

        public string FileName { get; set; }

        public long Id { get; set; }

        public string LastUpdate { get; set; }
        public double Progress { get; set; }
        public string Status { get; set; }
        public int SuccessfulChunks { get; set; }
        public int TotalNumberOfChunks { get; set; }
        public long User { get; set; }
    }
}