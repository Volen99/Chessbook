import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDividerComponent } from './custom-divider.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CustomDividerComponent
    ],
    exports: [
        CustomDividerComponent
    ]
})
export class CustomDividerModule { }
