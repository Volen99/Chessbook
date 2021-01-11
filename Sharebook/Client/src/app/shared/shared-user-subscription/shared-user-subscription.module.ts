import {NgModule} from '@angular/core';
import {RemoteSubscribeComponent} from './remote-subscribe.component';
import {SubscribeButtonComponent} from './subscribe-button.component';
import {UserSubscriptionService} from './user-subscription.service';
import {SharedMainModule} from "../main/shared-main.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule
  ],

  declarations: [
    RemoteSubscribeComponent,
    SubscribeButtonComponent
  ],

  exports: [
    RemoteSubscribeComponent,
    SubscribeButtonComponent
  ],

  providers: [
    UserSubscriptionService
  ]
})
export class SharedUserSubscriptionModule {
}
