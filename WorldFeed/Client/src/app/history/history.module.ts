import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ViewComponent} from './view/view.component';
import {HistoryRoutingModule} from './history-routing.module';
import {BCRoutingModule} from './BC/BC-routing.module';
import {BCViewComponent} from './BC/view/BC-view.component';
import {ScienceModule} from './BC/science/science.module';

@NgModule({
  declarations: [
    ViewComponent,
    BCViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    BCRoutingModule,
    ScienceModule,
  ],
  exports: [
    ViewComponent,
    BCViewComponent,
  ],
  providers: []
})

export class HistoryModule {}
