using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Versioning;
using System.Security.AccessControl;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;

namespace Nop.Core.Infrastructure
{
    /// <summary>
    /// IO functions using the on-disk file system
    /// </summary>
    public class NopFileProvider : PhysicalFileProvider, INopFileProvider
    {
        /// <summary>
        /// Initializes a new instance of a NopFileProvider
        /// </summary>
        /// <param name="webHostEnvironment">Hosting environment</param>
        public NopFileProvider(IWebHostEnvironment webHostEnvironment)
            : base(File.Exists(webHostEnvironment.ContentRootPath) ? Path.GetDirectoryName(webHostEnvironment.ContentRootPath) : webHostEnvironment.ContentRootPath)
        {
            WebRootPath = File.Exists(webHostEnvironment.WebRootPath)
                ? Path.GetDirectoryName(webHostEnvironment.WebRootPath)
                : webHostEnvironment.WebRootPath;
        }

        /// <summary>
        /// Combines an array of strings into a path
        /// </summary>
        /// <param name="paths">An array of parts of the path</param>
        /// <returns>The combined paths</returns>
        public string Combine(params string[] paths)
        {
            var path = Path.Combine(paths.SelectMany(p => IsUncPath(p) ? new[] { p } : p.Split('\\', '/')).ToArray());

            if (Environment.OSVersion.Platform == PlatformID.Unix && !IsUncPath(path))
                //add leading slash to correctly form path in the UNIX system
                path = "/" + path;

            return path;
        }

        /// <summary>
        /// Determines if the string is a valid Universal Naming Convention (UNC)
        /// for a server and share path.
        /// </summary>
        /// <param name="path">The path to be tested.</param>
        /// <returns><see langword="true"/> if the path is a valid UNC path; 
        /// otherwise, <see langword="false"/>.</returns>
        protected static bool IsUncPath(string path)
        {
            return Uri.TryCreate(path, UriKind.Absolute, out var uri) && uri.IsUnc;
        }

        /// <summary>
        /// Creates all directories and subdirectories in the specified path unless they already exist
        /// </summary>
        /// <param name="path">The directory to create</param>
        public virtual void CreateDirectory(string path)
        {
            if (!DirectoryExists(path))
            {
                Directory.CreateDirectory(path);
            }
        }

        /// <summary>
        /// Creates or overwrites a file in the specified path
        /// </summary>
        /// <param name="path">The path and name of the file to create</param>
        public virtual void CreateFile(string path)
        {
            if (FileExists(path))
            {
                return;
            }

            var fileInfo = new FileInfo(path);
            CreateDirectory(fileInfo.DirectoryName);

            // we use 'using' to close the file after it's created
            using (File.Create(path))
            {
            }
        }

        /// <summary>
        ///  Depth-first recursive delete, with handling for descendant directories open in Windows Explorer.
        /// </summary>
        /// <param name="path">Directory path</param>
        public void DeleteDirectory(string path)
        {
            if (string.IsNullOrEmpty(path))
                throw new ArgumentNullException(path);

            // find more info about directory deletion
            // and why we use this approach at https://stackoverflow.com/questions/329355/cannot-delete-directory-with-directory-deletepath-true

            foreach (var directory in Directory.GetDirectories(path))
            {
                DeleteDirectory(directory);
            }

            try
            {
                DeleteDirectoryRecursive(path);
            }
            catch (IOException)
            {
                DeleteDirectoryRecursive(path);
            }
            catch (UnauthorizedAccessException)
            {
                DeleteDirectoryRecursive(path);
            }
        }

        /// <summary>
        /// Deletes the specified file
        /// </summary>
        /// <param name="filePath">The name of the file to be deleted. Wildcard characters are not supported</param>
        public virtual void DeleteFile(string filePath)
        {
            if (!FileExists(filePath))
                return;

            File.Delete(filePath);
        }

        /// <summary>
        /// Determines whether the given path refers to an existing directory on disk
        /// </summary>
        /// <param name="path">The path to test</param>
        /// <returns>
        /// true if path refers to an existing directory; false if the directory does not exist or an error occurs when
        /// trying to determine if the specified file exists
        /// </returns>
        public bool DirectoryExists(string path)
        {
            return Directory.Exists(path);
        }

        public void DirectoryMove(string sourceDirName, string destDirName)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Returns an enumerable collection of file names that match a search pattern in
        /// a specified path, and optionally searches subdirectories.
        /// </summary>
        /// <param name="directoryPath">The path to the directory to search</param>
        /// <param name="searchPattern">
        /// The search string to match against the names of files in path. This parameter
        /// can contain a combination of valid literal path and wildcard (* and ?) characters
        /// , but doesn't support regular expressions.
        /// </param>
        /// <param name="topDirectoryOnly">
        /// Specifies whether to search the current directory, or the current directory and all
        /// subdirectories
        /// </param>
        /// <returns>
        /// An enumerable collection of the full names (including paths) for the files in
        /// the directory specified by path and that match the specified search pattern
        /// </returns>
        public IEnumerable<string> EnumerateFiles(string directoryPath, string searchPattern, bool topDirectoryOnly = true)
        {
            return Directory.EnumerateFiles(directoryPath, searchPattern,
                topDirectoryOnly ? SearchOption.TopDirectoryOnly : SearchOption.AllDirectories);
        }

        /// <summary>
        /// Copies an existing file to a new file. Overwriting a file of the same name is allowed
        /// </summary>
        /// <param name="sourceFileName">The file to copy</param>
        /// <param name="destFileName">The name of the destination file. This cannot be a directory</param>
        /// <param name="overwrite">true if the destination file can be overwritten; otherwise, false</param>
        public  void FileCopy(string sourceFileName, string destFileName, bool overwrite = false)
        {
            File.Copy(sourceFileName, destFileName, overwrite);
        }

        /// <summary>
        /// Determines whether the specified file exists
        /// </summary>
        /// <param name="filePath">The file to check</param>
        /// <returns>
        /// True if the caller has the required permissions and path contains the name of an existing file; otherwise,
        /// false.
        /// </returns>
        public bool FileExists(string filePath)
        {
            return File.Exists(filePath);
        }

        /// <summary>
        /// Gets the length of the file in bytes, or -1 for a directory or non-existing files
        /// </summary>
        /// <param name="path">File path</param>
        /// <returns>The length of the file</returns>
        public long FileLength(string path)
        {
            if (!FileExists(path))
                return -1;

            return new FileInfo(path).Length;
        }

        /// <summary>
        /// Moves a specified file to a new location, providing the option to specify a new file name
        /// </summary>
        /// <param name="sourceFileName">The name of the file to move. Can include a relative or absolute path</param>
        /// <param name="destFileName">The new path and name for the file</param>
        public void FileMove(string sourceFileName, string destFileName)
        {
            File.Move(sourceFileName, destFileName);
        }

        /// <summary>
        /// Returns the absolute path to the directory
        /// </summary>
        /// <param name="paths">An array of parts of the path</param>
        /// <returns>The absolute path to the directory</returns>
        public virtual string GetAbsolutePath(params string[] paths)
        {
            var allPaths = new List<string>();

            if (paths.Any() && !paths[0].Contains(WebRootPath, StringComparison.InvariantCulture))
            {
                allPaths.Add(WebRootPath);
            }

            allPaths.AddRange(paths);

            return this.Combine(allPaths.ToArray());
        }

        public DirectorySecurity GetAccessControl(string path)
        {
            throw new NotImplementedException();
        }

        public DateTime GetCreationTime(string path)
        {
            throw new NotImplementedException();
        }

        public string[] GetDirectories(string path, string searchPattern = "", bool topDirectoryOnly = true)
        {
            throw new NotImplementedException();
        }

        public string GetDirectoryName(string path)
        {
            throw new NotImplementedException();
        }

        public string GetDirectoryNameOnly(string path)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Returns the extension of the specified path string
        /// </summary>
        /// <param name="filePath">The path string from which to get the extension</param>
        /// <returns>The extension of the specified path (including the period ".")</returns>
        public virtual string GetFileExtension(string filePath)
        {
            return Path.GetExtension(filePath);
        }

        /// <summary>
        /// Returns the file name and extension of the specified path string
        /// </summary>
        /// <param name="path">The path string from which to obtain the file name and extension</param>
        /// <returns>The characters after the last directory character in path</returns>
        public string GetFileName(string path)
        {
            return Path.GetFileName(path);
        }

        /// <summary>
        /// Returns the file name of the specified path string without the extension
        /// </summary>
        /// <param name="filePath">The path of the file</param>
        /// <returns>The file name, minus the last period (.) and all characters following it</returns>
        public string GetFileNameWithoutExtension(string filePath)
        {
            return Path.GetFileNameWithoutExtension(filePath);
        }

        /// <summary>
        /// Returns the names of files (including their paths) that match the specified search
        /// pattern in the specified directory, using a value to determine whether to search subdirectories.
        /// </summary>
        /// <param name="directoryPath">The path to the directory to search</param>
        /// <param name="searchPattern">
        /// The search string to match against the names of files in path. This parameter
        /// can contain a combination of valid literal path and wildcard (* and ?) characters
        /// , but doesn't support regular expressions.
        /// </param>
        /// <param name="topDirectoryOnly">
        /// Specifies whether to search the current directory, or the current directory and all
        /// subdirectories
        /// </param>
        /// <returns>
        /// An array of the full names (including paths) for the files in the specified directory
        /// that match the specified search pattern, or an empty array if no files are found.
        /// </returns>
        public virtual string[] GetFiles(string directoryPath, string searchPattern = "", bool topDirectoryOnly = true)
        {
            if (string.IsNullOrEmpty(searchPattern))
            {
                searchPattern = "*.*";
            }

            return Directory.GetFiles(directoryPath, searchPattern, topDirectoryOnly ? SearchOption.TopDirectoryOnly : SearchOption.AllDirectories);
        }

        public DateTime GetLastAccessTime(string path)
        {
            throw new NotImplementedException();
        }

        public DateTime GetLastWriteTime(string path)
        {
            throw new NotImplementedException();
        }

        public DateTime GetLastWriteTimeUtc(string path)
        {
            throw new NotImplementedException();
        }

        public string GetParentDirectory(string directoryPath)
        {
            throw new NotImplementedException();
        }

        public string GetVirtualPath(string path)
        {
            if (string.IsNullOrEmpty(path))
                return path;

            if (!IsDirectory(path) && FileExists(path))
                path = new FileInfo(path).DirectoryName;

            path = path?.Replace(WebRootPath, string.Empty).Replace('\\', '/').Trim('/').TrimStart('~', '/');

            return $"~/{path ?? string.Empty}";
        }

        /// <summary>
        /// Checks if the path is directory
        /// </summary>
        /// <param name="path">Path for check</param>
        /// <returns>True, if the path is a directory, otherwise false</returns>
        public virtual bool IsDirectory(string path)
        {
            return DirectoryExists(path);
        }

        /// <summary>
        /// Maps a virtual path to a physical disk path.
        /// </summary>
        /// <param name="path">The path to map. E.g. "~/bin"</param>
        /// <returns>The physical path. E.g. "c:\inetpub\wwwroot\bin"</returns>
        public virtual string MapPath(string path)
        {
            path = path.Replace("~/", string.Empty).TrimStart('/');

            // if virtual path has slash on the end, it should be after transform the virtual path to physical path too
            var pathEnd = path.EndsWith('/') ? Path.DirectorySeparatorChar.ToString() : string.Empty;

            return Combine(Root ?? string.Empty, path) + pathEnd;
        }

        /// <summary>
        /// Reads the contents of the file into a byte array
        /// </summary>
        /// <param name="filePath">The file for reading</param>
        /// <returns>A byte array containing the contents of the file</returns>
        public async Task<byte[]> ReadAllBytesAsync(string filePath)
        {
            return File.Exists(filePath) ? await File.ReadAllBytesAsync(filePath) : Array.Empty<byte>();
        }

        /// <summary>
        /// Opens a file, reads all lines of the file with the specified encoding, and then closes the file.
        /// </summary>
        /// <param name="path">The file to open for reading</param>
        /// <param name="encoding">The encoding applied to the contents of the file</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains a string containing all lines of the file
        /// </returns>
        public virtual async Task<string> ReadAllTextAsync(string path, Encoding encoding)
        {
            await using var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            using var streamReader = new StreamReader(fileStream, encoding);

            return await streamReader.ReadToEndAsync();
        }

        /// <summary>
        /// Opens a file, reads all lines of the file with the specified encoding, and then closes the file.
        /// </summary>
        /// <param name="path">The file to open for reading</param>
        /// <param name="encoding">The encoding applied to the contents of the file</param>
        /// <returns>A string containing all lines of the file</returns>
        public virtual string ReadAllText(string path, Encoding encoding)
        {
            using var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            using var streamReader = new StreamReader(fileStream, encoding);

            return streamReader.ReadToEnd();
        }

       

        /// <summary>
        /// Writes the specified byte array to the file
        /// </summary>
        /// <param name="filePath">The file to write to</param>
        /// <param name="bytes">The bytes to write to the file</param>
        public async Task WriteAllBytesAsync(string filePath, byte[] bytes)
        {
            await File.WriteAllBytesAsync(filePath, bytes);
        }

        /// <summary>
        /// Creates a new file, writes the specified string to the file using the specified encoding,
        /// and then closes the file. If the target file already exists, it is overwritten.
        /// </summary>
        /// <param name="path">The file to write to</param>
        /// <param name="contents">The string to write to the file</param>
        /// <param name="encoding">The encoding to apply to the string</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        public virtual async Task WriteAllTextAsync(string path, string contents, Encoding encoding)
        {
            await File.WriteAllTextAsync(path, contents, encoding);
        }

        /// <summary>
        /// Creates a new file, writes the specified string to the file using the specified encoding,
        /// and then closes the file. If the target file already exists, it is overwritten.
        /// </summary>
        /// <param name="path">The file to write to</param>
        /// <param name="contents">The string to write to the file</param>
        /// <param name="encoding">The encoding to apply to the string</param>
        public virtual void WriteAllText(string path, string contents, Encoding encoding)
        {
            File.WriteAllText(path, contents, encoding);
        }

        protected string WebRootPath { get; }


        private static void DeleteDirectoryRecursive(string path)
        {
            Directory.Delete(path, true);
            const int maxIterationToWait = 10;
            var curIteration = 0;

            //according to the documentation(https://msdn.microsoft.com/ru-ru/library/windows/desktop/aa365488.aspx) 
            //System.IO.Directory.Delete method ultimately (after removing the files) calls native 
            //RemoveDirectory function which marks the directory as "deleted". That's why we wait until 
            //the directory is actually deleted. For more details see https://stackoverflow.com/a/4245121
            while (Directory.Exists(path))
            {
                curIteration += 1;
                if (curIteration > maxIterationToWait)
                    return;
                Thread.Sleep(100);
            }
        }
    }
}