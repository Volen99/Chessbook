import { Observable } from 'rxjs';

export interface Contact {
  name: string;
  picture: string;
  type: string;
}

export interface RecentUser extends Contact {
  time: number;
}

export abstract class PhoneData {
  abstract getContacts(): Observable<Contact[]>;
  abstract getRecentUsers(): Observable<RecentUser[]>;
}
