import {ITwitterQuery} from "../../Public/Models/Interfaces/ITwitterQuery";

// Custom HttpClientHandler.
export interface ITwitterClientHandler {
  // Contains all the information required for the HttpClient to create and execute the request.
  twitterQuery: ITwitterQuery;
}
