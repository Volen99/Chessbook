import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { SharedMainModule } from '../shared/shared-main';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';
import { SharedInstanceModule } from '../shared/shared-instance/shared-instance.module';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';
import { AboutInstanceComponent } from './about-instance/about-instance.component';
import { AboutSharebookComponent } from './about-sharebook/about-sharebook.component';
import { AboutFollowsComponent } from './about-follows/about-follows.component';
import { AboutSharebookContributorsComponent } from './about-sharebook/about-sharebook-contributors.component';
import { ContactAdminModalComponent } from './about-instance/contact-admin-modal.component';
import { AboutInstanceResolver } from './about-instance/about-instance.resolver';

@NgModule({
  imports: [
    AboutRoutingModule,

    SharedMainModule,
    SharedFormModule,
    SharedInstanceModule,
    SharedGlobalIconModule
  ],

  declarations: [
    AboutComponent,
    AboutInstanceComponent,
    AboutSharebookComponent,
    AboutFollowsComponent,
    AboutSharebookContributorsComponent,
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
