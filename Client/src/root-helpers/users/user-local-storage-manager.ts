import {UserLocalStorageKeys} from './user-local-storage-keys';
import {chessbookLocalStorage} from "../sharebook-web-storage";
import {UserRole} from "../../app/shared/models/users/user-role";

function getUserInfoFromLocalStorage() {
  const usernameLocalStorage = chessbookLocalStorage.getItem(UserLocalStorageKeys.USERNAME);

  if (!usernameLocalStorage) {
    return undefined;
  }

  return {
    id: parseInt(chessbookLocalStorage.getItem(UserLocalStorageKeys.ID), 10),
    username: chessbookLocalStorage.getItem(UserLocalStorageKeys.USERNAME),
    email: chessbookLocalStorage.getItem(UserLocalStorageKeys.EMAIL),
    role: parseInt(chessbookLocalStorage.getItem(UserLocalStorageKeys.ROLE), 10) as UserRole,
  };
}

function flushUserInfoFromLocalStorage() {
  chessbookLocalStorage.removeItem(UserLocalStorageKeys.ID);
  chessbookLocalStorage.removeItem(UserLocalStorageKeys.USERNAME);
  chessbookLocalStorage.removeItem(UserLocalStorageKeys.EMAIL);
  chessbookLocalStorage.removeItem(UserLocalStorageKeys.ROLE);
  chessbookLocalStorage.removeItem(UserLocalStorageKeys.NSFW_POLICY);
}

function saveUserInfoIntoLocalStorage(info: {
  id: number
  username: string
  email: string
  role: UserRole
}) {
  chessbookLocalStorage.setItem(UserLocalStorageKeys.ID, info.id.toString());
  chessbookLocalStorage.setItem(UserLocalStorageKeys.USERNAME, info.username);
  chessbookLocalStorage.setItem(UserLocalStorageKeys.EMAIL, info.email);
  chessbookLocalStorage.setItem(UserLocalStorageKeys.ROLE, info.role.toString());
}

export {
  getUserInfoFromLocalStorage,
  saveUserInfoIntoLocalStorage,
  flushUserInfoFromLocalStorage
};
