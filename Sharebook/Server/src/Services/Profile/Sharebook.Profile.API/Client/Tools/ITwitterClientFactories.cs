using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sharebook.Profile.Client.Tools
{
    public interface ITwitterClientFactories
    {
        // RELATIONSHIP

        /// <summary>
        /// Creates a relationship state from json
        /// </summary>
        IRelationshipState CreateRelationshipState(string json);
        IRelationshipState CreateRelationshipState(IRelationshipStateDTO relationshipStateDTO);
        IRelationshipState[] CreateRelationshipStates(IRelationshipStateDTO[] relationshipStateDTOs);
        IRelationshipDetails CreateRelationshipDetails(string json);
        IRelationshipDetails CreateRelationshipDetails(IRelationshipDetailsDTO dto);

        // USER

        /// <summary>
        /// Creates a user from json
        /// </summary>
        IUser CreateUser(string json);
        IUser CreateUser(IUserDTO userDTO);
        IUser[] CreateUsers(IEnumerable<IUserDTO> usersDTO);

        /// <summary>
        /// Creates an authenticated user from json
        /// </summary>
        IAuthenticatedUser CreateAuthenticatedUser(string json);
        IAuthenticatedUser CreateAuthenticatedUser(IUserDTO userDTO);
    }
}
