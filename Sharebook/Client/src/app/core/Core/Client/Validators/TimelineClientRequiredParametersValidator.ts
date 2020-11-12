import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ITimelineClientParametersValidator} from "./TimelineClientParametersValidator";
import {IUserQueryValidator, IUserQueryValidatorToken, UserQueryValidator} from "./UserQueryValidator";
import {TimelineParameters} from "./parameters-types";
import {IGetUserTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetUserTimelineParameters";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";

export interface ITimelineClientRequiredParametersValidator extends ITimelineClientParametersValidator {
}

export const ITimelineClientRequiredParametersValidatorToken = new InjectionToken<ITimelineClientRequiredParametersValidator>('ITimelineClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new TimelineClientRequiredParametersValidator(inject(UserQueryValidator)),
});

@Injectable({
  providedIn: 'root',
})
export class TimelineClientRequiredParametersValidator implements ITimelineClientRequiredParametersValidator {
  private readonly _userQueryValidator: IUserQueryValidator;

  constructor(@Inject(IUserQueryValidatorToken) userQueryValidator: IUserQueryValidator) {
    this._userQueryValidator = userQueryValidator;
  }

  public validate(parameters: TimelineParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(`nameof(parameters)`);
    }

    if (this.isIGetUserTimelineParameters(parameters)) {
      this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.user, `${`nameof(parameters.user)`}`);
    }
  }

  private isIGetUserTimelineParameters(parameters: TimelineParameters): parameters is IGetUserTimelineParameters {
    return (parameters as IGetUserTimelineParameters).customQueryParameters !== undefined;
  }
}
