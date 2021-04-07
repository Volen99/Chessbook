import { Validators } from '@angular/forms'
import { BuildFormValidator } from './form-validator.model'

export const RESET_PASSWORD_CONFIRM_VALIDATOR: BuildFormValidator = {
  VALIDATORS: [
    Validators.required
  ],
  MESSAGES: {
    'required': `Confirmation of the password is required.`
  }
}
