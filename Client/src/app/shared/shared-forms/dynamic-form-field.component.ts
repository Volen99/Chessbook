import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {RegisterClientFormFieldOptions} from "../models";

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
