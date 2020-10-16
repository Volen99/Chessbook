import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

export interface IGetSupportedLanguagesParameters extends ICustomRequestParameters {
}

export class GetSupportedLanguagesParameters extends CustomRequestParameters implements IGetSupportedLanguagesParameters {
}
