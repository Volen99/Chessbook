import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-custom-loading-indicator',
    templateUrl: './custom-loading-indicator.component.html',
    styleUrls: ['./custom-loading-indicator.component.scss']
})
export class CustomLoadingIndicatorComponent {

    @Input()
    theme: 'light' | 'indigo' = 'light';

    @Input()
    size: 'small' | 'big' = 'big';

    @HostBinding('class')
    get getClass() {
        return [
            'custom-loading-indicator',
            `theme-${this.theme}`,
            `size-${this.size}`,
        ];
    }

}
