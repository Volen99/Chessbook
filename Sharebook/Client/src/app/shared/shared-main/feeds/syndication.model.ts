import {FeedFormat} from "../../models/enums/feed-format";

export interface Syndication {
  format: FeedFormat;
  label: string;
  url: string;
}
