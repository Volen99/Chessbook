import { FeedFormat } from '../../models';

export interface Syndication {
  format: FeedFormat;
  label: string;
  url: string;
}
