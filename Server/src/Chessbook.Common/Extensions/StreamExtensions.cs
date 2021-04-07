namespace Chessbook.Common.Extensions
{
    using System.IO;
    using System.Threading.Tasks;

    public static class StreamExtensions
    {
        public static async Task<byte[]> ToByteArray(this Stream input)
        {
            var buffer = new byte[16 * 1024];
            using (var memoryStream = new MemoryStream())
            {
                int read;
                while ((read = await input.ReadAsync(buffer, 0, buffer.Length)) > 0)
                {
                    memoryStream.WriteAsync(buffer, 0, read);
                }

                return memoryStream.ToArray();
            }
        }

        public static Stream ToStream(this byte[] input)
        {
            var fileStream = new MemoryStream(input) { Position = 0 };
            return fileStream;
        }
    }
}
