using System;
using System.Threading.Tasks;

using Chessbook.Data.Models;
using Chessbook.Web.Models.Outputs;

namespace Chessbook.Web.Api.Factories
{
    public class RelationshipModelFactory : IRelationshipModelFactory
    {
        public RelationshipDetailsModel PrepareRelationshipModel(Relationship relationship)
        {
            if (relationship == null)
            {
                throw new ArgumentNullException(nameof(relationship));
            }

            var model = new RelationshipDetailsModel
            {
                Id = relationship.Id,
                FollowedBy = relationship.FollowedBy,
                Following = relationship.Following,
                Blocking = relationship.Blocking,
                BlockedBy = relationship.BlockedBy,
                Requested = relationship.Requested,
                Endorsed = relationship.Endorsed,
                Note = relationship.Note,
            };

            return model;
        }
    }
}
