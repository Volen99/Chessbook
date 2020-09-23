import {Option} from './option.model';

export interface Poll {
  options: Array<Option>; // An array of options, each having a poll position, and the text for that position
  endDatetime: string; // Time stamp (UTC) of when poll ends: "end_datetime": "Thu May 25 22:20:27 +0000 2017"
  durationMinutes: string; // Duration of poll in minutes: "duration_minutes": 60
}
