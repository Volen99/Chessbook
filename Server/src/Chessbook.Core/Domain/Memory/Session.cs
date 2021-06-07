namespace Chessbook.Data.Models.Memory
{
    using global::System;
    using Chessbook.Common;

    public class Session : BaseEntity
    {
        private static readonly long DEFAULT_TIMEOUT = 3600L;

        private bool failed = false;

        public Session(long mediaId, FileInformation fileInfo) : this(mediaId, fileInfo, DEFAULT_TIMEOUT)
        {

        }

        public Session(long mediaId, FileInformation fileInformation, long timeout)
        {
            this.MediaId = mediaId;
            this.CreatedDate = DateTime.Now;
            this.LastUpdate = this.CreatedDate;
            this.FileInfo = fileInformation;
            this.Timeout = timeout;
        }

        public long MediaId { get; private set; } // I am too dumb to believe that "long" will be needed in the future.. 13.11.2010

        public DateTime CreatedDate { get; private set; }

        public DateTime LastUpdate { get; private set; }

        public long Timeout { get; private set; }

        public double Progress
        {
            get
            {
                if (FileInfo.TotalNumberOfChunks == 0)
                    return 0;

                return SuccessfulChunks / (FileInfo.TotalNumberOfChunks * 1f);
            }
        }

        public string Status
        {
            get
            {
                if (failed)
                    return "failed";
                else if (IsConcluded)
                    return "done";

                return "ongoing";
            }
        }

        public bool IsConcluded
        {
            get
            {
                return FileInfo.TotalNumberOfChunks == FileInfo.AlreadyPersistedChunks.Count;
            }
        }


        public int SuccessfulChunks
        {
            get
            {
                return FileInfo.AlreadyPersistedChunks.Count;
            }
        }

        public bool HasFailed()
        {
            return failed;
        }

        public bool IsExpired
        {
            get
            {
                TimeSpan span = DateTime.Now - LastUpdate;
                return span.TotalSeconds >= Timeout;
            }
        }

        public void MaskAsFailed()
        {
            failed = true;
        }

        public FileInformation FileInfo
        {
            get; private set;
        }

        public void RenewTimeout()
        {
            LastUpdate = DateTime.Now;
        }
    }
}
