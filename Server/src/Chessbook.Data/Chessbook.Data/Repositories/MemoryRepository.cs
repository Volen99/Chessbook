namespace Chessbook.Data.Repositories
{
    using System;
    using System.Collections.Generic;

    public class MemoryRepository : FileRepository
    {
        private Dictionary<long, Dictionary<int, byte[]>> internalStorage;

        public MemoryRepository()
        {
            internalStorage = new Dictionary<long, Dictionary<int, byte[]>> ();
        }

        public override void Persist(long mediaId, int chunkNumber, byte[] buffer)
        {
		    if (!internalStorage.ContainsKey(mediaId)) {
			    internalStorage.Add(mediaId, new Dictionary<int, byte[]>());
            }

            Dictionary<int, byte[]> blocks = internalStorage[mediaId];
		    blocks.Add(chunkNumber, buffer);
        }

        public override byte[] Read(long mediaId, int chunkNumber)
        {
            if (!internalStorage.ContainsKey(mediaId)) {
                throw new Exception("Session not found on internalStorage");
            }

            return internalStorage[mediaId][chunkNumber];
        }
    }
}
