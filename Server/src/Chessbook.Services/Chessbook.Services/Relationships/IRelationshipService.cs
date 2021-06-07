using System.Threading.Tasks;

using Chessbook.Data.Models;

namespace Chessbook.Services.Data
{
    public interface IRelationshipService
    {
        Task<int> Create();

        Task<Relationship> GetByUsersId(int yourId, int crushId);

        Task Update(Relationship relationshipDetails);

    }
}
