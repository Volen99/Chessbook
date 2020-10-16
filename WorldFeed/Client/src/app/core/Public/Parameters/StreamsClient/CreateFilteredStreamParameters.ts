import {CreateTrackedTweetStreamParameters, ICreateTrackedTweetStreamParameters} from "./CreateTrackedStreamParameters";

export interface ICreateFilteredTweetStreamParameters extends ICreateTrackedTweetStreamParameters {
}

export class CreateFilteredTweetStreamParameters extends CreateTrackedTweetStreamParameters implements ICreateFilteredTweetStreamParameters {
}
