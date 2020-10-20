import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

// For more information visit: https://developer.twitter.com/en/docs/basics/authentication/api-reference/invalidate_access_token
export interface IInvalidateAccessTokenParameters extends ICustomRequestParameters {
}

export class InvalidateAccessTokenParameters extends CustomRequestParameters implements IInvalidateAccessTokenParameters {
}
