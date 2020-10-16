import TimeSpan from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";

export interface ITaskDelayer {
  delay(timeSpan: TimeSpan): Promise<void>;
}

export class TaskDelayer implements ITaskDelayer {
  public delay(timeSpan: TimeSpan): Promise<void> {
    return Promise.Delay(timeSpan);
  }
}
