using System.Linq;
using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Domain.Donations;
using Chessbook.Data;

namespace Chessbook.Services.Donations
{
    public class DonatorService : IDonatorService
    {
        private readonly IRepository<Donator> donatorRepository;

        public DonatorService(IRepository<Donator> donatorRepository)
        {
            this.donatorRepository = donatorRepository;
        }

        public async Task InsertDonatorAsync(Donator donator)
        {
            await this.donatorRepository.InsertAsync(donator);
        }

        public async Task<Donator> GetDonatorByIdAsync(int donatorId)
        {
            return await this.donatorRepository.GetByIdAsync(donatorId, cache => default);
        }

        public async Task<IPagedList<Donator>> GetAllDonatorsAsync(string name = "", string email = "", int pageIndex = 0, int pageSize = int.MaxValue, bool showHidden = false)
        {
            var tournaments = await this.donatorRepository.GetAllPagedAsync(query =>
            {
                if (!string.IsNullOrWhiteSpace(name))
                    query = query.Where(v => v.Name.Contains(name));

                query = query.OrderBy(v => v.Id).ThenBy(v => v.Name).ThenBy(v => v.Id);

                return query;
            }, pageIndex, pageSize);

            return tournaments;
        }

        public async Task UpdateDonatorAsync(Donator donator)
        {
            await this.donatorRepository.UpdateAsync(donator);
        }

        public async Task DeleteDonatorAsync(Donator donator)
        {
            await this.donatorRepository.DeleteAsync(donator);
        }
    }

}
