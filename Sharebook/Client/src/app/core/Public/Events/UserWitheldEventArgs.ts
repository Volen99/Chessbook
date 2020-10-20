import {EventArgs} from "../../../c#-objects/TypeScript.NET-Core/packages/Events/source/EventArgs";
import {IUserWitheldInfo} from "../Streaming/Events/IUserWitheldInfo";

// Event informing that some user event happened by were blocked by the country
export class UserWitheldEventArgs extends EventArgs {
  constructor(userWitheldInfo: IUserWitheldInfo) {
    super();
    this.UserWitheldInfo = userWitheldInfo;
  }

  public UserWitheldInfo: IUserWitheldInfo;
}
