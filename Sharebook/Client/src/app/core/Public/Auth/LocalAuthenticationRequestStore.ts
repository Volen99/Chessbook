import {IAuthenticationRequest} from "../Models/Authentication/IAuthenticationRequest";

export interface IAuthenticationRequestStore {
  // Append an AuthenticationRequest identifier to a callback url
  appendAuthenticationRequestIdToCallbackUrl(callbackUrl: string, authenticationRequestId: string): string;

  // Extract the AuthenticationRequest identifier from the received callback url
  extractAuthenticationRequestIdFromCallbackUrl(callbackUrl: string): string;

  // Returns the AuthenticationRequest from its identifier
  getAuthenticationRequestFromIdAsync(authenticationRequestTokenId: string): Promise<IAuthenticationRequest>;

  // Stores the AuthenticationRequest
  addAuthenticationTokenAsync(authenticationRequestId: string, authenticationRequest: IAuthenticationRequest): Promise<void>;

  // Removes an AuthenticationRequest from the -+store
  removeAuthenticationTokenAsync(authenticationRequestId: string): Promise<void>;
}

export class LocalAuthenticationRequestStore implements IAuthenticationRequestStore {
  addAuthenticationTokenAsync(authenticationRequestId: string, authenticationRequest: IAuthenticationRequest): Promise<void> {
    return undefined;
  }

  appendAuthenticationRequestIdToCallbackUrl(callbackUrl: string, authenticationRequestId: string): string {
    return "";
  }

  extractAuthenticationRequestIdFromCallbackUrl(callbackUrl: string): string {
    return "";
  }

  getAuthenticationRequestFromIdAsync(authenticationRequestTokenId: string): Promise<IAuthenticationRequest> {
    return Promise.resolve(undefined);
  }

  removeAuthenticationTokenAsync(authenticationRequestId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

}

// export class LocalAuthenticationRequestStore implements IAuthenticationRequestStore {
//   private readonly _store: ConcurrentDictionary<string, IAuthenticationRequest>;
//   private CallbackTokenIdParameterName: string = "tweetinvi_auth_request_id";
//
//   constructor() {
//     this._store = new ConcurrentDictionary<string, IAuthenticationRequest>();
//   }
//
//
//         public /*virtual*/  extractAuthenticationRequestIdFromCallbackUrl(callbackUrl: string): string
//         {
//             var queryParameter = CallbackTokenIdParameterName;
//             var tokenId = callbackUrl.GetURLParameter(queryParameter);
//
//             if (tokenId == null)
//             {
//                 throw new ArgumentException(`Could not extract the token id as '{queryParameter}' was not part of the url`, nameof(callbackUrl));
//             }
//
//             return tokenId;
//         }
//
//         public /*virtual*/  appendAuthenticationRequestIdToCallbackUrl(callbackUrl: string, authenticationRequestId: string): string
//         {
//             return callbackUrl.AddParameterToQuery(CallbackTokenIdParameterName, authenticationRequestId);
//         }
//
//         public /*virtual*/  getAuthenticationRequestFromIdAsync(authenticationRequestTokenId: string): Promise<IAuthenticationRequest>
//         {
//             this._store.TryGetValue(authenticationRequestTokenId, out var authenticationRequest);
//             return Promise.FromResult(authenticationRequest);
//         }
//
//         public /*virtual*/  addAuthenticationTokenAsync(authenticationRequestId: string, authenticationRequest: IAuthenticationRequest): Task<void>
//         {
//             this._store.AddOrUpdate(authenticationRequestId, s => authenticationRequest, (s, token) => authenticationRequest);
//             return Promise.CompletedTask;
//         }
//
//         public /*virtual*/  removeAuthenticationTokenAsync(authenticationRequestId: string): Promise<void>
//         {
//             this._store.TryRemove(authenticationRequestId, out _);
//             return Promise.CompletedTask;
//         }
//     }
// }
