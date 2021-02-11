import {UserLocalStorageKeys} from './user-local-storage-keys';
import {sharebookLocalStorage} from "../sharebook-web-storage";
import {UserRole} from "../../app/shared/models/users/user-role";

function getUserInfoFromLocalStorage() {
  const usernameLocalStorage = sharebookLocalStorage.getItem(UserLocalStorageKeys.USERNAME);

  if (!usernameLocalStorage) {
    return undefined;
  }

  return {
    id: parseInt(sharebookLocalStorage.getItem(UserLocalStorageKeys.ID), 10),
    username: sharebookLocalStorage.getItem(UserLocalStorageKeys.USERNAME),
    email: sharebookLocalStorage.getItem(UserLocalStorageKeys.EMAIL),
    role: parseInt(sharebookLocalStorage.getItem(UserLocalStorageKeys.ROLE), 10) as UserRole,
  };
}

function flushUserInfoFromLocalStorage() {
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.ID);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.USERNAME);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.EMAIL);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.ROLE);
  sharebookLocalStorage.removeItem(UserLocalStorageKeys.NSFW_POLICY);
}

function saveUserInfoIntoLocalStorage(info: {
  id: number
  username: string
  email: string
  role: UserRole
}) {
  sharebookLocalStorage.setItem(UserLocalStorageKeys.ID, info.id.toString());
  sharebookLocalStorage.setItem(UserLocalStorageKeys.USERNAME, info.username);
  sharebookLocalStorage.setItem(UserLocalStorageKeys.EMAIL, info.email);
  sharebookLocalStorage.setItem(UserLocalStorageKeys.ROLE, info.role.toString());
}

export {
  getUserInfoFromLocalStorage,
  saveUserInfoIntoLocalStorage,
  flushUserInfoFromLocalStorage
};
