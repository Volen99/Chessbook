import {ITimelineClientParametersValidator} from "./TimelineClientParametersValidator";
import {IUserQueryValidator} from "./UserQueryValidator";
import {TimelineParameters} from "./parameters-types";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import {IGetUserTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetUserTimelineParameters";

export interface ITimelineClientRequiredParametersValidator extends ITimelineClientParametersValidator {
}

export class TimelineClientRequiredParametersValidator implements ITimelineClientRequiredParametersValidator {
  private readonly _userQueryValidator: IUserQueryValidator;

  constructor(userQueryValidator: IUserQueryValidator) {
    this._userQueryValidator = userQueryValidator;
  }

  public validate(parameters: TimelineParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (this.isIGetUserTimelineParameters(parameters)) {
      this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.User, `${nameof(parameters.User)}`);
    }
  }

  private isIGetUserTimelineParameters(parameters: TimelineParameters): parameters is IGetUserTimelineParameters {
    return (parameters as IGetUserTimelineParameters).customQueryParameters !== undefined;
  }
}
