import {AbusePredefinedReasonsString} from './abuse-reason.model';

export interface AbuseCreate {
  reason: string;

  predefinedReasons?: AbusePredefinedReasonsString[];

  account?: {
    id: number
  };

  post?: {
    id: number
    startAt?: number
    endAt?: number
  };

  comment?: {
    id: number
  };
}
