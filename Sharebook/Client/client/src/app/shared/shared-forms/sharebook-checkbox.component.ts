import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, QueryList, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharebookTemplateDirective } from '../../shared/shared-main';

@Component({
  selector: 'app-sharebook-checkbox',
  styleUrls: [ './sharebook-checkbox.component.scss' ],
  templateUrl: './sharebook-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharebookCheckboxComponent),
      multi: true
    }
  ]
})
export class SharebookCheckboxComponent implements ControlValueAccessor, AfterContentInit {
  @Input() checked = false;
  @Input() inputName: string;
  @Input() labelText: string;
  @Input() labelInnerHTML: string;
  @Input() helpPlacement = 'top auto';
  @Input() disabled = false;
  @Input() recommended = false;

  @ContentChildren(SharebookTemplateDirective) templates: QueryList<SharebookTemplateDirective<'label' | 'help'>>;

  // FIXME: https://github.com/angular/angular/issues/10816#issuecomment-307567836
  @Input() onPushWorkaround = false;

  labelTemplate: TemplateRef<any>;
  helpTemplate: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit() {
    {
      const t = this.templates.find(t => t.name === 'label');
      if (t) this.labelTemplate = t.template;
    }

    {
      const t = this.templates.find(t => t.name === 'help');
      if (t) this.helpTemplate = t.template;
    }
  }

  propagateChange = (_: any) => { /* empty */
  };

  writeValue(checked: boolean) {
    this.checked = checked;

    if (this.onPushWorkaround) {
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: (_: any) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
    // Unused
  }

  onModelChange() {
    this.propagateChange(this.checked);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
