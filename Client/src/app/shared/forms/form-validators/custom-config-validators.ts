import {Validators} from '@angular/forms';
import {BuildFormValidator} from './form-validator.model';

export const INSTANCE_NAME_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required],
  MESSAGES: {
    'required': `Instance name is required.`
  }
};

export const INSTANCE_SHORT_DESCRIPTION_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.max(250)],
  MESSAGES: {
    'max': `Short description should not be longer than 250 characters.`
  }
};

export const SERVICES_TWITTER_USERNAME_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required],
  MESSAGES: {
    'required': `Twitter username is required.`
  }
};

export const CACHE_PREVIEWS_SIZE_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')],
  MESSAGES: {
    'required': `Previews cache size is required.`,
    'min': `Previews cache size must be greater than 1.`,
    'pattern': `Previews cache size must be a number.`
  }
};

export const CACHE_CAPTIONS_SIZE_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.min(1), Validators.pattern('[0-9]+')],
  MESSAGES: {
    'required': `Captions cache size is required.`,
    'min': `Captions cache size must be greater than 1.`,
    'pattern': `Captions cache size must be a number.`
  }
};

export const SIGNUP_LIMIT_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.min(-1), Validators.pattern('-?[0-9]+')],
  MESSAGES: {
    'required': `Signup limit is required.`,
    'min': `Signup limit must be greater than 1.`,
    'pattern': `Signup limit must be a number.`
  }
};

export const ADMIN_EMAIL_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.email],
  MESSAGES: {
    'required': `Admin email is required.`,
    'email': `Admin email must be valid.`
  }
};

export const TRANSCODING_THREADS_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.min(0)],
  MESSAGES: {
    'required': `Transcoding threads is required.`,
    'min': `Transcoding threads must be greater or equal to 0.`
  }
};

export const CONCURRENCY_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.required, Validators.min(1)],
  MESSAGES: {
    'required': `Concurrency is required.`,
    'min': `Concurrency should be greater or equal to 1.`
  }
};

export const INDEX_URL_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.pattern(/^https:\/\//)],
  MESSAGES: {
    'pattern': `Index URL should be a URL`
  }
};

export const SEARCH_INDEX_URL_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [Validators.pattern(/^https?:\/\//)],
  MESSAGES: {
    'pattern': `Search index URL should be a URL`
  }
};
