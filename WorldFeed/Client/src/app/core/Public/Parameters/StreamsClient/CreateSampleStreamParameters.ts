import {CreateTweetStreamParameters, ICreateTweetStreamParameters} from "./CreateTweetStreamParameters";

export interface ICreateSampleStreamParameters extends ICreateTweetStreamParameters {
}

export class CreateSampleStreamParameters extends CreateTweetStreamParameters implements ICreateSampleStreamParameters {
}
