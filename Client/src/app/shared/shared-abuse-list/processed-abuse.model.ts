import {SafeHtml} from '@angular/platform-browser';
import {AdminAbuse} from "../models/moderation/abuse/abuse.model";
import {User} from "../shared-main/user/user.model";

// Don't use an abuse model because we need external services to compute some properties
// And this model is only used in this component
export type ProcessedAbuse = AdminAbuse & {
  moderationCommentHtml?: string,
  reasonHtml?: string
  embedHtml?: SafeHtml
  updatedAt?: Date

  // override bare server-side definitions with rich client-side definitions
  reporterAccount?: User
  flaggedAccount?: User

  truncatedCommentHtml?: string
  commentHtml?: string

  post: AdminAbuse['post'] & {
    channel: AdminAbuse['post']['channel'] /*& {
      ownerAccount: User
    }*/
  }
};
