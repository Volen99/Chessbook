import {Component, Input} from '@angular/core';
import {ProcessedAbuse} from './processed-abuse.model';
import {AbusePredefinedReasonsString} from "../models/moderation/abuse/abuse-reason.model";
import {durationToString} from "../../helpers/utils";
import {User} from "../shared-main/user/user.model";

@Component({
  selector: 'my-abuse-details',
  templateUrl: './abuse-details.component.html',
  styleUrls: ['../shared-moderation/moderation.scss', './abuse-details.component.scss']
})
export class AbuseDetailsComponent {
  @Input() abuse: ProcessedAbuse;
  @Input() isAdminView: boolean;
  @Input() baseRoute: string;

  private predefinedReasonsTranslations: { [key in AbusePredefinedReasonsString]: string };

  constructor() {
    this.predefinedReasonsTranslations = {
      violentOrRepulsive: `Violent or Repulsive`,
      hatefulOrAbusive: `Hateful or Abusive`,
      spamOrMisleading: `Spam or Misleading`,
      privacy: `Privacy`,
      rights: `Copyright`,
      serverRules: `Server rules`,
      thumbnails: `Thumbnails`,
      captions: `Captions`
    };
  }

  get startAt() {
    return durationToString(this.abuse.video.startAt);
  }

  get endAt() {
    return durationToString(this.abuse.video.endAt);
  }

  getPredefinedReasons() {
    if (!this.abuse.predefinedReasons) return [];

    return this.abuse.predefinedReasons.map(r => ({
      id: r,
      label: this.predefinedReasonsTranslations[r]
    }));
  }

  switchToDefaultAvatar($event: Event) {
    ($event.target as HTMLImageElement).src = this.abuse.flaggedAccount.profileImageUrlHttps;  // User.GET_DEFAULT_AVATAR_URL();
  }
}
