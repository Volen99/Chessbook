import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {ProgrammingComponent} from './programming.component';
import {ProgrammingRoutingModule} from './programming-routing.module';

@NgModule({
  declarations: [
    ProgrammingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProgrammingRoutingModule,
  ],
  exports: [
    ProgrammingComponent,
  ],
  providers: []
})

export class ProgrammingModule {}
