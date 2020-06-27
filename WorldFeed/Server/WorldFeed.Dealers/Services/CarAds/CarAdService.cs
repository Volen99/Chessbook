//namespace WorldFeed.Dealers.Services.CarAds
//{
//    using System.Collections.Generic;
//    using System.Linq;
//    using System.Threading.Tasks;
//    using AutoMapper;
//    using WorldFeed.Services;
//    using Data;
//    using Data.Models;
//    using Microsoft.EntityFrameworkCore;
//    using Models.CarAds;
//    using WorldFeed.Data.Common.Repositories;
//    using WorldFeed.Common.Services.Mapping;
//    using WorldFeed.Dealers.Services.Dealers;
//    using WorldFeed.Dealers.Services.Categories;
//    using WorldFeed.Dealers.Services.Manufacturers;
//    using WorldFeed.Services.Identity;

//    public class CarAdService : ICarAdService
//    {
//        private const int CarAdsPerPage = 10;

//        private readonly IMapper mapper;
//        private readonly IDeletableEntityRepository<CarAd> carAdsRepository;

//        private readonly IDealerService dealersService;
//        private readonly ICategoryService categoriesService;
//        private readonly IManufacturerService manufacturersService;
//        private readonly ICurrentUserService currentUser;

//        //public CarAdService(DealersDbContext db, IMapper mapper)
//        //    : base(db)
//        //    => this.mapper = mapper;

//        public CarAdService(IDealerService dealers, ICategoryService categories, IManufacturerService manufacturers)
//        {
//            this.dealersService = dealers;
//            this.categoriesService = categories;
//            this.manufacturersService = manufacturers;
//        }

//        public async Task<CarAd> Find(int id)
//        {
//            var carAdCurrent = await this.carAdsRepository.All()
//                .Include(c => c.Manufacturer)
//                .FirstOrDefaultAsync(c => c.Id == id);

//            return carAdCurrent;
//        }

//        public async Task<bool> Delete(int id)
//        {
//            var carAd = await this.carAdsRepository.FindAsync<CarAd>(id);

//            if (carAd == null)
//            {
//                return false;
//            }

//            this.carAdsRepository.Remove(carAd);

//            await this.carAdsRepository.SaveChangesAsync();

//            return true;
//        }

//        public async Task<IEnumerable<CarAdOutputModel>> GetListings(CarAdsQuery query)
//            => (await this.mapper
//                .ProjectTo<CarAdOutputModel>(this
//                    .GetCarAdsQuery(query))
//                .ToListAsync())
//                .Skip((query.Page - 1) * CarAdsPerPage)
//                .Take(CarAdsPerPage); // SQL Server is old and forces me to execute paging on the client.

//        public async Task<IEnumerable<MineCarAdOutputModel>> Mine(int dealerId, CarAdsQuery query)
//            => (await this.mapper
//                .ProjectTo<MineCarAdOutputModel>(this
//                    .GetCarAdsQuery(query, dealerId))
//                .ToListAsync())
//                .Skip((query.Page - 1) * CarAdsPerPage)
//                .Take(CarAdsPerPage); // SQL Server is old and forces me to execute paging on the client.

//        public async Task<CarAdDetailsOutputModel> GetDetails(int id)
//            => await this.mapper
//                .ProjectTo<CarAdDetailsOutputModel>(this
//                    .AllAvailable()
//                    .Where(c => c.Id == id))
//                .FirstOrDefaultAsync();

//        public async Task<int> Total(CarAdsQuery query)
//            => await this
//                .GetCarAdsQuery(query)
//                .CountAsync();

//        private IQueryable<CarAd> AllAvailable()
//            => carAdsRepository.All()
//                .Where(car => car.IsAvailable);

//        private IQueryable<CarAd> GetCarAdsQuery(
//            CarAdsQuery query, int? dealerId = null)
//        {
//            var dataQuery = carAdsRepository.All();

//            if (dealerId.HasValue)
//            {
//                dataQuery = dataQuery.Where(c => c.DealerId == dealerId);
//            }

//            if (query.Category.HasValue)
//            {
//                dataQuery = dataQuery.Where(c => c.CategoryId == query.Category);
//            }

//            if (!string.IsNullOrWhiteSpace(query.Manufacturer))
//            {
//                dataQuery = dataQuery.Where(c => c
//                    .Manufacturer.Name.ToLower().Contains(query.Manufacturer.ToLower()));
//            }

//            return dataQuery;
//        }

//        public async Task Edit<T>(int id, string manufacturer, string model, int category, string imageUrl, decimal pricePerDay, bool hasClimateControl, int numberOfSeats, TransmissionType transmissionType)
//        {
//            var dealer = await this.dealersService.FindByUser(this.currentUser.UserId);

//            var categoryCurrent = await this.categoriesService.Find(category);

//            if (categoryCurrent == null)
//            {
//                //return BadRequest(Result.Failure("Category does not exist."));
//            }

//            var manufacturerCurrent = await this.manufacturersService.FindByName(manufacturer);

//            manufacturerCurrent ??= new Manufacturer
//            {
//                Name = manufacturer
//            };


//            var carAdCurrent = this.carAdsRepository.All()
//                 .Where(ca => ca.Id == id)
//                 .FirstOrDefault();

//            carAdCurrent.Manufacturer = manufacturerCurrent;
//            carAdCurrent.Model = model;
//            carAdCurrent.Category = categoryCurrent;
//            carAdCurrent.ImageUrl = imageUrl;
//            carAdCurrent.PricePerDay = pricePerDay;
//            carAdCurrent.Options = new Options
//            {
//                HasClimateControl = hasClimateControl,
//                NumberOfSeats = numberOfSeats,
//                TransmissionType = transmissionType
//            };

//            await this.carAdsRepository.SaveChangesAsync();
//        }
//    }
//}
