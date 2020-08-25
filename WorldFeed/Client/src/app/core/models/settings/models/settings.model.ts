import {SleepTime} from "./sleep-time.model";
import {TimeZone} from "./time-zone.model";
import {PlaceType} from "./place-type.model";

export interface Settings {
  always_use_https: boolean;
  discoverable_by_email: boolean;
  geo_enabled: symbol;
  language: any;
  protected: any;
  screen_name: string;
  show_all_inline_media: boolean;
  sleep_time: SleepTime;
  time_zone: TimeZone;
  trend_location: PlaceType;
  use_cookie_personalization: boolean;
  allow_contributor_request: string;
}
