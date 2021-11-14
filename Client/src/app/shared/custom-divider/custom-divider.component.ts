import { Component, Input, HostBinding } from '@angular/core';

export type CustomDividerOrientation = 'horizontal' | 'vertical';
export type CustomDividerTheme = 'light' | 'dark' | 'indigo';

@Component({
    selector: 'custom-divider',
    template: '<ng-content></ng-content>',
    styleUrls: ['./custom-divider.component.scss']
})
export class CustomDividerComponent {
    @Input()
    orientation: CustomDividerOrientation = 'horizontal';

    @Input()
    theme: CustomDividerTheme = 'light';

    @HostBinding('class')
    get class() {
        return [
            'custom-divider',
            `theme-${this.theme}`,
            this.orientation
        ];
    }
}
