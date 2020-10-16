import {ISampleStream} from "../../Streaming/ISampleStream";
import {ICreateSampleStreamParameters} from "../../Parameters/StreamsClient/CreateSampleStreamParameters";
import {IFilteredStream} from "../../Streaming/IFilteredStream";
import {ICreateFilteredTweetStreamParameters} from "../../Parameters/StreamsClient/CreateFilteredStreamParameters";
import {ITweetStream} from "../../../Core/Streaming/ITweetStream";
import {ICreateTweetStreamParameters} from "../../Parameters/StreamsClient/CreateTweetStreamParameters";
import {ITrackedStream} from "../../../Core/Streaming/ITrackedStream";
import {ICreateTrackedTweetStreamParameters} from "../../Parameters/StreamsClient/CreateTrackedStreamParameters";

export interface IStreamsClient {
  createSampleStream(): ISampleStream;

  // Create a stream notifying that a random tweets has been created.
  // https://dev.twitter.com/streaming/reference/get/statuses/sample
  createSampleStream(parameters: ICreateSampleStreamParameters): ISampleStream;

  createFilteredStream(): IFilteredStream;

  // Create a stream notifying the client when a tweet matching the specified criteria is created.
  // https://dev.twitter.com/streaming/reference/post/statuses/filter
  createFilteredStream(parameters: ICreateFilteredTweetStreamParameters): IFilteredStream;

  createTweetStream(): ITweetStream;

  // Create a stream that receive tweets
  createTweetStream(parameters: ICreateTweetStreamParameters): ITweetStream;

  createTrackedTweetStream(): ITrackedStream;

  // Create a stream that receive tweets. In addition this stream allow you to filter the results received.
  createTrackedTweetStream(parameters: ICreateTrackedTweetStreamParameters): ITrackedStream;
}
