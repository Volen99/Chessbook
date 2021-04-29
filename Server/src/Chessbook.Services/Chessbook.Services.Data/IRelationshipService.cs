using System.Threading.Tasks;

using Chessbook.Data.Models;

namespace Chessbook.Services.Data
{
    public interface IRelationshipService
    {
        Task<int> Create();

        Task<T> GetByUsersId<T>(int yourId, int crushId) where T : class;

        Task<Relationship> GetByUsersId(int yourId, int crushId);

        Task<T> Update<T>(Relationship relationshipDetails) where T : class;

    }
}
