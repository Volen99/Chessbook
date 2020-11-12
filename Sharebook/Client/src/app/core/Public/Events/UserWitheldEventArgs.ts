import {IUserWitheldInfo} from "../Streaming/Events/IUserWitheldInfo";

// Event informing that some user event happened by were blocked by the country
export class UserWitheldEventArgs /*extends EventArgs*/ {
  constructor(userWitheldInfo: IUserWitheldInfo) {
    // super();

    this.userWitheldInfo = userWitheldInfo;
  }

  public userWitheldInfo: IUserWitheldInfo;
}
