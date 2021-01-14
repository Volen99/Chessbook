import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appSBTemplate]'
})
export class SharebookTemplateDirective<T extends string> {
  @Input('ptTemplate') name: T;

  constructor (public template: TemplateRef<any>) {
    // empty
  }
}
