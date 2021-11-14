import {Component, Input, HostBinding} from '@angular/core';

export type CustomDividerOrientation = 'horizontal' | 'vertical';
export type CustomDividerTheme = 'default' | 'cosmic' | 'dark' | 'material-dark' | 'material-light' | 'corporate';

@Component({
  selector: 'custom-divider',
  template: '<ng-content></ng-content>',
  styleUrls: ['./custom-divider.component.scss']
})
export class CustomDividerComponent {
  @Input() orientation: CustomDividerOrientation = 'horizontal';
  @Input() theme: CustomDividerTheme = 'default';

  @HostBinding('class')
  get class() {
    return [
      'custom-divider',
      `theme-${this.theme}`,
      this.orientation
    ];
  }
}
