import {UserRight} from "../../../shared/models/users/user-right.enum";
import {UserRole} from "../../../shared/models/users/user-role";

export const USER_ROLE_LABELS: { [id in UserRole]: string } = {
  [UserRole.REGISTERED]: 'Registered',
  [UserRole.MODERATOR]: 'Moderator',
  [UserRole.ADMINISTRATOR]: 'Administrator'
};

const userRoleRights: { [id in UserRole]: UserRight[] } = {
  [UserRole.ADMINISTRATOR]: [
    UserRight.ALL
  ],

  [UserRole.MODERATOR]: [
    UserRight.MANAGE_VIDEO_BLACKLIST,
    UserRight.MANAGE_ABUSES,
    UserRight.REMOVE_ANY_VIDEO,
    UserRight.REMOVE_ANY_VIDEO_CHANNEL,
    UserRight.REMOVE_ANY_VIDEO_PLAYLIST,
    UserRight.REMOVE_ANY_VIDEO_COMMENT,
    UserRight.UPDATE_ANY_VIDEO,
    UserRight.SEE_ALL_VIDEOS,
    UserRight.MANAGE_ACCOUNTS_BLOCKLIST,
    UserRight.MANAGE_SERVERS_BLOCKLIST,
    UserRight.MANAGE_USERS,
    UserRight.SEE_ALL_COMMENTS
  ],

  [UserRole.REGISTERED]: []
};

export function hasUserRight(userRoles: UserRole[], userRight: UserRight) {
  for (const role of userRoles) {
    const userRights = userRoleRights[role];

    if (userRights.includes(UserRight.ALL) || userRights.includes(userRight)) {
      return true;
    }
  }

  return false;
}
