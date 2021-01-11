import {NgModule} from '@angular/core';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import {FeatureBooleanComponent} from './feature-boolean.component';
import {InstanceAboutAccordionComponent} from './instance-about-accordion.component';
import {InstanceFeaturesTableComponent} from './instance-features-table.component';
import {InstanceFollowService} from './instance-follow.service';
import {InstanceStatisticsComponent} from './instance-statistics.component';
import {InstanceService} from './instance.service';
import {SharedMainModule} from "../main/shared-main.module";

@NgModule({
  imports: [
    SharedMainModule,
    NgbAccordionModule
  ],

  declarations: [
    FeatureBooleanComponent,
    InstanceAboutAccordionComponent,
    InstanceFeaturesTableComponent,
    InstanceStatisticsComponent
  ],

  exports: [
    FeatureBooleanComponent,
    InstanceAboutAccordionComponent,
    InstanceFeaturesTableComponent,
    InstanceStatisticsComponent
  ],

  providers: [
    InstanceFollowService,
    InstanceService
  ]
})
export class SharedInstanceModule {
}
