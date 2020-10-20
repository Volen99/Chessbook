import {ITweet} from "./ITweet";

// Twitter mention
export interface IMention extends ITweet {  // Notice that IMention inherits from ITweet
  // Mention annotation
  annotations: string;
}
