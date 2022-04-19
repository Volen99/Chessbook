import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLoadingIndicatorComponent } from './custom-loading-indicator.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CustomLoadingIndicatorComponent
    ],
    exports: [
        CustomLoadingIndicatorComponent
    ]
})
export class CustomLoadingIndicatorModule { }
