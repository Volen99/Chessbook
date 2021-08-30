using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Nop.Core;
using Chessbook.Core.Domain.Tournaments;
using Chessbook.Data;

namespace Chessbook.Services.Tournaments
{
    public class TournamentService : ITournamentService
    {
        private readonly IRepository<Tournament> tournamentRepository;

        public TournamentService(IRepository<Tournament> tournamentRepository)
        {
            this.tournamentRepository = tournamentRepository;
        }

        public async Task InsertTournamentAsync(Tournament vendor)
        {
            await this.tournamentRepository.InsertAsync(vendor);
        }

        public async Task<Tournament> GetTournamentByIdAsync(int vendorId)
        {
            return await this.tournamentRepository.GetByIdAsync(vendorId, cache => default);
        }

        public async Task<IPagedList<Tournament>> GetAllTournamentsAsync(string name = "", string email = "", int pageIndex = 0, int pageSize = int.MaxValue, bool showHidden = false)
        {
            var tournaments = await this.tournamentRepository.GetAllPagedAsync(query =>
            {
                if (!string.IsNullOrWhiteSpace(name))
                    query = query.Where(v => v.Name.Contains(name));

                query = query.OrderBy(v => v.DisplayOrder).ThenBy(v => v.Name).ThenBy(v => v.Id);

                return query;
            }, pageIndex, pageSize);

            return tournaments;
        }

        public async Task UpdateTournamentAsync(Tournament tournament)
        {
            await this.tournamentRepository.UpdateAsync(tournament);
        }

        public async Task DeleteTournamentAsync(Tournament tournament)
        {
            await this.tournamentRepository.DeleteAsync(tournament);
        }
    }
}
