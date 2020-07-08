import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {BCRoutingModule} from './BC-routing.module';
import {BCViewComponent} from './view/BC-view.component';
import {ScienceModule} from './science/science.module';



@NgModule({
  declarations: [
    BCViewComponent,
    // ScienceViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BCRoutingModule,
    ScienceModule
  ],
  exports: [
    BCViewComponent,
    // ScienceViewComponent,
  ]
})

export class BCModule {}
