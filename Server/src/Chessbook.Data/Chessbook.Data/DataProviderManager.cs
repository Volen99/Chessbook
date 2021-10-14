using Chessbook.Core;
using Chessbook.Core.Infrastructure;
using Chessbook.Data.DataProviders;

namespace Chessbook.Data
{
    /// <summary>
    /// Represents the data provider manager
    /// </summary>
    public partial class DataProviderManager : IDataProviderManager
    {
        #region Methods

        /// <summary>
        /// Gets data provider by specific type
        /// </summary>
        /// <param name="dataProviderType">Data provider type</param>
        /// <returns></returns>
        public static INopDataProvider GetDataProvider(DataProviderType dataProviderType)
        {
            return dataProviderType switch
            {
                DataProviderType.SqlServer => new MsSqlNopDataProvider(),
                DataProviderType.MySql => null,
                DataProviderType.PostgreSQL => null,
                _ => throw new NopException($"Not supported data provider name: '{dataProviderType}'"),
            };
        }

        #endregion

        #region Properties

        /// <summary>
        /// Gets data provider
        /// </summary>
        public INopDataProvider DataProvider
        {
            get
            {
                var dataProviderType = Singleton<DataSettings>.Instance.DataProvider;

                return GetDataProvider(dataProviderType);
            }
        }

        #endregion
    }
}
