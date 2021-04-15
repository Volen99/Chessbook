﻿using Chessbook.Common;
using Chessbook.Data.Common.Repositories;
using Chessbook.Data.Models.Media;
using Chessbook.Data.Models.Memory;
using Microsoft.AspNetCore.Http;
using Nop.Core.Infrastructure;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Bmp;
using SixLabors.ImageSharp.Formats.Gif;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using static SixLabors.ImageSharp.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Nop.Services.Media;
using Nop.Core.Domain.Media;
using System.Threading;
using Chessbook.Data.Models.Post.Entities;
using Chessbook.Data.Models.Post;

namespace Chessbook.Services.Data.Services.Media
{
    // I should die.. This is too much for me.. 12.04.2021, Monday, 12:00 PM | 1 Hour of H.P. Lovecraft Music: The Great Old Ones and Other Beings
    public class PictureService : IPictureService
    {
        private readonly IRepository<Picture> _pictureRepository;
        private readonly IRepository<PostPicture> _productPictureRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly INopFileProvider fileProvider;

        public PictureService(IRepository<Picture> pictureRepository, IHttpContextAccessor httpContextAccessor,
            INopFileProvider fileProvider, IRepository<PostPicture> _productPictureRepository)
        {
            this._pictureRepository = pictureRepository;
            this._httpContextAccessor = httpContextAccessor;
            this.fileProvider = fileProvider;
            this._productPictureRepository = _productPictureRepository;
        }

        #region Utilities

        ///// <summary>
        ///// Gets a data hash from database side
        ///// </summary>
        ///// <param name="binaryData">Array for a hashing function</param>
        ///// <param name="limit">Allowed limit input value</param>
        ///// <returns>Data hash</returns>
        ///// <remarks>
        ///// For SQL Server 2014 (12.x) and earlier, allowed input values are limited to 8000 bytes. 
        ///// https://docs.microsoft.com/en-us/sql/t-sql/functions/hashbytes-transact-sql
        ///// </remarks>
        //[Sql.Expression("CONVERT(VARCHAR(128), HASHBYTES('SHA2_512', SUBSTRING({0}, 0, {1})), 2)", ServerSideOnly = true, Configuration = ProviderName.SqlServer)]
        //[Sql.Expression("SHA2({0}, 512)", ServerSideOnly = true, Configuration = ProviderName.MySql)]
        //[Sql.Expression("encode(digest({0}, 'sha512'), 'hex')", ServerSideOnly = true, Configuration = ProviderName.PostgreSQL95)]
        //public static string Hash(byte[] binaryData, int limit)
        //    => throw new InvalidOperationException("This function should be used only in database code");

        /// <summary>
        /// Calculates picture dimensions whilst maintaining aspect
        /// </summary>
        /// <param name="originalSize">The original picture size</param>
        /// <param name="targetSize">The target picture size (longest side)</param>
        /// <param name="resizeType">Resize type</param>
        /// <param name="ensureSizePositive">A value indicating whether we should ensure that size values are positive</param>
        /// <returns></returns>
        protected virtual Size CalculateDimensions(Size originalSize, int targetSize,
            ResizeType resizeType = ResizeType.LongestSide, bool ensureSizePositive = true)
        {
            float width, height;

            switch (resizeType)
            {
                case ResizeType.LongestSide:
                    if (originalSize.Height > originalSize.Width)
                    {
                        // portrait
                        width = originalSize.Width * (targetSize / (float)originalSize.Height);
                        height = targetSize;
                    }
                    else
                    {
                        // landscape or square
                        width = targetSize;
                        height = originalSize.Height * (targetSize / (float)originalSize.Width);
                    }

                    break;
                case ResizeType.Width:
                    width = targetSize;
                    height = originalSize.Height * (targetSize / (float)originalSize.Width);
                    break;
                case ResizeType.Height:
                    width = originalSize.Width * (targetSize / (float)originalSize.Height);
                    height = targetSize;
                    break;
                default:
                    throw new Exception("Not supported ResizeType");
            }

            if (!ensureSizePositive)
                return new Size((int)Math.Round(width), (int)Math.Round(height));

            if (width < 1)
                width = 1;
            if (height < 1)
                height = 1;

            //we invoke Math.Round to ensure that no white background is rendered - https://www.nopcommerce.com/boards/topic/40616/image-resizing-bug
            return new Size((int)Math.Round(width), (int)Math.Round(height));
        }

        /// <summary>
        /// Loads a picture from file
        /// </summary>
        /// <param name="pictureId">Picture identifier</param>
        /// <param name="mimeType">MIME type</param>
        /// <returns>Picture binary</returns>
        protected virtual async Task<byte[]> LoadPictureFromFileAsync(int pictureId, string mimeType)
        {
            var lastPart = await GetFileExtensionFromMimeTypeAsync(mimeType);
            var fileName = $"{pictureId:0000000}_0.{lastPart}";
            var filePath = await GetPictureLocalPathAsync(fileName);

            return await this.fileProvider.ReadAllBytesAsync(filePath);
        }

        /// <summary>
        /// Save picture on file system
        /// </summary>
        /// <param name="pictureId">Picture identifier</param>
        /// <param name="pictureBinary">Picture binary</param>
        /// <param name="mimeType">MIME type</param>
        protected virtual async Task SavePictureInFileAsync(int pictureId, byte[] pictureBinary, string mimeType)
        {
            var lastPart = await GetFileExtensionFromMimeTypeAsync(mimeType);
            var fileName = $"{pictureId:0000000}_0.{lastPart}";
            await this.fileProvider.WriteAllBytesAsync(await GetPictureLocalPathAsync(fileName), pictureBinary);
        }

        /// <summary>
        /// Delete a picture on file system
        /// </summary>
        /// <param name="picture">Picture</param>
        protected virtual async Task DeletePictureOnFileSystemAsync(Picture picture)
        {
            if (picture == null)
            {
                throw new ArgumentNullException(nameof(picture));
            }

            var lastPart = await GetFileExtensionFromMimeTypeAsync(picture.MimeType);
            var fileName = $"{picture.Id:0000000}_0.{lastPart}";
            var filePath = await GetPictureLocalPathAsync(fileName);
            this.fileProvider.DeleteFile(filePath);
        }

        /// <summary>
        /// Delete picture thumbs
        /// </summary>
        /// <param name="picture">Picture</param>
        protected virtual async Task DeletePictureThumbsAsync(Picture picture)
        {
            var filter = $"{picture.Id:0000000}*.*";
            var currentFiles = this.fileProvider.GetFiles(this.fileProvider.GetAbsolutePath(NopMediaDefaults.ImageThumbsPath), filter, false);
            foreach (var currentFileName in currentFiles)
            {
                var thumbFilePath = await GetThumbLocalPathAsync(currentFileName);
                this.fileProvider.DeleteFile(thumbFilePath);
            }
        }

        /// <summary>
        /// Get picture (thumb) local path
        /// </summary>
        /// <param name="thumbFileName">Filename</param>
        /// <returns>Local picture thumb path</returns>
        protected virtual Task<string> GetThumbLocalPathAsync(string thumbFileName)
        {
            var thumbsDirectoryPath = this.fileProvider.GetAbsolutePath(NopMediaDefaults.ImageThumbsPath);

            if (true) // _mediaSettings.MultipleThumbDirectories
            {
                // get the first two letters of the file name
                var fileNameWithoutExtension = this.fileProvider.GetFileNameWithoutExtension(thumbFileName);
                if (fileNameWithoutExtension != null && fileNameWithoutExtension.Length > NopMediaDefaults.MultipleThumbDirectoriesLength)
                {
                    var subDirectoryName = fileNameWithoutExtension[0..NopMediaDefaults.MultipleThumbDirectoriesLength];
                    thumbsDirectoryPath = this.fileProvider.GetAbsolutePath(NopMediaDefaults.ImageThumbsPath, subDirectoryName);
                    this.fileProvider.CreateDirectory(thumbsDirectoryPath);
                }
            }

            var thumbFilePath = this.fileProvider.Combine(thumbsDirectoryPath, thumbFileName);
            return Task.FromResult(thumbFilePath);
        }

        /// <summary>
        /// Get images path URL 
        /// </summary>
        /// <param name="storeLocation">Store location URL; null to use determine the current store location automatically</param>
        /// <returns></returns>
        protected virtual Task<string> GetImagesPathUrlAsync(string storeLocation = null)
        {
            var pathBase = _httpContextAccessor.HttpContext.Request.PathBase.Value ?? string.Empty;
            var imagesPathUrl = $"{pathBase}/"; // _mediaSettings.UseAbsoluteImagePath ? storeLocation : $"{pathBase}/";
            // imagesPathUrl = string.IsNullOrEmpty(imagesPathUrl) ? _webHelper.GetStoreLocation() : imagesPathUrl;
            imagesPathUrl += "images/";

            return Task.FromResult(imagesPathUrl);
        }

        /// <summary>
        /// Get picture (thumb) URL 
        /// </summary>
        /// <param name="thumbFileName">Filename</param>
        /// <param name="storeLocation">Store location URL; null to use determine the current store location automatically</param>
        /// <returns>Local picture thumb path</returns>
        protected virtual async Task<string> GetThumbUrlAsync(string thumbFileName, string storeLocation = null)
        {
            var url = await GetImagesPathUrlAsync(storeLocation) + "thumbs/";

            if (true) // _mediaSettings.MultipleThumbDirectories
            {
                // get the first two letters of the file name
                var fileNameWithoutExtension = this.fileProvider.GetFileNameWithoutExtension(thumbFileName);
                if (fileNameWithoutExtension != null && fileNameWithoutExtension.Length > NopMediaDefaults.MultipleThumbDirectoriesLength)
                {
                    var subDirectoryName = fileNameWithoutExtension[0..NopMediaDefaults.MultipleThumbDirectoriesLength];
                    url = url + subDirectoryName + "/";
                }
            }

            url += thumbFileName;
            return url;
        }

        /// <summary>
        /// Get picture local path. Used when images stored on file system (not in the database)
        /// </summary>
        /// <param name="fileName">Filename</param>
        /// <returns>Local picture path</returns>
        protected virtual Task<string> GetPictureLocalPathAsync(string fileName)
        {
            return Task.FromResult(this.fileProvider.GetAbsolutePath("images", fileName));
        }

        /// <summary>
        /// Gets the loaded picture binary depending on picture storage settings
        /// </summary>
        /// <param name="picture">Picture</param>
        /// <param name="fromDb">Load from database; otherwise, from file system</param>
        /// <returns>Picture binary</returns>
        protected virtual async Task<byte[]> LoadPictureBinaryAsync(Picture picture, bool fromDb)
        {
            if (picture == null)
            {
                throw new ArgumentNullException(nameof(picture));
            }

            //var result = fromDb
            //    ? (await GetPictureBinaryByPictureIdAsync(picture.Id))?.BinaryData ?? Array.Empty<byte>()
            //    : await LoadPictureFromFileAsync(picture.Id, picture.MimeType);

            var result = await LoadPictureFromFileAsync(picture.Id, picture.MimeType);

            return result;
        }

        /// <summary>
        /// Get a value indicating whether some file (thumb) already exists
        /// </summary>
        /// <param name="thumbFilePath">Thumb file path</param>
        /// <param name="thumbFileName">Thumb file name</param>
        /// <returns>Result</returns>
        protected virtual Task<bool> GeneratedThumbExistsAsync(string thumbFilePath, string thumbFileName)
        {
            return Task.FromResult(this.fileProvider.FileExists(thumbFilePath));
        }

        /// <summary>
        /// Save a value indicating whether some file (thumb) already exists
        /// </summary>
        /// <param name="thumbFilePath">Thumb file path</param>
        /// <param name="thumbFileName">Thumb file name</param>
        /// <param name="mimeType">MIME type</param>
        /// <param name="binary">Picture binary</param>
        protected virtual async Task SaveThumbAsync(string thumbFilePath, string thumbFileName, string mimeType, byte[] binary)
        {
            // ensure \thumb directory exists
            var thumbsDirectoryPath = this.fileProvider.GetAbsolutePath(NopMediaDefaults.ImageThumbsPath);
            this.fileProvider.CreateDirectory(thumbsDirectoryPath);

            // save
            await this.fileProvider.WriteAllBytesAsync(thumbFilePath, binary);
        }

        /// <summary>
        /// Updates the picture binary data
        /// </summary>
        /// <param name="picture">The picture object</param>
        /// <param name="binaryData">The picture binary data</param>
        /// <returns>Picture binary</returns>
        //protected virtual async Task<PictureBinary> UpdatePictureBinaryAsync(Picture picture, byte[] binaryData)
        //{
        //    if (picture == null)
        //        throw new ArgumentNullException(nameof(picture));

        //    var pictureBinary = await GetPictureBinaryByPictureIdAsync(picture.Id);

        //    var isNew = pictureBinary == null;

        //    if (isNew)
        //        pictureBinary = new PictureBinary
        //        {
        //            PictureId = picture.Id
        //        };

        //    pictureBinary.BinaryData = binaryData;

        //    if (isNew)
        //        await _pictureBinaryRepository.InsertAsync(pictureBinary);
        //    else
        //        await _pictureBinaryRepository.UpdateAsync(pictureBinary);

        //    return pictureBinary;
        //}

        /// <summary>
        /// Encode the image into a byte array in accordance with the specified image format
        /// </summary>
        /// <typeparam name="TPixel">Pixel data type</typeparam>
        /// <param name="image">Image data</param>
        /// <param name="imageFormat">Image format</param>
        /// <param name="quality">Quality index that will be used to encode the image</param>
        /// <returns>Image binary data</returns>
        protected virtual async Task<byte[]> EncodeImageAsync<TPixel>(Image<TPixel> image, IImageFormat imageFormat, int? quality = null)
            where TPixel : unmanaged, IPixel<TPixel>
        {
            await using var stream = new MemoryStream();
            var imageEncoder = Default.ImageFormatsManager.FindEncoder(imageFormat);
            switch (imageEncoder)
            {
                case JpegEncoder jpegEncoder:
                    jpegEncoder.Subsample = JpegSubsample.Ratio444;
                    jpegEncoder.Quality = quality ?? 80;
                    await jpegEncoder.EncodeAsync(image, stream, default);
                    break;

                case PngEncoder pngEncoder:
                    pngEncoder.ColorType = PngColorType.RgbWithAlpha;
                    await pngEncoder.EncodeAsync(image, stream, default);
                    break;

                case BmpEncoder bmpEncoder:
                    bmpEncoder.BitsPerPixel = BmpBitsPerPixel.Pixel32;
                    await bmpEncoder.EncodeAsync(image, stream, default);
                    break;

                case GifEncoder gifEncoder:
                    await gifEncoder.EncodeAsync(image, stream, default);
                    break;

                default:
                    await imageEncoder.EncodeAsync(image, stream, default);
                    break;
            }

            return stream.ToArray();
        }

        #endregion

        #region Getting picture local path/URL methods

        /// <summary>
        /// Returns the file extension from mime type.
        /// </summary>
        /// <param name="mimeType">Mime type</param>
        /// <returns>File extension</returns>
        public virtual Task<string> GetFileExtensionFromMimeTypeAsync(string mimeType)
        {
            if (mimeType == null)
            {
                return Task.FromResult<string>(null);
            }

            var parts = mimeType.Split('/');
            var lastPart = parts[^1];
            switch (lastPart)
            {
                case "pjpeg":
                    lastPart = "jpg";
                    break;
                case "x-png":
                    lastPart = "png";
                    break;
                case "x-icon":
                    lastPart = "ico";
                    break;
            }

            return Task.FromResult(lastPart);
        }

        /// <summary>
        /// Gets the loaded picture binary depending on picture storage settings
        /// </summary>
        /// <param name="picture">Picture</param>
        /// <returns>Picture binary</returns>
        public virtual async Task<byte[]> LoadPictureBinaryAsync(Picture picture)
        {
            return await LoadPictureBinaryAsync(picture, await IsStoreInDbAsync());
        }

        /// <summary>
        /// Get picture SEO friendly name
        /// </summary>
        /// <param name="name">Name</param>
        /// <returns>Result</returns>
        public virtual async Task<string> GetPictureSeNameAsync(string name)
        {
            // return await _urlRecordService.GetSeNameAsync(name, true, false);

            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets the default picture URL
        /// </summary>
        /// <param name="targetSize">The target picture size (longest side)</param>
        /// <param name="defaultPictureType">Default picture type</param>
        /// <param name="storeLocation">Store location URL; null to use determine the current store location automatically</param>
        /// <returns>Picture URL</returns>
        public virtual async Task<string> GetDefaultPictureUrlAsync(int targetSize = 0,  PictureType defaultPictureType = PictureType.Entity, string storeLocation = null)
        {
            var defaultImageFileName = defaultPictureType switch
            {
                PictureType.Avatar => "default-avatar.jpg",
                _ => "await _settingService.GetSettingByKeyAsync('Media.DefaultImageName', NopMediaDefaults.DefaultImageFileName),"
            };

            var filePath = await GetPictureLocalPathAsync(defaultImageFileName);
            if (!this.fileProvider.FileExists(filePath))
            {
                return string.Empty;
            }

            if (targetSize == 0)
            {
                return await GetImagesPathUrlAsync(storeLocation) + defaultImageFileName;
            }

            var fileExtension = this.fileProvider.GetFileExtension(filePath);
            var thumbFileName = $"{this.fileProvider.GetFileNameWithoutExtension(filePath)}_{targetSize}{fileExtension}";
            var thumbFilePath = await GetThumbLocalPathAsync(thumbFileName);
            if (!await GeneratedThumbExistsAsync(thumbFilePath, thumbFileName))
            {
                using var image = Image.Load<Rgba32>(filePath, out var imageFormat);
                image.Mutate(imageProcess => imageProcess.Resize(new ResizeOptions
                {
                    Mode = ResizeMode.Max,
                    Size = CalculateDimensions(image.Size(), targetSize)
                }));
                var pictureBinary = await EncodeImageAsync(image, imageFormat);
                await SaveThumbAsync(thumbFilePath, thumbFileName, imageFormat.DefaultMimeType, pictureBinary);
            }

            return await GetThumbUrlAsync(thumbFileName, storeLocation);
        }

        /// <summary>
        /// Get a picture URL
        /// </summary>
        /// <param name="pictureId">Picture identifier</param>
        /// <param name="targetSize">The target picture size (longest side)</param>
        /// <param name="showDefaultPicture">A value indicating whether the default picture is shown</param>
        /// <param name="storeLocation">Store location URL; null to use determine the current store location automatically</param>
        /// <param name="defaultPictureType">Default picture type</param>
        /// <returns>Picture URL</returns>
        public virtual async Task<string> GetPictureUrlAsync(int pictureId,   int targetSize = 0, bool showDefaultPicture = true,
            string storeLocation = null, PictureType defaultPictureType = PictureType.Entity)
        {
            var picture = await GetPictureByIdAsync(pictureId);
            return (await GetPictureUrlAsync(picture, targetSize, showDefaultPicture, storeLocation, defaultPictureType)).Url;
        }

        /// <summary>
        /// Get a picture URL
        /// </summary>
        /// <param name="picture">Reference instance of Picture</param>
        /// <param name="targetSize">The target picture size (longest side)</param>
        /// <param name="showDefaultPicture">A value indicating whether the default picture is shown</param>
        /// <param name="storeLocation">Store location URL; null to use determine the current store location automatically</param>
        /// <param name="defaultPictureType">Default picture type</param>
        /// <returns>Picture URL</returns>
        public virtual async Task<(string Url, Picture Picture)> GetPictureUrlAsync(Picture picture,  int targetSize = 0, bool showDefaultPicture = true,
            string storeLocation = null, PictureType defaultPictureType = PictureType.Entity)
        {
            if (picture == null)
            {
                return showDefaultPicture ? (await GetDefaultPictureUrlAsync(targetSize, defaultPictureType, storeLocation), null) : (string.Empty, (Picture)null);
            }

            byte[] pictureBinary = null;
            if (picture.IsNew)
            {
                await DeletePictureThumbsAsync(picture);
                pictureBinary = await LoadPictureBinaryAsync(picture);

                if ((pictureBinary?.Length ?? 0) == 0)
                {
                    return showDefaultPicture ? (await GetDefaultPictureUrlAsync(targetSize, defaultPictureType, storeLocation), picture) : (string.Empty, picture);
                }

                // we do not validate picture binary here to ensure that no exception ("Parameter is not valid") will be thrown
                picture = await UpdatePictureAsync(picture.Id,
                    pictureBinary,
                    picture.MimeType,
                    picture.SeoFilename,
                    picture.AltAttribute,
                    picture.TitleAttribute,
                    false,
                    false);
            }

            var seoFileName = picture.SeoFilename; // = GetPictureSeName(picture.SeoFilename); // just for sure

            var lastPart = await GetFileExtensionFromMimeTypeAsync(picture.MimeType);
            string thumbFileName;
            if (targetSize == 0)
            {
                thumbFileName = !string.IsNullOrEmpty(seoFileName)
                    ? $"{picture.Id:0000000}_{seoFileName}.{lastPart}"
                    : $"{picture.Id:0000000}.{lastPart}";
            }
            else
            {
                thumbFileName = !string.IsNullOrEmpty(seoFileName)
                    ? $"{picture.Id:0000000}_{seoFileName}_{targetSize}.{lastPart}"
                    : $"{picture.Id:0000000}_{targetSize}.{lastPart}";
            }

            var thumbFilePath = await GetThumbLocalPathAsync(thumbFileName);

            if (await GeneratedThumbExistsAsync(thumbFilePath, thumbFileName))
            {
                return (await GetThumbUrlAsync(thumbFileName, storeLocation), picture);
            }

            // the named semaphore helps to avoid creating the same files in different threads,
            // and does not decrease performance significantly, because the code is blocked only for the specific file.
            using (var semaphore = new Semaphore(1, 1, thumbFileName))
            {
                semaphore.WaitOne();

                try
                {
                    //check, if the file was created, while we were waiting for the release of the mutex.
                    if (!await GeneratedThumbExistsAsync(thumbFilePath, thumbFileName))
                    {
                        pictureBinary ??= await LoadPictureBinaryAsync(picture);

                        if ((pictureBinary?.Length ?? 0) == 0)
                            return showDefaultPicture ? (await GetDefaultPictureUrlAsync(targetSize, defaultPictureType, storeLocation), picture) : (string.Empty, picture);

                        byte[] pictureBinaryResized;
                        if (targetSize != 0)
                        {
                            //resizing required
                            using var image = Image.Load<Rgba32>(pictureBinary, out var imageFormat);
                            image.Mutate(imageProcess => imageProcess.Resize(new ResizeOptions
                            {
                                Mode = ResizeMode.Max,
                                Size = CalculateDimensions(image.Size(), targetSize)
                            }));

                            pictureBinaryResized = await EncodeImageAsync(image, imageFormat);
                        }
                        else
                            //create a copy of pictureBinary
                            pictureBinaryResized = pictureBinary.ToArray();

                        await SaveThumbAsync(thumbFilePath, thumbFileName, picture.MimeType, pictureBinaryResized);
                    }
                }
                finally
                {
                    semaphore.Release();
                }
            }

            return (await GetThumbUrlAsync(thumbFileName, storeLocation), picture);
        }

        /// <summary>
        /// Get a picture local path
        /// </summary>
        /// <param name="picture">Picture instance</param>
        /// <param name="targetSize">The target picture size (longest side)</param>
        /// <param name="showDefaultPicture">A value indicating whether the default picture is shown</param>
        /// <returns></returns>
        public virtual async Task<string> GetThumbLocalPathAsync(Picture picture, int targetSize = 0, bool showDefaultPicture = true)
        {
            var (url, _) = await GetPictureUrlAsync(picture, targetSize, showDefaultPicture);
            if (string.IsNullOrEmpty(url))
            {
                return string.Empty;
            }

            return await GetThumbLocalPathAsync(this.fileProvider.GetFileName(url));
        }

        #endregion

        #region CRUD methods

        /// <summary>
        /// Gets a picture
        /// </summary>
        /// <param name="pictureId">Picture identifier</param>
        /// <returns>Picture</returns>
        public async Task<Picture> GetPictureByIdAsync(int pictureId)
        {
            // return await _pictureRepository.GetByIdAsync(pictureId, cache => default);
            var pic = await _pictureRepository.All().FirstOrDefaultAsync(p => p.Id == pictureId);

            return pic;
        }

        /// <summary>
        /// Deletes a picture
        /// </summary>
        /// <param name="picture">Picture</param>
        public virtual async Task DeletePictureAsync(Picture picture)
        {
            if (picture == null)
            {
                throw new ArgumentNullException(nameof(picture));
            }

            // delete thumbs
            await DeletePictureThumbsAsync(picture);

            // delete from file system
            if (!await IsStoreInDbAsync())
            {
                await DeletePictureOnFileSystemAsync(picture);
            }

            // delete from database
             _pictureRepository.Delete(picture);
            await this._pictureRepository.SaveChangesAsync();
        }

        /// <summary>
        /// Gets a collection of pictures
        /// </summary>
        /// <param name="virtualPath">Virtual path</param>
        /// <param name="pageIndex">Current page</param>
        /// <param name="pageSize">Items on each page</param>
        /// <returns>Paged list of pictures</returns>
        public async Task<IEnumerable<Picture>> GetPicturesAsync(string virtualPath = "", int pageIndex = 0, int pageSize = int.MaxValue)
        {
            var query = _pictureRepository.All();

            if (!string.IsNullOrEmpty(virtualPath))
            {
                query = virtualPath.EndsWith('/') ? query.Where(p => p.VirtualPath.StartsWith(virtualPath) || p.VirtualPath == virtualPath.TrimEnd('/')) : query.Where(p => p.VirtualPath == virtualPath);
            }

            query = query.OrderByDescending(p => p.Id);

            // return await query.ToPagedListAsync(pageIndex, pageSize);
            return await query.ToListAsync();
        }

        /// <summary>
        /// Gets pictures by product identifier
        /// </summary>
        /// <param name="productId">Product identifier</param>
        /// <param name="recordsToReturn">Number of records to return. 0 if you want to get all items</param>
        /// <returns>Pictures</returns>
        public async Task<IList<Picture>> GetPicturesByPostIdAsync(int productId, int recordsToReturn = 0)
        {
            if (productId == 0)
            {
                return new List<Picture>();
            }

            var query = from p in _pictureRepository.All()
                        join pp in _productPictureRepository.All() on p.Id equals pp.PictureId
                        where pp.ProductId == productId
                        select p;

            if (recordsToReturn > 0)
            {
                query = query.Take(recordsToReturn);
            }

            var pics = await query.ToListAsync();

            return pics;
        }

        /// <summary>
        /// Inserts a picture
        /// </summary>
        /// <param name="pictureBinary">The picture binary</param>
        /// <param name="mimeType">The picture MIME type</param>
        /// <param name="seoFilename">The SEO filename</param>
        /// <param name="altAttribute">"alt" attribute for "img" HTML element</param>
        /// <param name="titleAttribute">"title" attribute for "img" HTML element</param>
        /// <param name="isNew">A value indicating whether the picture is new</param>
        /// <param name="validateBinary">A value indicating whether to validated provided picture binary</param>
        /// <returns>Picture</returns>
        public async Task<Picture> InsertPictureAsync(byte[] pictureBinary, string mimeType, string seoFilename, string altAttribute = null, string titleAttribute = null, bool isNew = true, bool validateBinary = true)
        {
            mimeType = CommonHelper.EnsureNotNull(mimeType);
            mimeType = CommonHelper.EnsureMaximumLength(mimeType, 20);

            seoFilename = CommonHelper.EnsureMaximumLength(seoFilename, 100);

            if (validateBinary)
            {
                pictureBinary = await ValidatePictureAsync(pictureBinary, mimeType);
            }

            var picture = new Picture
            {
                MimeType = mimeType,
                SeoFilename = seoFilename,
                AltAttribute = altAttribute,
                TitleAttribute = titleAttribute,
                IsNew = isNew
            };

            await this._pictureRepository.AddAsync(picture);
            await this._pictureRepository.SaveChangesAsync();

            await SavePictureInFileAsync(picture.Id, pictureBinary, mimeType);

            return picture;
        }

        /// <summary>
        /// Inserts a picture
        /// </summary>
        /// <param name="formFile">Form file</param>
        /// <param name="defaultFileName">File name which will be use if IFormFile.FileName not present</param>
        /// <param name="virtualPath">Virtual path</param>
        /// <returns>Picture</returns>
        public async Task<Picture> InsertPictureAsync(Session formFile, string filePath, string defaultFileName = "", string virtualPath = "")
        {
            var imgExt = new List<string>
            {
                ".bmp",
                ".gif",
                ".jpeg",
                ".jpg",
                ".jpe",
                ".jfif",
                ".pjpeg",
                ".pjp",
                ".png",
                ".tiff",
                ".tif"
            } as IReadOnlyCollection<string>;

            var fileName = formFile.FileInfo.Name;
            if (string.IsNullOrEmpty(fileName) && !string.IsNullOrEmpty(defaultFileName))
            {
                fileName = defaultFileName;
            }

            // remove path (passed in IE)
            fileName = this.fileProvider.GetFileName(fileName + formFile.FileInfo.Extension);

            var contentType = "";

            var fileExtension = this.fileProvider.GetFileExtension(fileName);
            if (!string.IsNullOrEmpty(fileExtension))
            {
                fileExtension = fileExtension.ToLowerInvariant();
            }

            if (imgExt.All(ext => !ext.Equals(fileExtension, StringComparison.CurrentCultureIgnoreCase)))
            {
                return null;
            }

            // contentType is not always available 
            // that's why we manually update it here
            // http://www.sfsu.edu/training/mimetype.htm
            if (string.IsNullOrEmpty(contentType))
            {
                switch (fileExtension)
                {
                    case ".bmp":
                        contentType = MimeTypes.ImageBmp;
                        break;
                    case ".gif":
                        contentType = MimeTypes.ImageGif;
                        break;
                    case ".jpeg":
                    case ".jpg":
                    case ".jpe":
                    case ".jfif":
                    case ".pjpeg":
                    case ".pjp":
                        contentType = MimeTypes.ImageJpeg;
                        break;
                    case ".png":
                        contentType = MimeTypes.ImagePng;
                        break;
                    case ".tiff":
                    case ".tif":
                        contentType = MimeTypes.ImageTiff;
                        break;
                    default:
                        break;
                }
            }

            var picture = await InsertPictureAsync(await this.GetDownloadBitsAsync(File.OpenRead(filePath)), contentType, this.fileProvider.GetFileNameWithoutExtension(fileName));

            if (string.IsNullOrEmpty(virtualPath))
            {
                return picture;
            }

            picture.VirtualPath = this.fileProvider.GetVirtualPath(virtualPath);
            await UpdatePictureAsync(picture);

            return picture;
        }

        /// <summary>
        /// Gets the download binary array
        /// </summary>
        /// <param name="file">File</param>
        /// <returns>Download binary array</returns>
        public virtual async Task<byte[]> GetDownloadBitsAsync(FileStream file)
        {
            // await using var fileStream = file.Read();
            await using var ms = new MemoryStream();
            await file.CopyToAsync(ms); // fileStream.
            var fileBytes = ms.ToArray();

            return fileBytes;
        }

        /// <summary>
        /// Updates the picture
        /// </summary>
        /// <param name="pictureId">The picture identifier</param>
        /// <param name="pictureBinary">The picture binary</param>
        /// <param name="mimeType">The picture MIME type</param>
        /// <param name="seoFilename">The SEO filename</param>
        /// <param name="altAttribute">"alt" attribute for "img" HTML element</param>
        /// <param name="titleAttribute">"title" attribute for "img" HTML element</param>
        /// <param name="isNew">A value indicating whether the picture is new</param>
        /// <param name="validateBinary">A value indicating whether to validated provided picture binary</param>
        /// <returns>Picture</returns>
        public async Task<Picture> UpdatePictureAsync(int pictureId, byte[] pictureBinary, string mimeType,
            string seoFilename, string altAttribute = null, string titleAttribute = null,
            bool isNew = true, bool validateBinary = true)
        {
            mimeType = CommonHelper.EnsureNotNull(mimeType);
            mimeType = CommonHelper.EnsureMaximumLength(mimeType, 20);

            seoFilename = CommonHelper.EnsureMaximumLength(seoFilename, 100);

            if (validateBinary)
                pictureBinary = await ValidatePictureAsync(pictureBinary, mimeType);

            var picture = await GetPictureByIdAsync(pictureId);
            if (picture == null)
            {
                return null;
            }

            // delete old thumbs if a picture has been changed
            if (seoFilename != picture.SeoFilename)
            {
                await DeletePictureThumbsAsync(picture);
            }

            picture.MimeType = mimeType;
            picture.SeoFilename = seoFilename;
            picture.AltAttribute = altAttribute;
            picture.TitleAttribute = titleAttribute;
            picture.IsNew = isNew;

             _pictureRepository.Update(picture);
            await _pictureRepository.SaveChangesAsync();
            // await UpdatePictureBinaryAsync(picture, await IsStoreInDbAsync() ? pictureBinary : Array.Empty<byte>());

            if (!await IsStoreInDbAsync())
            {
                await SavePictureInFileAsync(picture.Id, pictureBinary, mimeType);
            }

            return picture;
        }

        /// <summary>
        /// Updates the picture
        /// </summary>
        /// <param name="picture">The picture to update</param>
        /// <returns>Picture</returns>
        public virtual async Task<Picture> UpdatePictureAsync(Picture picture)
        {
            if (picture == null)
            {
                return null;
            }

            var seoFilename = CommonHelper.EnsureMaximumLength(picture.SeoFilename, 100);

            // delete old thumbs if a picture has been changed
            if (seoFilename != picture.SeoFilename)
            {
                await DeletePictureThumbsAsync(picture);
            }

            picture.SeoFilename = seoFilename;

             _pictureRepository.Update(picture);
             await _pictureRepository.SaveChangesAsync();
            // await UpdatePictureBinaryAsync(picture, await IsStoreInDbAsync() ? (await GetPictureBinaryByPictureIdAsync(picture.Id)).BinaryData : Array.Empty<byte>());

            if (!await IsStoreInDbAsync())
            {
                // await SavePictureInFileAsync(picture.Id, (await GetPictureBinaryByPictureIdAsync(picture.Id)).BinaryData, picture.MimeType);
                throw new NotImplementedException();
            }

            return picture;
        }

        /// <summary>
        /// Get product picture binary by picture identifier
        /// </summary>
        /// <param name="pictureId">The picture identifier</param>
        /// <returns>Picture binary</returns>
        //public virtual async Task<PictureBinary> GetPictureBinaryByPictureIdAsync(int pictureId)
        //{
        //    return await _pictureBinaryRepository.Table
        //        .FirstOrDefaultAsync(pb => pb.PictureId == pictureId);
        //}

        /// <summary>
        /// Updates a SEO filename of a picture
        /// </summary>
        /// <param name="pictureId">The picture identifier</param>
        /// <param name="seoFilename">The SEO filename</param>
        /// <returns>Picture</returns>
        public virtual async Task<Picture> SetSeoFilenameAsync(int pictureId, string seoFilename)
        {
            var picture = await GetPictureByIdAsync(pictureId);
            if (picture == null)
            {
                throw new ArgumentException("No picture found with the specified id :(");
            }

            // update if it has been changed
            if (seoFilename != picture.SeoFilename)
            {
                //  update picture
                picture = await UpdatePictureAsync(picture.Id,
                    await LoadPictureBinaryAsync(picture),
                    picture.MimeType,
                    seoFilename,
                    picture.AltAttribute,
                    picture.TitleAttribute,
                    true,
                    false);
            }

            return picture;
        }

        /// <summary>
        /// Validates input picture dimensions
        /// </summary>
        /// <param name="pictureBinary">Picture binary</param>
        /// <param name="mimeType">MIME type</param>
        /// <returns>Picture binary or throws an exception</returns>
        public virtual async Task<byte[]> ValidatePictureAsync(byte[] pictureBinary, string mimeType)
        {
            using var image = Image.Load<Rgba32>(pictureBinary, out var imageFormat);
            // resize the image in accordance with the maximum size
            if (Math.Max(image.Height, image.Width) > 1980)
            {
                image.Mutate(imageProcess => imageProcess.Resize(new ResizeOptions
                {
                    Mode = ResizeMode.Max,
                    Size = new Size(1980)
                }));
            }

            return await EncodeImageAsync(image, imageFormat);
        }

        /// <summary>
        /// Get pictures hashes
        /// </summary>
        /// <param name="picturesIds">Pictures Ids</param>
        /// <returns></returns>
        //public async Task<IDictionary<int, string>> GetPicturesHashAsync(int[] picturesIds)
        //{
        //    if (!picturesIds.Any())
        //    {
        //        return new Dictionary<int, string>();
        //    }

        //    var hashes = (await _dataProvider.GetTableAsync<PictureBinary>())
        //            .Where(p => picturesIds.Contains(p.PictureId))
        //            .Select(x => new
        //            {
        //                x.PictureId,
        //                Hash = Hash(x.BinaryData, _dataProvider.SupportedLengthOfBinaryHash)
        //            });

        //    return await AsyncIQueryableExtensions.ToDictionaryAsync(hashes, p => p.PictureId, p => p.Hash);
        //}

        /// <summary>
        /// Get product picture (for shopping cart and order details pages)
        /// </summary>
        /// <param name="product">Product</param>
        /// <param name="attributesXml">Attributes (in XML format)</param>
        /// <returns>Picture</returns>
        public virtual async Task<Picture> GetProductPictureAsync(Post product, string attributesXml)
        {
            //if (product == null)
            //{
            //    throw new ArgumentNullException(nameof(product));
            //}

            throw new NotImplementedException();

            //// first, try to get product attribute combination picture
            //var combination = await _productAttributeParser.FindProductAttributeCombinationAsync(product, attributesXml);
            //var combinationPicture = await GetPictureByIdAsync(combination?.PictureId ?? 0);
            //if (combinationPicture != null)
            //{
            //    return combinationPicture;
            //}

            //// then, let's see whether we have attribute values with pictures
            //var attributePicture = await (await _productAttributeParser.ParseProductAttributeValuesAsync(attributesXml))
            //    .SelectAwait(async attributeValue => await GetPictureByIdAsync(attributeValue?.PictureId ?? 0))
            //    .FirstOrDefaultAsync(picture => picture != null);
            //if (attributePicture != null)
            //    return attributePicture;

            ////now let's load the default product picture
            //var productPicture = (await GetPicturesByProductIdAsync(product.Id, 1)).FirstOrDefault();
            //if (productPicture != null)
            //    return productPicture;

            ////finally, let's check whether this product has some parent "grouped" product
            //if (product.VisibleIndividually || product.ParentGroupedProductId <= 0)
            //    return null;

            //var parentGroupedProductPicture = (await GetPicturesByProductIdAsync(product.ParentGroupedProductId, 1)).FirstOrDefault();
            //return parentGroupedProductPicture;
        }

        /// <summary>
        /// Gets a value indicating whether the images should be stored in data base.
        /// </summary>
        public virtual async Task<bool> IsStoreInDbAsync()
        {
            // return await _settingService.GetSettingByKeyAsync("Media.Images.StoreInDB", true);

            return false;
        }

        /// <summary>
        /// Sets a value indicating whether the images should be stored in data base
        /// </summary>
        /// <param name="isStoreInDb">A value indicating whether the images should be stored in data base</param>
        public async Task SetIsStoreInDbAsync(bool isStoreInDb)
        {
            throw new NotImplementedException();

            //// check whether it's a new value
            //if (await IsStoreInDbAsync() == isStoreInDb)
            //{
            //    return;
            //}

            ////save the new setting value
            //await _settingService.SetSettingAsync("Media.Images.StoreInDB", isStoreInDb);

            //var pageIndex = 0;
            //const int pageSize = 400;
            //try
            //{
            //    while (true)
            //    {
            //        var pictures = await GetPicturesAsync(pageIndex: pageIndex, pageSize: pageSize);
            //        pageIndex++;

            //        //all pictures converted?
            //        if (!pictures.Any())
            //            break;

            //        foreach (var picture in pictures)
            //        {
            //            if (!string.IsNullOrEmpty(picture.VirtualPath))
            //                continue;

            //            var pictureBinary = await LoadPictureBinaryAsync(picture, !isStoreInDb);

            //            //we used the code below before. but it's too slow
            //            //let's do it manually (uncommented code) - copy some logic from "UpdatePicture" method
            //            /*just update a picture (all required logic is in "UpdatePicture" method)
            //            we do not validate picture binary here to ensure that no exception ("Parameter is not valid") will be thrown when "moving" pictures
            //            UpdatePicture(picture.Id,
            //                          pictureBinary,
            //                          picture.MimeType,
            //                          picture.SeoFilename,
            //                          true,
            //                          false);*/
            //            if (isStoreInDb)
            //                //delete from file system. now it's in the database
            //                await DeletePictureOnFileSystemAsync(picture);
            //            else
            //                //now on file system
            //                await SavePictureInFileAsync(picture.Id, pictureBinary, picture.MimeType);
            //            //update appropriate properties
            //            await UpdatePictureBinaryAsync(picture, isStoreInDb ? pictureBinary : Array.Empty<byte>());
            //            picture.IsNew = true;
            //        }

            //        //save all at once
            //        await _pictureRepository.UpdateAsync(pictures, false);
            //    }
            //}
            //catch
            //{
            //    // ignored
            //}
        }

        public Task<IDictionary<int, string>> GetPicturesHashAsync(int[] picturesIds)
        {
            throw new NotImplementedException();
        }

        #endregion

    }
}
