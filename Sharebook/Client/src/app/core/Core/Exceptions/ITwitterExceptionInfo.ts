import {InjectionToken} from "@angular/core";
import {TwitterExceptionInfo} from "../Models/Properties/TwitterExceptionInfo";

export interface ITwitterExceptionInfo {
  message: string;
  code: number;
  label: string;
}

export const ITwitterExceptionInfoToken = new InjectionToken<ITwitterExceptionInfo>('ITwitterExceptionInfo', {
  providedIn: 'root',
  factory: () => new TwitterExceptionInfo(),
});
