using System.Threading.Tasks;

using Chessbook.Core;
using Chessbook.Core.Domain.Donations;

namespace Chessbook.Services.Donations
{
    public interface IDonatorService
    {
        /// <summary>
        /// Gets a Donator by donator identifier
        /// </summary>
        /// <param name="donatorId">donator identifier</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains the donator
        /// </returns>
        Task<Donator> GetDonatorByIdAsync(int donatorId);

        /// <summary>
        /// Gets all donators
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
        Task<IPagedList<Donator>> GetAllDonatorsAsync(string name = "", string email = "", int pageIndex = 0, int pageSize = int.MaxValue, bool showHidden = false);

        /// <summary>
        /// Inserts a donator
        /// </summary>
        /// <param name="tournament">donator</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task InsertDonatorAsync(Donator donator);

        /// <summary>
        /// Updates the donator
        /// </summary>
        /// <param name="donator">donator</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task UpdateDonatorAsync(Donator donator);

        /// <summary>
        /// Delete a tournament
        /// </summary>
        /// <param name="tournament">tournament</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        Task DeleteDonatorAsync(Donator donator);
    }

}
