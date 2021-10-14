import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {BuildFormValidator} from './form-validator.model';

export const VIDEO_NAME_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.minLength(3), Validators.maxLength(120)],
  MESSAGES: {
    'required': `Video name is required.`,
    'minlength': `Video name must be at least 3 characters long.`,
    'maxlength': `Video name cannot be more than 120 characters long.`
  }
};

export const VIDEO_PRIVACY_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [/*Validators.required*/],
  MESSAGES: {
    // 'required': `Video privacy is required.` TODO: undo to required but make it change form-like in da upload-compa
  }
};

export const VIDEO_CATEGORY_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [],
  MESSAGES: {}
};

export const VIDEO_LICENCE_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [],
  MESSAGES: {}
};

export const VIDEO_LANGUAGE_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [],
  MESSAGES: {}
};

export const VIDEO_IMAGE_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [],
  MESSAGES: {}
};

export const VIDEO_CHANNEL_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required],
  MESSAGES: {
    'required': `Video channel is required.`
  }
};

export const VIDEO_DESCRIPTION_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.minLength(3), Validators.maxLength(10000)],
  MESSAGES: {
    'minlength': `Video description must be at least 3 characters long.`,
    'maxlength': `Video description cannot be more than 10000 characters long.`
  }
};

export const VIDEO_TAG_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.minLength(2), Validators.maxLength(30)],
  MESSAGES: {
    'minlength': `A tag should be more than 2 characters long.`,
    'maxlength': `A tag should be less than 30 characters long.`
  }
};

export const VIDEO_TAGS_ARRAY_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.maxLength(5), arrayTagLengthValidator()],
  MESSAGES: {
    'maxlength': `A maximum of 5 tags can be used on a post.`,
    'arrayTagLength': `A tag should be more than 1 and less than 30 characters long.`
  }
};

export const VIDEO_SUPPORT_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.minLength(3), Validators.maxLength(1000)],
  MESSAGES: {
    'minlength': `Video support must be at least 3 characters long.`,
    'maxlength': `Video support cannot be more than 1000 characters long.`
  }
};

export const VIDEO_SCHEDULE_PUBLICATION_AT_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [],
  MESSAGES: {
    'required': `A date is required to schedule video update.`
  }
};

export const VIDEO_ORIGINALLY_PUBLISHED_AT_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [],
  MESSAGES: {}
};

function arrayTagLengthValidator(min = 2, max = 30): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    const array = control.value as Array<string>;

    if (array.every(e => e.length >= min && e.length <= max)) {
      return null;
    }

    return {'arrayTagLength': true};
  };
}
