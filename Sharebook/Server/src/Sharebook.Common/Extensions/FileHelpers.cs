namespace Sharebook.Common.Extensions
{
    using System.IO;

    public static class FileHelpers
    {
        public static string SaveStringToTempFile(string stringToWrite)
        {
            // Creates a uniquely named, zero-byte temporary file on disk and returns the full path of that file.
            var tempFilePath = Path.GetTempFileName();
            File.WriteAllText(tempFilePath, stringToWrite);

            return tempFilePath;
        }

        public static string SaveByteArrayToTempFile(byte[] dataToWrite)
        {
            var tempFilePath = Path.GetTempFileName();
            File.WriteAllBytes(tempFilePath, dataToWrite);

            return tempFilePath;
        }
    }
}
