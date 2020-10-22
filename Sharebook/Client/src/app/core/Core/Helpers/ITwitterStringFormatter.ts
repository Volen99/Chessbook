import {InjectionToken} from "@angular/core";
import {TwitterStringFormatter} from "../../../logic/Helpers/TwitterStringFormatter";

export interface ITwitterStringFormatter {
  twitterEncode(source: string);

  twitterDecode(source: string);
}

export const ITwitterStringFormatterToken = new InjectionToken<ITwitterStringFormatter>('ITwitterStringFormatter', {
  providedIn: 'root',
  factory: () => new TwitterStringFormatter(),
});
