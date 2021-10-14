using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Domain.Tournaments;

namespace Chessbook.Services.Tournaments
{
    public interface ITournamentService
    {
        /// <summary>
        /// Gets a tournament by tournament identifier
        /// </summary>
        /// <param name="tournamentId">tournament identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the tournament
        /// </returns>
        Task<Tournament> GetTournamentByIdAsync(int tournamentId);

        /// <summary>
        /// Delete a tournament
        /// </summary>
        /// <param name="tournament">tournament</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task DeleteTournamentAsync(Tournament tournament);

        /// <summary>
        /// Gets all vendors
        /// </summary>
        /// <param name="name">Vendor name</param>
        /// <param name="email">Vendor email</param>
        /// <param name="pageIndex">Page index</param>
        /// <param name="pageSize">Page size</param>
        /// <param name="showHidden">A value indicating whether to show hidden records</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the vendors
        /// </returns>
        Task<IPagedList<Tournament>> GetAllTournamentsAsync(string name = "", string email = "", int pageIndex = 0, int pageSize = int.MaxValue, bool showHidden = false);

        /// <summary>
        /// Inserts a tournament
        /// </summary>
        /// <param name="tournament">tournament</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task InsertTournamentAsync(Tournament tournament);

        /// <summary>
        /// Updates the tournament
        /// </summary>
        /// <param name="tournament">tournament</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task UpdateTournamentAsync(Tournament tournament);
    }
}
