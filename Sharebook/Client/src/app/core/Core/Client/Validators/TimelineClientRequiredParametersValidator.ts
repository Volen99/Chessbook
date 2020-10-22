import {ITimelineClientParametersValidator} from "./TimelineClientParametersValidator";
import {IUserQueryValidator} from "./UserQueryValidator";
import {TimelineParameters} from "./parameters-types";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import {IGetUserTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {InjectionToken} from "@angular/core";

export interface ITimelineClientRequiredParametersValidator extends ITimelineClientParametersValidator {
}

export const ITimelineClientRequiredParametersValidatorToken = new InjectionToken<ITimelineClientRequiredParametersValidator>('ITimelineClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new TimelineClientRequiredParametersValidator(),
});

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
      this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.user, `${nameof(parameters.user)}`);
    }
  }

  private isIGetUserTimelineParameters(parameters: TimelineParameters): parameters is IGetUserTimelineParameters {
    return (parameters as IGetUserTimelineParameters).customQueryParameters !== undefined;
  }
}
