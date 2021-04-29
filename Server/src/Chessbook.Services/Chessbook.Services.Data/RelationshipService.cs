using Chessbook.Data.Common.Repositories;
using Chessbook.Data.Models;
using Chessbook.Services.Mapping;
using Chessbook.Web.Models.Outputs;
using LinqToDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chessbook.Services.Data
{
    public class RelationshipService : IRelationshipService
    {
        private readonly IDeletableEntityRepository<Relationship> relationshipsRepository;

        public RelationshipService(IDeletableEntityRepository<Relationship> relationshipsRepository)
        {
            this.relationshipsRepository = relationshipsRepository;
        }

        public Task<int> Create()
        {
            throw new NotImplementedException();
        }

        // I am using the crush anology, because my mind is a mess and I am so confused by "source and target" :(
        public async Task<T> GetByUsersId<T>(int yourId, int crushId) where T : class
        {
            var relationship = await this.relationshipsRepository.All()
                .Where(r => r.SourceId == yourId && r.TargetId == crushId)
                .To<T>()
                .FirstOrDefaultAsync();

            if (relationship == null)
            {
                await this.CreateRelationship(yourId, crushId);
                await this.CreateRelationship(crushId, yourId);

                return await this.relationshipsRepository.All()
                .Where(r => r.SourceId == yourId && r.TargetId == crushId)
                .To<T>()
                .FirstOrDefaultAsync();
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

            await this.relationshipsRepository.AddAsync(relationshipNew);
            await this.relationshipsRepository.SaveChangesAsync();

            return relationshipNew;
        }

        public async Task<Relationship> GetByUsersId(int yourId, int crushId)
        {
            var relationship = await this.relationshipsRepository.All()
                 .Where(r => r.SourceId == yourId && r.TargetId == crushId)
                 .FirstOrDefaultAsync();

            if (relationship == null)
            {
                var relationshipNew = await this.CreateRelationship(yourId, crushId);
                await this.CreateRelationship(crushId, yourId);

                return relationshipNew;
            }

            return relationship;
        }

        public async Task<T> Update<T>(Relationship relationship) where T : class
        {
            this.relationshipsRepository.Update(relationship);
            await this.relationshipsRepository.SaveChangesAsync();

            return relationship.MapTo<T>();
        }
    }
}
