import Exception from "typescript-dotnet-commonjs/System/Exception";

// Exception raised when attempting to move to a next page of an iterator that already completed its lifecycle.
export class TwitterIteratorAlreadyCompletedException extends Exception {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super("Iterator already completed. Create another iterator if you want to make another search");
    }
  }
}

// public TwitterIteratorAlreadyCompletedException(string message) : base(message)
// {
//
// }
//
// public TwitterIteratorAlreadyCompletedException() : this("Iterator already completed. Create another iterator if you want to make another search")
// {
// }
