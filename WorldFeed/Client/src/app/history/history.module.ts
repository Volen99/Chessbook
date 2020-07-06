import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ViewComponent} from './view/view.component';
import {HistoryRoutingModule} from './history-routing.module';
import {BCRoutingModule} from './BC/BC-routing.module';
import {BCViewComponent} from './BC/view/BC-view.component';
import {ScienceModule} from './BC/science/science-module';
import { PostComponent } from './BC/science/post/post.component';
import {DndDirective} from './direcitives/dnd.directive';
import {ScienceService} from './BC/science/science.service';


@NgModule({
  declarations: [
    ViewComponent,
    BCViewComponent,
    DndDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    BCRoutingModule,
    // ScienceModule,
  ],
  exports: [
    ViewComponent,
    BCViewComponent,
    DndDirective,
  ],
  providers: [ScienceService] // TODO: wtf should not be here!!?
})

export class HistoryModule {}
