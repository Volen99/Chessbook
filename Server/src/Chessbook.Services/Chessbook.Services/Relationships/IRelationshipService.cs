using System.Threading.Tasks;
using Chessbook.Core.Domain.Relationships;

namespace Chessbook.Services.Data
{
    public interface IRelationshipService
    {
        Task<Relationship> GetByIdAsync(int id);

        Task<int> Create();

        Task<Relationship> GetByUsersId(int yourId, int crushId);

        Task Update(Relationship relationshipDetails);

    }
}
