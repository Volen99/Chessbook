export enum ProcessingState {
  Undefined,

  // Processing is pending
  Pending,

  // Processing is in progress
  InProgress,

  // Processing has completed successfully
  Succeeded,

  // Processing has failed to complete
  Failed
}
