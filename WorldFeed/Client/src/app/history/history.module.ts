import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ViewComponent} from './view/view.component';
import {HistoryRoutingModule} from './history-routing.module';
import {BCRoutingModule} from './BC/BC-routing.module';
import {BCViewComponent} from './BC/view/BC-view.component';
import {ScienceModule} from './BC/science/science-module';
import { PostComponent } from './BC/science/post/post.component';


@NgModule({
  declarations: [
    ViewComponent,
    BCViewComponent,
    // PostComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    BCRoutingModule,
    ScienceModule
  ],
  exports: [
    ViewComponent,
    BCViewComponent
  ]
})

export class HistoryModule {}
