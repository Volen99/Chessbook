import {Validators} from '@angular/forms';
import {BuildFormValidator} from './form-validator.model';

export const FROM_EMAIL_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.email],
  MESSAGES: {
    'required': `Email is required.`,
    'email': `Email must be valid.`
  }
};

export const FROM_NAME_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(120)
  ],
  MESSAGES: {
    'required': `Your name is required.`,
    'minlength': `Your name must be at least 1 character long.`,
    'maxlength': `Your name cannot be more than 120 characters long.`
  }
};

export const SUBJECT_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(120)
  ],
  MESSAGES: {
    'required': `A subject is required.`,
    'minlength': `The subject must be at least 1 character long.`,
    'maxlength': `The subject cannot be more than 120 characters long.`
  }
};

export const BODY_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(5000)
  ],
  MESSAGES: {
    'required': `A message is required.`,
    'minlength': `The message must be at least 3 characters long.`,
    'maxlength': `The message cannot be more than 5000 characters long.`
  }
};
