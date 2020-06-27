namespace WorldFeed.Dealers.Services.CarAds
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using WorldFeed.Services;
    using Data.Models;
    using Models.CarAds;

    public interface ICarAdService
    {
        Task Find<T>(int id);

        Task<bool> Delete(int id);

        Task<IEnumerable<T>> GetListings<T>(CarAdsQuery query);

        Task<IEnumerable<T>> Mine<T>(int dealerId, CarAdsQuery query);

        Task<T> GetDetails<T>(int id);

        Task<T> Edit<T>(int id, string manufacturer, string model, int category, string imageUrl, decimal pricePerDay,
            bool hasClimateControl, int numberOfSeats, TransmissionType transmissionType);

        Task<int> Total(CarAdsQuery query);
    }
}
