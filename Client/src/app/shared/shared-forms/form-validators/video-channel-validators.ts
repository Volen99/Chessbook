import {Validators} from '@angular/forms';
import {BuildFormValidator} from './form-validator.model';

export const VIDEO_CHANNEL_NAME_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
    Validators.pattern(/^[a-z0-9][a-z0-9._]*$/)
  ],
  MESSAGES: {
    'required': `Name is required.`,
    'minlength': `Name must be at least 1 character long.`,
    'maxlength': `Name cannot be more than 50 characters long.`,
    'pattern': `Name should be lowercase alphanumeric; dots and underscores are allowed.`
  }
};

export const VIDEO_CHANNEL_DISPLAY_NAME_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50)
  ],
  MESSAGES: {
    'required': `Display name is required.`,
    'minlength': `Display name must be at least 1 character long.`,
    'maxlength': `Display name cannot be more than 50 characters long.`
  }
};

export const VIDEO_CHANNEL_DESCRIPTION_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [
    Validators.minLength(3),
    Validators.maxLength(1000)
  ],
  MESSAGES: {
    'minlength': `Description must be at least 3 characters long.`,
    'maxlength': `Description cannot be more than 1000 characters long.`
  }
};

export const VIDEO_CHANNEL_SUPPORT_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [
    Validators.minLength(3),
    Validators.maxLength(1000)
  ],
  MESSAGES: {
    'minlength': `Support text must be at least 3 characters long.`,
    'maxlength': `Support text cannot be more than 1000 characters long`
  }
};
