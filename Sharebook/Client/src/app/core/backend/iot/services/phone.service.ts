import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PhoneData, Contact, RecentUser } from '../../../interfaces/iot/phone';
import { PhoneApi } from '../api/phone.api';

@Injectable()
export class PhoneService extends PhoneData {

  constructor(private phoneApi: PhoneApi) {
    super();
  }

  getContacts(): Observable<Contact[]> {
    return this.phoneApi.getContacts()
      .pipe(map(data => data.map(item => {
        return {
          id: item.id,
          type: item.numberType,
          name: `${item.firstName} ${item.lastName}`,
          picture: item.picture,
        };
      })));
  }

  getRecentUsers(): Observable<RecentUser[]> {
    return this.phoneApi.getRecentCalls()
      .pipe(map(data => data.map(item => {
        return {
          type: item.contact.numberType,
          time: item.dateOfCall,
          name: `${item.contact.firstName} ${item.contact.lastName}`,
          picture: item.picture,
        };
      })));
  }
}
