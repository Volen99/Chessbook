import Exception from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";

// An exception that could not be handled by WorldFeed was thrown. Please report such errors on github
export class UnexpectedExceptionThrownEvent {

  constructor(exception: Exception) {
    this.Exception = exception;
  }

  public Exception: Exception;
}
