import {IReadOnlyConsumerCredentialsWithoutBearer} from "../../../Core/Models/Authentication/ReadOnlyConsumerCredentials";

// User authentication request containing all information required for completing an authentication process
export interface IAuthenticationRequest extends IReadOnlyConsumerCredentialsWithoutBearer {
  // Key required for user authentication.
  // This key needs to be saved when getting the result of url redirect authentication
  authorizationKey: string;

  // Secret required for user authentication
  // This secret needs to be saved when getting the result of url redirect authentication
  authorizationSecret: string;

  // Verification information received when a user accepts an application to use its account.
  // If this value is changed manually it will overridden by Tweetinvi.
  verifierCode: string;

  // URL directing the user to Twitter authentication page for your application.
  authorizationURL: string;
}
