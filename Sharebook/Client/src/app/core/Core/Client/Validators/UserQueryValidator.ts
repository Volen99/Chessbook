import {Injectable, InjectionToken} from "@angular/core";

import {IUserIdentifier} from "../../../Public/Models/Interfaces/IUserIdentifier";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";

export interface IUserQueryValidator {
  throwIfUserCannotBeIdentified(user: IUserIdentifier): void;

  throwIfUserCannotBeIdentified(user: IUserIdentifier, parameterName: string): void;
}

export const IUserQueryValidatorToken = new InjectionToken<IUserQueryValidator>('IUserQueryValidator', {
  providedIn: 'root',
  factory: () => new UserQueryValidator(),
});

@Injectable({
  providedIn: 'root',
})
export class UserQueryValidator implements IUserQueryValidator {
  public throwIfUserCannotBeIdentified(user: IUserIdentifier, parameterName?: string): void {
    if (!parameterName) {
      parameterName = 'user';
    }

    if (user == null) {
      throw new ArgumentNullException(`${parameterName}`, `${parameterName} cannot be null`);
    }

    if (!this.isUserIdValid(user.id) && !user.idStr && !this.isScreenNameValid(user.screenName)) {
      throw new ArgumentException(`${parameterName} is not valid.`, parameterName);
    }
  }

  private isScreenNameValid(screenName: string): boolean {
    return !!screenName;  // !string.IsNullOrEmpty(screenName);
  }

  private isUserIdValid(userId: number): boolean {
    return userId > 0;
  }
}
