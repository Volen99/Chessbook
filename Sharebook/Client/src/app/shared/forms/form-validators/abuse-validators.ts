import {Validators} from '@angular/forms';
import {BuildFormValidator} from './form-validator.model';

export const ABUSE_REASON_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.minLength(2), Validators.maxLength(3000)],
  MESSAGES: {
    'required': `Report reason is required.`,
    'minlength': `Report reason must be at least 2 characters long.`,
    'maxlength': `Report reason cannot be more than 3000 characters long.`
  }
};

export const ABUSE_MODERATION_COMMENT_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.minLength(2), Validators.maxLength(3000)],
  MESSAGES: {
    'required': `Moderation comment is required.`,
    'minlength': `Moderation comment must be at least 2 characters long.`,
    'maxlength': `Moderation comment cannot be more than 3000 characters long.`
  }
};

export const ABUSE_MESSAGE_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.minLength(2), Validators.maxLength(3000)],
  MESSAGES: {
    'required': `Abuse message is required.`,
    'minlength': `Abuse message must be at least 2 characters long.`,
    'maxlength': `Abuse message cannot be more than 3000 characters long.`
  }
};
