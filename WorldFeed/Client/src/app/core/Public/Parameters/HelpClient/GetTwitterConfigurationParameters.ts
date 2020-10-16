import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";

export interface IGetTwitterConfigurationParameters extends ICustomRequestParameters {
}

export class GetTwitterConfigurationParameters extends CustomRequestParameters implements IGetTwitterConfigurationParameters {
}
