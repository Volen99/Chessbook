import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared-core/shared.module';
import {ViewComponent} from './view/view.component';
import {HistoryRoutingModule} from './history-routing.module';

@NgModule({
  declarations: [
    ViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
  ],
  exports: [
    ViewComponent,
  ],
  providers: []
})

export class HistoryModule {}
