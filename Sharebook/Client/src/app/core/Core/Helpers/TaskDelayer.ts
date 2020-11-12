import {Injectable, InjectionToken} from "@angular/core";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";

export interface ITaskDelayer {
  delay(timeSpan: TimeSpan): Promise<void>;
}

export const ITaskDelayerToken = new InjectionToken<ITaskDelayer>('ITaskDelayer', {
  providedIn: 'root',
  factory: () => new TaskDelayer(),
});

@Injectable({
  providedIn: 'root',
})
export class TaskDelayer implements ITaskDelayer {
  public delay(timeSpan: TimeSpan): Promise<void> {
    return new Promise(resolve =>
      setTimeout(resolve, timeSpan.milliseconds)
    );
  }
}
