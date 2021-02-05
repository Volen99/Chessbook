namespace Sharebook.Data.Repositories
{
    using System.IO;

    using Sharebook.Common.Infrastructure.Helpers;

    public class LocalFileSystemRepository : FileRepository
    {
        string ROOT = "./TempFiles";

        public async override void Persist(long mediaId, int chunkNumber, byte[] buffer)
        {
            string chunkDestinationPath = Path.Combine(ROOT, mediaId.ToString());

            if (!Directory.Exists(chunkDestinationPath))
            {
                DirectoryHelpers.CreateDirectory(chunkDestinationPath);
            }

            string path = Path.Combine(ROOT, mediaId.ToString(), chunkNumber.ToString()); // mediaId = 1, chunkNumber = 0
            await File.WriteAllBytesAsync(path, buffer);
        }

        public override byte[] Read(long mediaId, int chunkNumber)
        {
            string targetPath = Path.Combine(ROOT, mediaId.ToString(), chunkNumber.ToString());
            return File.ReadAllBytes(targetPath);
        }
    }
}
