import {Inject, Injectable, InjectionToken} from "@angular/core";

import {ITimelineClientParametersValidator} from "./TimelineClientParametersValidator";
import {IUserQueryValidator, IUserQueryValidatorToken} from "./UserQueryValidator";
import {TimelineParameters} from "./parameters-types";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import {IGetUserTimelineParameters} from "../../../Public/Parameters/TimelineClient/GetUserTimelineParameters";

export interface ITimelineClientRequiredParametersValidator extends ITimelineClientParametersValidator {
}

export const ITimelineClientRequiredParametersValidatorToken = new InjectionToken<ITimelineClientRequiredParametersValidator>('ITimelineClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new TimelineClientRequiredParametersValidator(Inject(UserQueryValidator)),
});

@Injectable()
export class TimelineClientRequiredParametersValidator implements ITimelineClientRequiredParametersValidator {
  private readonly _userQueryValidator: IUserQueryValidator;

  constructor(@Inject(IUserQueryValidatorToken) userQueryValidator: IUserQueryValidator) {
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
