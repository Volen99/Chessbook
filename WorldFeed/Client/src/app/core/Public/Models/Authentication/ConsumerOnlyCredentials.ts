import {IReadOnlyConsumerCredentials} from "../../../Core/Models/Authentication/ReadOnlyConsumerCredentials";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

export interface IConsumerOnlyCredentials extends IReadOnlyConsumerCredentials {
  // Key identifying a specific consumer application
  /*new*/
  consumerKey: string;

  // Secret Key identifying a specific consumer application
  /*new*/
  consumerSecret: string;

  // Token required for Application Only Authentication
  /*new*/
  bearerToken: string;
}

// Authentication tokens of a specific app
export class ConsumerOnlyCredentials implements IConsumerOnlyCredentials {
  constructor(consumerKeyOrCredentials?: string | IReadOnlyConsumerCredentials, consumerSecret?: string, bearerToken?: string) {
    if (Type.isString(consumerKeyOrCredentials)) {
      if (consumerSecret) {
        this.consumerKey = consumerKeyOrCredentials;
        this.consumerSecret = consumerSecret;

        if (bearerToken) {
          this.bearerToken = bearerToken;
        }
      }
    } else {
      this.consumerKey = consumerKeyOrCredentials?.ConsumerKey;
      this.consumerSecret = consumerKeyOrCredentials?.ConsumerSecret;
      this.bearerToken = consumerKeyOrCredentials?.BearerToken;
    }
  }

  public consumerKey: string;
  public consumerSecret: string;
  public bearerToken: string;
}

// public ConsumerOnlyCredentials()
// {
// }
//
// public ConsumerOnlyCredentials(string consumerKey, string consumerSecret)
// {
//     ConsumerKey = consumerKey;
//     ConsumerSecret = consumerSecret;
// }

// public ConsumerOnlyCredentials(string consumerKey, string consumerSecret, string bearerToken)
// {
//     ConsumerKey = consumerKey;
//     ConsumerSecret = consumerSecret;
//     BearerToken = bearerToken;
// }

// public ConsumerOnlyCredentials(IReadOnlyConsumerCredentials creds)
// {
//     ConsumerKey = creds?.ConsumerKey;
//     ConsumerSecret = creds?.ConsumerSecret;
//     BearerToken = creds?.BearerToken;
// }
