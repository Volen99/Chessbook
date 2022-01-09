using System.IO;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Services.Directory;
using Chessbook.Services.Logging;

namespace Chessbook.Services.ExportImport
{
    /// <summary>
    /// Import manager
    /// </summary>
    public partial class ImportManager : IImportManager
    {
        #region Constants

        // it's quite fast hash (to cheaply distinguish between objects)
        private const string IMAGE_HASH_ALGORITHM = "SHA512";

        private const string UPLOADS_TEMP_PATH = "~/App_Data/TempUploads";

        #endregion

        #region Fields

        private readonly ICountryService _countryService;
        private readonly ICustomerActivityService _customerActivityService;

        #endregion

        #region Ctor

        public ImportManager(ICountryService countryService, ICustomerActivityService customerActivityService)
        {
            _countryService = countryService;
            _customerActivityService = customerActivityService;
        }

        #endregion

        /// <summary>
        /// Import states from TXT file
        /// </summary>
        /// <param name="stream">Stream</param>
        /// <param name="writeLog">Indicates whether to add logging</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the number of imported states
        /// </returns>
        public virtual async Task<int> ImportStatesFromTxtAsync(Stream stream, bool writeLog = true)
        {
            var count = 0;
            using (var reader = new StreamReader(stream))
            {
                while (!reader.EndOfStream)
                {
                    var line = await reader.ReadLineAsync();
                    if (string.IsNullOrWhiteSpace(line))
                    {
                        continue;
                    }
                    var tmp = line.Split(',');

                    if (tmp.Length != 5)
                    {
                        throw new NopException("Wrong file format");
                    }

                    // parse
                    var countryTwoLetterIsoCode = tmp[0].Trim();
                    var name = tmp[1].Trim();
                    var abbreviation = tmp[2].Trim();
                    var published = bool.Parse(tmp[3].Trim());
                    var displayOrder = int.Parse(tmp[4].Trim());

                    var country = await _countryService.GetCountryByTwoLetterIsoCodeAsync(countryTwoLetterIsoCode);
                    if (country == null)
                    {
                        // country cannot be loaded. skip
                        continue;
                    }

                    // import
                    count++;
                }
            }

            // activity log
            if (writeLog)
            {
                await _customerActivityService.InsertActivityAsync("ImportStates", string.Format("await _localizationService.GetResourceAsync('ActivityLog.ImportStates')", count));
            }

            return count;
        }

    }
}
