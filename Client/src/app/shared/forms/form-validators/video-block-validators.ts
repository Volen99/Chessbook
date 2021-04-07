import {Validators} from '@angular/forms';
import {BuildFormValidator} from './form-validator.model';

export const VIDEO_BLOCK_REASON_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.minLength(2), Validators.maxLength(300)],
  MESSAGES: {
    'minlength': `Block reason must be at least 2 characters long.`,
    'maxlength': `Block reason cannot be more than 300 characters long.`
  }
};
