import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {
  faWalkieTalkie
} from '@fortawesome/pro-light-svg-icons';

import {NbToastrService} from "../../sharebook-nebular/theme/components/toastr/toastr.service";

@Component({
  selector: 'app-input-toggle-hidden',
  templateUrl: './input-toggle-hidden.component.html',
  styleUrls: ['./input-toggle-hidden.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputToggleHiddenComponent),
      multi: true
    }
  ]
})
export class InputToggleHiddenComponent implements ControlValueAccessor {
  @Input() inputId = Math.random().toString(11).slice(2, 8); // id cannot be left empty or undefined
  @Input() value = '';
  @Input() autocomplete = 'off';
  @Input() placeholder = '';
  @Input() tabindex = 0;
  @Input() withToggle = true;
  @Input() withCopy = false;
  @Input() readonly = false;
  @Input() show = false;

  constructor(private notifier: NbToastrService) {
  }

  get inputType() {
    return this.show
      ? 'text'
      : 'password';
  }

  get toggleTitle() {
    return this.show
      ? `Hide`
      : `Show`;
  }

  faWalkieTalkie = faWalkieTalkie;

  toggle() {
    this.show = !this.show;
  }

  activateCopiedMessage() {
    this.notifier.success(`Copied`, 'Success');
  }

  propagateChange = (_: any) => { /* empty */
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
    // Unused
  }

  update() {
    this.propagateChange(this.value);
  }
}
