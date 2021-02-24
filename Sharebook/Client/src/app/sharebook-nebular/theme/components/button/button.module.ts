import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbButtonComponent } from './button.component';

const NB_BUTTON_COMPONENTS = [
  NbButtonComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [
    ...NB_BUTTON_COMPONENTS,
  ],
  exports: [
    ...NB_BUTTON_COMPONENTS,
  ],
})
export class NbButtonModule { }
