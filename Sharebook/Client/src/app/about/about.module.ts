import {NgModule} from '@angular/core';
import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {AboutInstanceComponent} from "./about-instance/about-instance.component";
import {AboutFollowsComponent} from "./about-follows/about-follows.component";
import {AboutPeertubeComponent} from "./about-peertube/about-peertube.component";
import {ContactAdminModalComponent} from "./about-instance/contact-admin-modal.component";
import {AboutPeertubeContributorsComponent} from "./about-peertube/about-peertube-contributors.component";
import {AboutInstanceResolver} from "./about-instance/about-instance.resolver";
import {SharedMainModule} from "../shared/main/shared-main.module";
import {SharedFormModule} from "../shared/shared-forms/shared-form.module";
import {SharedInstanceModule} from "../shared/shared-instance/shared-instance.module";
import {SharedGlobalIconModule} from "../shared/shared-icons/shared-global-icon.module";

@NgModule({
  imports: [
    AboutRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedInstanceModule,
    SharedGlobalIconModule,
  ],

  declarations: [
    AboutComponent,
    AboutInstanceComponent,
    AboutPeertubeComponent,
    AboutFollowsComponent,
    AboutPeertubeContributorsComponent,
    ContactAdminModalComponent
  ],

  exports: [
    AboutComponent
  ],

  providers: [
    AboutInstanceResolver
  ]
})
export class AboutModule {
}
