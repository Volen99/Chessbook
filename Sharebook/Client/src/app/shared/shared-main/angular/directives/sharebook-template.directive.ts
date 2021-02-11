import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appSbTemplate]'
})
export class SharebookTemplateDirective<T extends string> {
  @Input('appSbTemplate') name: T;

  constructor(public template: TemplateRef<any>) {
    // empty
  }
}
