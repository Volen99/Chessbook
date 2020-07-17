import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../core/shared-core/shared.module';
import {ViewComponent} from './view/view.component';
import {HistoryRoutingModule} from './history-routing.module';
import {BCRoutingModule} from './BC/BC-routing.module';
import {ScienceModule} from './BC/science/science.module';
import {BCViewComponent} from './BC/view/BC-view.component';

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
