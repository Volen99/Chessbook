import {CredentialsHashCodeGenerator} from "../../Helpers/CredentialsHashCodeGenerator";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

export interface IReadOnlyConsumerCredentialsWithoutBearer {
  // ConsumerKey identifying a unique application
  consumerKey: string;

  // ConsumerSecret identifying a unique application
  consumerSecret: string;
}

export interface IReadOnlyConsumerCredentials extends IReadOnlyConsumerCredentialsWithoutBearer {
  // Bearer token used to make API requests on an application's own behalf.
  bearerToken: string;
}

// Readonly version of consumer credentials
export class ReadOnlyConsumerCredentials implements IReadOnlyConsumerCredentials {
  constructor(consumerKeyOrSource: string | IReadOnlyConsumerCredentials, consumerSecret: string, bearerToken?: string) {
    if (!Type.isString(consumerKeyOrSource)) {
      this.consumerKey = consumerKeyOrSource?.consumerKey;
      this.consumerSecret = consumerKeyOrSource?.consumerSecret;
      this.bearerToken = consumerKeyOrSource?.bearerToken;
    } else {
      this.consumerKey = consumerKeyOrSource;
      this.consumerSecret = consumerSecret;

      if (bearerToken) {
        this.bearerToken = bearerToken;
      }
    }
  }

  public consumerKey: string;
  public consumerSecret: string;
  public bearerToken: string;

  public equals(obj: object): boolean {
    return this.getHashCode() === obj?.GetHashCode();
  }

  public getHashCode(): number {
    return CredentialsHashCodeGenerator.createHash(this).GetHashCode();
  }
}


// public ReadOnlyConsumerCredentials(consumerKey: string, consumerSecret: string)
// {
//     ConsumerKey = consumerKey;
//     ConsumerSecret = consumerSecret;
// }

// public ReadOnlyConsumerCredentials(consumerKey: string, consumerSecret: string, bearerToken: string)
// {
//     ConsumerKey = consumerKey;
//     ConsumerSecret = consumerSecret;
//     BearerToken = bearerToken;
// }

// public ReadOnlyConsumerCredentials(source: IReadOnlyConsumerCredentials)
// {
//   ConsumerKey = source?.ConsumerKey;
//   ConsumerSecret = source?.ConsumerSecret;
//   BearerToken = source?.BearerToken;
// }
