import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterClientHandler} from "./ITwitterClientHandler";
import {ITwitterResponse} from "./ITwitterResponse";

// Generate a Token that can be used to perform OAuth queries
export interface IWebRequestExecutor {
  // Execute a TwitterQuery and return the resulting json data.
  executeQueryAsync(request: ITwitterRequest, handler?: ITwitterClientHandler): Promise<ITwitterResponse>;

  // Execute a multipart TwitterQuery and return the resulting json data.
  executeMultipartQueryAsync(request: ITwitterRequest): Promise<ITwitterResponse>;
}

