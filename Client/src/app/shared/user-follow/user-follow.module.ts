import { NgModule } from '@angular/core';

import {UserFollowService} from "./user-follow.service";
import {SharedMainModule} from "../shared-main/shared-main.module";
import {FollowButtonComponent} from "./follow-button.component";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";



@NgModule({
  declarations: [
    FollowButtonComponent,
  ],

  imports: [
    SharedMainModule,
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
