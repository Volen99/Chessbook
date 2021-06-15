using Chessbook.Data;
using Chessbook.Data.Common.Repositories;
using Chessbook.Data.Models;
using Chessbook.Services.Mapping;
using Chessbook.Web.Models.Outputs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Services.Data
{
    public class RelationshipService : IRelationshipService
    {
        private readonly IRepository<Relationship> relationshipsRepository;

        public RelationshipService(IRepository<Relationship> relationshipsRepository)
        {
            this.relationshipsRepository = relationshipsRepository;
        }

        public Task<int> Create()
        {
            throw new NotImplementedException();
        }

        // I am using the crush anology, because my mind is a mess and I am so confused by "source and target" :(
        public async Task<Relationship> GetByUsersId(int yourId, int crushId)
        {
            var relationship = await this.relationshipsRepository.Table
                .Where(r => r.SourceId == yourId && r.TargetId == crushId)
                .FirstOrDefaultAsyncExt();

            if (relationship == null)
            {
                await this.CreateRelationship(yourId, crushId);
                await this.CreateRelationship(crushId, yourId);

                return await this.relationshipsRepository.Table
                .Where(r => r.SourceId == yourId && r.TargetId == crushId)
                .FirstOrDefaultAsyncExt();
            }

            return relationship;
        }

        private async Task<Relationship> CreateRelationship(int yourId, int crushId)
        {
            var relationshipNew = new Relationship
            {
                SourceId = yourId,
                TargetId = crushId,
            };

            await this.relationshipsRepository.InsertAsync(relationshipNew);

            return relationshipNew;
        }

        public async Task Update(Relationship relationship)
        {
            await this.relationshipsRepository.UpdateAsync(relationship);
        }

        public async Task<Relationship> GetByIdAsync(int id)
        {
            return await this.relationshipsRepository.GetByIdAsync(id, cache => default);
        }
    }
}
