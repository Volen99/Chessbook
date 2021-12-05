import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

export type RegisterClientFormFieldOptions = {
  name?: string
  label?: string
  type: 'input' | 'input-checkbox' | 'input-password' | 'input-textarea' | 'markdown-text' | 'markdown-enhanced' | 'select' | 'html'

  // For select type
  options?: { value: string, label: string }[]

  // For html type
  html?: string

  descriptionHTML?: string

  // Default setting value
  default?: string | boolean

  // Not supported by plugin setting registration, use registerSettingsScript instead
  hidden?: (options: any) => boolean
};

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})

export class DynamicFormFieldComponent {
  @Input() form: FormGroup;
  @Input() formErrors: any;
  @Input() setting: RegisterClientFormFieldOptions;
}
