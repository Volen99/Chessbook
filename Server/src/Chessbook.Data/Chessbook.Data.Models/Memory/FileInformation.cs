namespace Chessbook.Data.Models.Memory
{
    using global::System;
    using global::System.Collections.Generic;

    public class FileInformation
    {
        public FileInformation(string fileName, long fileSize, string mediaType, string mediaCategory, int chunkSize)
        {
            this.Name = fileName;
            this.Size = fileSize;
            this.MediaType = mediaType;
            this.MediaCategory = mediaCategory;
            this.ChunkSize = chunkSize;
        }

        public string Name { get; set; }

        public long Size { get; set; }

        public string Extension => "." + this.MediaType.Split('/')[1];

        public string MediaType { get; set; }

        public string MediaCategory { get; set; }

        public int ChunkSize { get; set; }

        public virtual ISet<int> AlreadyPersistedChunks { get; private set; } = new HashSet<int>();

        public virtual int TotalNumberOfChunks
        {
            get
            {
                return (int)Math.Ceiling(Size / (this.ChunkSize * 1F));
            }
        }

        public virtual void MarkChunkAsPersisted(int chunkNumber)
        {
            this.AlreadyPersistedChunks.Add(chunkNumber);
        }
    }
}
