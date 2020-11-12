import {Inject, Injectable} from "@angular/core";

import {ITwitterResult, ITwitterResultToken} from "../../Core/Web/TwitterResult";
import Exception from "typescript-dotnet-commonjs/System/Exception";

@Injectable({
  providedIn: 'root',
})
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
