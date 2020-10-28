import TimeSpan from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import {InjectionToken} from "@angular/core";

export interface ITaskDelayer {
  delay(timeSpan: TimeSpan): Promise<void>;
}

export const ITaskDelayerToken = new InjectionToken<ITaskDelayer>('ITaskDelayer', {
  providedIn: 'root',
  factory: () => new TaskDelayer(),
});

export class TaskDelayer implements ITaskDelayer {
  public delay(timeSpan: TimeSpan): Promise<void> {
    return Promise.Delay(timeSpan);
  }
}
