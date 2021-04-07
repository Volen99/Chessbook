namespace Chessbook.Common.Infrastructure.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.IO;

    using System.Text.RegularExpressions;
    using Chessbook.Common.Extensions;

    public enum EDataType
    {
        Default,
        File,
        Image,
        Text,
        URL
    }

    public static class FileHelpers
    {
        public static readonly string[] ImageFileExtensions = new string[] { "jpg", "jpeg", "png", "gif", "bmp", "ico", "tif", "tiff" };
        public static readonly string[] TextFileExtensions = new string[] { "txt", "log", "nfo", "c", "cpp", "cc", "cxx", "h", "hpp", "hxx", "cs", "vb", "html", "htm", "xhtml", "xht", "xml", "css", "js", "php", "bat", "java", "lua", "py", "pl", "cfg", "ini", "dart", "go", "gohtml" };
        public static readonly string[] VideoFileExtensions = new string[] { "mp4", "webm", "mkv", "avi", "vob", "ogv", "ogg", "mov", "qt", "wmv", "m4p", "m4v", "mpg", "mp2", "mpeg", "mpe", "mpv", "m2v", "m4v", "flv", "f4v" };

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

        public static bool IsFileLocked(string filePath)
        {
            try
            {
                using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
                {
                    fs.Close();
                }
            }
            catch (IOException)
            {
                return true;
            }

            return false;
        }

        public static long GetFileSize(string filePath)
        {
            try
            {
                return new FileInfo(filePath).Length;
            }
            catch
            {
            }

            return -1;
        }

        public static bool IsValidFilePath(string path)
        {
            FileInfo fi = null;

            try
            {
                fi = new FileInfo(path);
            }
            catch (ArgumentException) { }
            catch (PathTooLongException) { }
            catch (NotSupportedException) { }

            return fi != null;
        }

        public static string CopyFile(string filePath, string destinationFolder, bool overwrite = true)
        {
            if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath) && !string.IsNullOrEmpty(destinationFolder))
            {
                string fileName = Path.GetFileName(filePath);
                string destinationFilePath = Path.Combine(destinationFolder, fileName);
                DirectoryHelpers.CreateDirectory(destinationFolder);
                File.Copy(filePath, destinationFilePath, overwrite);
                return destinationFilePath;
            }

            return null;
        }

        public static string MoveFile(string filePath, string destinationFolder, bool overwrite = true)
        {
            if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath) && !string.IsNullOrEmpty(destinationFolder))
            {
                string fileName = Path.GetFileName(filePath);
                string destinationFilePath = Path.Combine(destinationFolder, fileName);
                DirectoryHelpers.CreateDirectory(destinationFolder);

                if (overwrite && File.Exists(destinationFilePath))
                {
                    File.Delete(destinationFilePath);
                }

                File.Move(filePath, destinationFilePath);
                return destinationFilePath;
            }

            return null;
        }

        public static string RenameFile(string filePath, string newFileName)
        {
            try
            {
                if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath))
                {
                    string directory = Path.GetDirectoryName(filePath);
                    string newFilePath = Path.Combine(directory, newFileName);
                    File.Move(filePath, newFilePath);
                    return newFilePath;
                }
            }
            catch (Exception e)
            {
                // MessageBox.Show("Rename file error:\r\n" + e.ToString(), "ShareX - " + Resources.Error, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

            return filePath;
        }

        public static string BackupFileWeekly(string filePath, string destinationFolder)
        {
            if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath))
            {
                string fileName = Path.GetFileNameWithoutExtension(filePath);
                DateTime dateTime = DateTime.Now;
                string extension = Path.GetExtension(filePath);
                string newFileName = string.Format("{0}-{1:yyyy-MM}-W{2:00}{3}", fileName, dateTime, dateTime.WeekOfYear(), extension);
                string newFilePath = Path.Combine(destinationFolder, newFileName);

                if (!File.Exists(newFilePath))
                {
                    DirectoryHelpers.CreateDirectory(destinationFolder);
                    File.Copy(filePath, newFilePath, false);
                    return newFilePath;
                }
            }

            return null;
        }

        public static void BackupFileMonthly(string filePath, string destinationFolder)
        {
            if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath))
            {
                string fileName = Path.GetFileNameWithoutExtension(filePath);
                string extension = Path.GetExtension(filePath);
                string newFileName = string.Format("{0}-{1:yyyy-MM}{2}", fileName, DateTime.Now, extension);
                string newFilePath = Path.Combine(destinationFolder, newFileName);

                if (!File.Exists(newFilePath))
                {
                    DirectoryHelpers.CreateDirectory(destinationFolder);
                    File.Copy(filePath, newFilePath, false);
                }
            }
        }

        public static string GetFilenameExtension(string filePath, bool includeDot = false, bool checkSecondExtension = true)
        {
            string extension = "";

            if (!string.IsNullOrEmpty(filePath))
            {
                int pos = filePath.LastIndexOf('.');

                if (pos >= 0)
                {
                    extension = filePath.Substring(pos + 1);

                    if (checkSecondExtension)
                    {
                        filePath = filePath.Remove(pos);
                        string extension2 = GetFilenameExtension(filePath, false, false);

                        if (!string.IsNullOrEmpty(extension2))
                        {
                            foreach (string knownExtension in new string[] { "tar" })
                            {
                                if (extension2.Equals(knownExtension, StringComparison.OrdinalIgnoreCase))
                                {
                                    extension = extension2 + "." + extension;
                                    break;
                                }
                            }
                        }
                    }

                    if (includeDot)
                    {
                        extension = "." + extension;
                    }
                }
            }

            return extension;
        }

        public static string GetFilenameSafe(string filePath)
        {
            if (!string.IsNullOrEmpty(filePath))
            {
                int pos = filePath.LastIndexOf('\\');

                if (pos < 0)
                {
                    pos = filePath.LastIndexOf('/');
                }

                if (pos >= 0)
                {
                    return filePath.Substring(pos + 1);
                }
            }

            return filePath;
        }

        public static string ChangeFilenameExtension(string fileName, string extension)
        {
            if (!string.IsNullOrEmpty(fileName))
            {
                int pos = fileName.LastIndexOf('.');

                if (pos >= 0)
                {
                    fileName = fileName.Remove(pos);
                }

                if (!string.IsNullOrEmpty(extension))
                {
                    pos = extension.LastIndexOf('.');

                    if (pos >= 0)
                    {
                        extension = extension.Substring(pos + 1);
                    }

                    return fileName + "." + extension;
                }
            }

            return fileName;
        }

        public static string AppendExtension(string filePath, string extension)
        {
            return filePath.TrimEnd('.') + '.' + extension.TrimStart('.');
        }

        public static bool CheckExtension(string filePath, IEnumerable<string> extensions)
        {
            string ext = GetFilenameExtension(filePath);

            if (!string.IsNullOrEmpty(ext))
            {
                return extensions.Any(x => ext.Equals(x, StringComparison.OrdinalIgnoreCase));
            }

            return false;
        }

        public static bool IsImageFile(string filePath)
        {
            return CheckExtension(filePath, ImageFileExtensions);
        }

        public static bool IsTextFile(string filePath)
        {
            return CheckExtension(filePath, TextFileExtensions);
        }

        public static bool IsVideoFile(string filePath)
        {
            return CheckExtension(filePath, VideoFileExtensions);
        }

        public static EDataType FindDataType(string filePath)
        {
            if (IsImageFile(filePath))
            {
                return EDataType.Image;
            }

            if (IsTextFile(filePath))
            {
                return EDataType.Text;
            }

            return EDataType.File;
        }

        public static string GetValidFileName(string fileName, string separator = "")
        {
            char[] invalidFileNameChars = Path.GetInvalidFileNameChars();

            if (string.IsNullOrEmpty(separator))
            {
                return new string(fileName.Where(c => !invalidFileNameChars.Contains(c)).ToArray());
            }
            else
            {
                foreach (char invalidFileNameChar in invalidFileNameChars)
                {
                    fileName = fileName.Replace(invalidFileNameChar.ToString(), separator);
                }

                return fileName.Trim().Replace(separator + separator, separator);
            }
        }

        public static string GetValidFolderPath(string folderPath)
        {
            char[] invalidPathChars = Path.GetInvalidPathChars();
            return new string(folderPath.Where(c => !invalidPathChars.Contains(c)).ToArray());
        }

        public static string GetValidFilePath(string filePath)
        {
            string folderPath = Path.GetDirectoryName(filePath);
            string fileName = Path.GetFileName(filePath);
            return GetValidFolderPath(folderPath) + Path.DirectorySeparatorChar + GetValidFileName(fileName);
        }

        public static string GetUniqueFilePath(string filePath)
        {
            if (File.Exists(filePath))
            {
                string folderPath = Path.GetDirectoryName(filePath);
                string fileName = Path.GetFileNameWithoutExtension(filePath);
                string fileExtension = Path.GetExtension(filePath);
                int number = 1;

                Match regex = Regex.Match(fileName, @"^(.+) \((\d+)\)$");

                if (regex.Success)
                {
                    fileName = regex.Groups[1].Value;
                    number = int.Parse(regex.Groups[2].Value);
                }

                do
                {
                    number++;
                    string newFileName = $"{fileName} ({number}){fileExtension}";
                    filePath = Path.Combine(folderPath, newFileName);
                }
                while (File.Exists(filePath));
            }

            return filePath;
        }

        public static string GetTempPath(string extension)
        {
            string path = Path.GetTempFileName();
            return Path.ChangeExtension(path, extension);
        }

        public static void CreateEmptyFile(string path)
        {
            File.Create(path).Dispose();
        }
    }
}
