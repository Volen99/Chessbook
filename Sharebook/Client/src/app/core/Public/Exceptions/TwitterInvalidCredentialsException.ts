import Exception from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";
import {IReadOnlyConsumerCredentials} from "../../Core/Models/Authentication/ReadOnlyConsumerCredentials";

// Exception raised when attempting to perform operations without the proper credentials
export class TwitterInvalidCredentialsException extends Exception {
  constructor(message: string, credentials?: IReadOnlyConsumerCredentials) {
    if (credentials) {
      super("The consumer key and consumer secret must be defined!");

      this.credentials = credentials;
    } else {
      super(message);
    }
  }

  public credentials: IReadOnlyConsumerCredentials;
}

// public TwitterInvalidCredentialsException(message: string): base(message)
// {
// }
//
// public TwitterInvalidCredentialsException(IReadOnlyConsumerCredentials credentials)
// : base("The consumer key and consumer secret must be defined!")
// {
//   Credentials = credentials;
// }
