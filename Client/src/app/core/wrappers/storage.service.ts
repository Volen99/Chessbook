import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

import {chessbookLocalStorage, sharebookSessionStorage} from "../../../root-helpers/sharebook-web-storage";

abstract class StorageService {
  protected instance: Storage;
  static storageSub = new Subject<string>();

  watch(keys?: string[]): Observable<string> {
    return StorageService.storageSub.asObservable().pipe(filter(val => keys ? keys.includes(val) : true));
  }

  getItem(key: string) {
    return this.instance.getItem(key);
  }

  setItem(key: string, data: any, notifyOfUpdate = true) {
    this.instance.setItem(key, data);
    if (notifyOfUpdate) StorageService.storageSub.next(key);
  }

  removeItem(key: string, notifyOfUpdate = true) {
    this.instance.removeItem(key);
    if (notifyOfUpdate) StorageService.storageSub.next(key);
  }
}

@Injectable()
export class LocalStorageService extends StorageService {
  protected instance: Storage = chessbookLocalStorage;
}

@Injectable()
export class SessionStorageService extends StorageService {
  protected instance: Storage = sharebookSessionStorage;
}
