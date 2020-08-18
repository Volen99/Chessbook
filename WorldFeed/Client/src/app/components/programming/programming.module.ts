import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared-core/shared.module';
import {ViewComponent} from './view/view.component';
import {ProgrammingRoutingModule} from './programming-routing.module';

@NgModule({
  declarations: [
    ViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProgrammingRoutingModule,
  ],
  exports: [
    ViewComponent,
  ],
  providers: []
})

export class ProgrammingModule {}
