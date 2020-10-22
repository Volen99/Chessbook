import {InjectionToken} from "@angular/core";
import {EventInitiatedViaDTO} from "../../../../Core/DTO/EventInitiatedViaDTO";

export interface IEventInitiatedViaDTO {
  tweetId: number;
  welcomeMessageId?: number;
}

export const IEventInitiatedViaDTOToken = new InjectionToken<IEventInitiatedViaDTO>('IEventInitiatedViaDTO', {
  providedIn: 'root',
  factory: () => new EventInitiatedViaDTO(),
});
