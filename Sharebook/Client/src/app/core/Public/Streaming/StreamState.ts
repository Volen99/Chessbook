// Enumeration listing how the Stream is supposed to behave
export enum StreamState {
  // The stream is not running. In this state the stream configuration can be changed.
  Stop = 0,

  // Stream is Running.
  Running = 1,

  // Stream is paused. The stream configuration cannot be changed in this state.
  Pause = 2
}
