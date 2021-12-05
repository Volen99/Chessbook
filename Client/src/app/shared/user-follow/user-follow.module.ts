import { NgModule } from '@angular/core';

import {UserFollowService} from "./user-follow.service";
import {FollowButtonComponent} from "./follow-button.component";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    FollowButtonComponent,
  ],

  imports: [
    CommonModule,
    NbButtonModule,
  ],
  exports: [
    FollowButtonComponent
  ],

  providers: [
    UserFollowService,
  ],
})
export class UserFollowModule { }
