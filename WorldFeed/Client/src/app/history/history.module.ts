import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ViewComponent} from './view/view.component';
import {HistoryRoutingModule} from './history-routing.module';
import {BCRoutingModule} from './BC/BC-routing.module';
import {BCViewComponent} from './BC/view/BC-view.component';
import {DndDirective} from './direcitives/dnd.directive';
import {ScienceService} from './BC/science/science.service';
import {SignalRScienceService} from './BC/science/signalR/signalR-science-service';
import {ScienceModule} from './BC/science/science.module';

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
    ScienceModule,
  ],
  exports: [
    ViewComponent,
    BCViewComponent,
    DndDirective,
  ],
  providers: [] // TODO: wtf should not be here!!?
})

export class HistoryModule {}
