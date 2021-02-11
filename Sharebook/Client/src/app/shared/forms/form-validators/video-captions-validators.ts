import {Validators} from '@angular/forms';
import {BuildFormValidator} from './form-validator.model';

export const VIDEO_CAPTION_LANGUAGE_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required],
  MESSAGES: {
    'required': `Video caption language is required.`
  }
};

export const VIDEO_CAPTION_FILE_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required],
  MESSAGES: {
    'required': `Video caption file is required.`
  }
};
