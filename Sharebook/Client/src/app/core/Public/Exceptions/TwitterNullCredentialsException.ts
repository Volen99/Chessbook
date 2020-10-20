import {TwitterInvalidCredentialsException} from "./TwitterInvalidCredentialsException";

// Exception raised when providing null credentials
export class TwitterNullCredentialsException extends TwitterInvalidCredentialsException {
  constructor(message: string) {
    if (message) {
      super(message);
    } else {
      super("You must set the credentials to use the Twitter API. (Read the exception description field for more information)");
    }
  }

  get description(): string {
    return "Before performing any query please set the credentials : Auth.SetUserCredentials(\"CONSUMER_KEY\", \"CONSUMER_SECRET\", \"ACCESS_TOKEN\", \"ACCESS_TOKEN_SECRET\");";
  }
}

// public TwitterNullCredentialsException() : base("You must set the credentials to use the Twitter API. (Read the exception description field for more information)")
// {
// }
//
// public TwitterNullCredentialsException(string message) : base(message)
// {
// }
