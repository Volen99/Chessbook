import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {HistoryComponent} from './history.component';
import {HistoryRoutingModule} from './history-routing.module';

@NgModule({
  declarations: [
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
  ],
  exports: [
    HistoryComponent,
  ],
  providers: []
})

export class HistoryModule {}
