import { sharebookLocalStorage } from '../sharebook-web-storage';
import { UserLocalStorageKeys } from './user-local-storage-keys';
import { NSFWPolicyType, UserRole } from '../../app/shared/models';

function getUserInfoFromLocalStorage() {
  const usernameLocalStorage = sharebookLocalStorage.getItem(UserLocalStorageKeys.USERNAME);

  if (!usernameLocalStorage) return undefined;

  return {
    id: parseInt(sharebookLocalStorage.getItem(UserLocalStorageKeys.ID), 10),
    username: sharebookLocalStorage.getItem(UserLocalStorageKeys.USERNAME),
    email: sharebookLocalStorage.getItem(UserLocalStorageKeys.EMAIL),
    role: parseInt(sharebookLocalStorage.getItem(UserLocalStorageKeys.ROLE), 10) as UserRole,
    nsfwPolicy: sharebookLocalStorage.getItem(UserLocalStorageKeys.NSFW_POLICY) as NSFWPolicyType,
    webTorrentEnabled: sharebookLocalStorage.getItem(UserLocalStorageKeys.WEBTORRENT_ENABLED) === 'true',
    autoPlayVideo: sharebookLocalStorage.getItem(UserLocalStorageKeys.AUTO_PLAY_VIDEO) === 'true',
    videosHistoryEnabled: sharebookLocalStorage.getItem(UserLocalStorageKeys.VIDEOS_HISTORY_ENABLED) === 'true'
  };
}

function flushUserInfoFromLocalStorage() {
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.ID);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.USERNAME);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.EMAIL);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.ROLE);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.NSFW_POLICY);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.WEBTORRENT_ENABLED);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.AUTO_PLAY_VIDEO);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.VIDEOS_HISTORY_ENABLED);
}

function saveUserInfoIntoLocalStorage(info: {
  id: number
  username: string
  email: string
  role: UserRole
  nsfwPolicy: NSFWPolicyType
  webTorrentEnabled: boolean
  autoPlayVideo: boolean
}) {
  sharebookLocalStorage.setItem(UserLocalStorageKeys.ID, info.id.toString());
  sharebookLocalStorage.setItem(UserLocalStorageKeys.USERNAME, info.username);
  sharebookLocalStorage.setItem(UserLocalStorageKeys.EMAIL, info.email);
  sharebookLocalStorage.setItem(UserLocalStorageKeys.ROLE, info.role.toString());
  sharebookLocalStorage.setItem(UserLocalStorageKeys.NSFW_POLICY, info.nsfwPolicy.toString());
  sharebookLocalStorage.setItem(UserLocalStorageKeys.WEBTORRENT_ENABLED, JSON.stringify(info.webTorrentEnabled));
  sharebookLocalStorage.setItem(UserLocalStorageKeys.AUTO_PLAY_VIDEO, JSON.stringify(info.autoPlayVideo));
}

export {
  getUserInfoFromLocalStorage,
  saveUserInfoIntoLocalStorage,
  flushUserInfoFromLocalStorage
};
