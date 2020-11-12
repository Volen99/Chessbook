import {IReadOnlyTwitterCredentials} from "../../../Core/Models/Authentication/ReadOnlyTwitterCredentials";
import {IReadOnlyConsumerCredentials} from "../../../Core/Models/Authentication/ReadOnlyConsumerCredentials";
import {CredentialsHashCodeGenerator} from "../../../Core/Helpers/CredentialsHashCodeGenerator";
import {InjectionToken} from "@angular/core";

// Defines a contract of 4 information to connect to an OAuth service
export interface ITwitterCredentials extends IReadOnlyTwitterCredentials {
  // Key identifying a specific consumer application
  /*new*/ consumerKey: string;

  // <summary>x
  // Secret Key identifying a specific consumer application
  /*new*/ consumerSecret: string;

  // Token required for Application Only Authentication
  /*new*/ bearerToken: string;

  // Key provided to the consumer to provide an authentication of the client
  /*new*/ accessToken: string;

  // Secret Key provided to the consumer to provide an authentication of the client
  /*new*/ accessTokenSecret: string;
}

export const ITwitterCredentialsToken = new InjectionToken<ITwitterCredentials>('ITwitterCredentials', {
  providedIn: 'root',
  factory: () => new TwitterCredentials(),
});

// This class provides host basic information for authorizing a OAuth
// consumer to connect to a service. It does not contain any logic
export class TwitterCredentials implements ITwitterCredentials {
  constructor(consumerKey?: string, consumerSecret?: string, bearerToken?: string, accessToken?: string,
              accessTokenSecret?: string, sourceTwitter?: IReadOnlyTwitterCredentials,
              sourceConsumer?: IReadOnlyConsumerCredentials) {
    if (consumerKey || consumerSecret) {
      this.consumerKey = consumerKey;
      this.consumerSecret = consumerSecret;

      if (bearerToken) {
        this.bearerToken = bearerToken;
      } else if (accessToken && accessTokenSecret) {
        this.accessToken = accessToken;
        this.accessTokenSecret = accessTokenSecret;
      }
    } else if (sourceTwitter) {
      this.consumerKey = sourceTwitter.consumerKey;
      this.consumerSecret = sourceTwitter.consumerSecret;
      this.bearerToken = sourceTwitter.bearerToken;
      this.accessToken = sourceTwitter.accessToken;
      this.accessTokenSecret = sourceTwitter.accessTokenSecret;
      this.bearerToken = sourceTwitter.bearerToken;
    } else if (sourceConsumer) {
      this.consumerKey = sourceConsumer.consumerKey;
      this.consumerSecret = sourceConsumer.consumerSecret;
      this.bearerToken = sourceConsumer.bearerToken;
    }
  }

  public consumerKey: string;

  public consumerSecret: string;

  public bearerToken: string;

  public accessToken: string;

  public accessTokenSecret: string;

  public equals(obj: object): boolean {
    return null; // return GetHashCode() === obj?.GetHashCode();
  }

  public getHashCode(): number {
   return null; // return CredentialsHashCodeGenerator.createHash(this).GetHashCode();
  }
}


// public TwitterCredentials()
// {
//
// }

// /// <param name="consumerKey">Your application consumer key</param>
// /// <param name="consumerSecret">Your application consumer secret</param>
// public TwitterCredentials(string consumerKey, string consumerSecret)
// {
//     ConsumerKey = consumerKey;
//     ConsumerSecret = consumerSecret;
// }

// /// <param name="consumerKey">Your application consumer key</param>
// /// <param name="consumerSecret">Your application consumer secret</param>
// /// <param name="bearerToken">Your application Bearer Token</param>
// public TwitterCredentials(string consumerKey, string consumerSecret, string bearerToken)
// {
//     ConsumerKey = consumerKey;
//     ConsumerSecret = consumerSecret;
//     BearerToken = bearerToken;
// }

/// <param name="consumerKey">Your application consumer key</param>
/// <param name="consumerSecret">Your application consumer secret</param>
/// <param name="accessToken">The user token</param>
/// <param name="accessTokenSecret">The user token secret</param>
// public TwitterCredentials(string consumerKey, string consumerSecret, string accessToken, string accessTokenSecret)
// {
//     ConsumerKey = consumerKey;
//     ConsumerSecret = consumerSecret;
//     AccessToken = accessToken;
//     AccessTokenSecret = accessTokenSecret;
// }

// public TwitterCredentials(IReadOnlyTwitterCredentials source)
// {
//     if (source == null)
//     {
//         return;
//     }
//
//     ConsumerKey = source.ConsumerKey;
//     ConsumerSecret = source.ConsumerSecret;
//     BearerToken = source.BearerToken;
//     AccessToken = source.AccessToken;
//     AccessTokenSecret = source.AccessTokenSecret;
//     BearerToken = source.BearerToken;
//
// }

// public TwitterCredentials(IReadOnlyConsumerCredentials source)
// {
//   if (source == null)
//   {
//     return;
//   }
//
//   ConsumerKey = source.ConsumerKey;
//   ConsumerSecret = source.ConsumerSecret;
//   BearerToken = source.BearerToken;
// }
