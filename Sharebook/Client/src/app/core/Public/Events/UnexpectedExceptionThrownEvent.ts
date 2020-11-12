import Exception from "typescript-dotnet-commonjs/System/Exception";

// An exception that could not be handled by Sharebook was thrown. Please report such errors on github
export class UnexpectedExceptionThrownEvent {

  constructor(exception: Exception) {
    this.exception = exception;
  }

  public exception: Exception;
}
