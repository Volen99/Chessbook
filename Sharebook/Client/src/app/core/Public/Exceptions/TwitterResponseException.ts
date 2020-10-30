import Exception from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";
import {ITwitterResult, ITwitterResultToken} from "../../Core/Web/TwitterResult";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class TwitterResponseException extends Exception {
  constructor(@Inject(ITwitterResultToken) twitterResult: ITwitterResult,
              message?: string) {
    if (message) {
      super(message);

      this.twitterResult = twitterResult;
    } else {
      this.twitterResult = twitterResult;
    }
  }

  public twitterResult: ITwitterResult;
}

// public TwitterResponseException(ITwitterResult twitterResult)
// {
//     TwitterResult = twitterResult;
// }
//
// public TwitterResponseException(ITwitterResult twitterResult, string message) : base(message)
// {
//     TwitterResult = twitterResult;
// }
