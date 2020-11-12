import {EventEmitter} from "@angular/core";

// Extension methods to ease the use of events

export abstract class EventHelpers {
  // public static  Raise(this: object, handler: EventEmitter<T>): void
  // {
  //     handler?.emit(this, EventArgs.Empty);
  // }

  public static Raise<T>(this: object, handler: EventEmitter<T>, arg: T): void {
    handler?.emit(arg);
  }

  // public static  Raise<T>(this object o, object sender, EventHandler<T> handler, T arg): void
  // {
  //     handler?.Invoke(sender, arg);
  // }
  //
  // public static  Raise<T>(this object o, EventHandler<GenericEventArgs<T>> handler, T arg): void
  // {
  //     handler?.Invoke(o, new GenericEventArgs<T>(arg));
  // }
}
