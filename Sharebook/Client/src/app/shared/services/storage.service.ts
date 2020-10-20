import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  private storage: any;

  constructor() {
    this.storage = sessionStorage;
  }

  public store(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public retrieve(key: string): any {
    const item = this.storage.getItem(key);

    if (item && item !== 'undefined') {
      return JSON.parse(this.storage.getItem(key));
    }

    return;
  }

  public remove(key: string) {
    if (key && key !== 'undefined') {
      this.storage.removeItem(key);
    }

    return;
  }
}
