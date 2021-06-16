import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {PostWatchRoutingModule} from "./post-watch-routing.module";
import {PostWatchComponent} from "./post-watch.component";
import {SharedMainModule} from "../../shared-main/shared-main.module";
import {SidebarColumnModule} from "../../sidebar-column/sidebar-column.module";
import {NbCardModule} from "../../../sharebook-nebular/theme/components/card/card.module";
import {NbIconModule} from "../../../sharebook-nebular/theme/components/icon/icon.module";
import { PostThreadComponent } from './post-thread/post-thread.component';
import {NbContextMenuModule} from "../../../sharebook-nebular/theme/components/context-menu/context-menu.module";
import { LikesComponent } from './likes/likes.component';
import {NbListModule} from "../../../sharebook-nebular/theme/components/list/list.module";
import {NbUserModule} from "../../../sharebook-nebular/theme/components/user/user.module";
import {SharedModule} from "../../shared.module";
import {NbButtonModule} from "../../../sharebook-nebular/theme/components/button/button.module";
import {NbActionsModule} from "../../../sharebook-nebular/theme/components/actions/actions.module";

@NgModule({
  declarations: [PostWatchComponent, PostThreadComponent, LikesComponent],

  imports: [
    CommonModule,
    PostWatchRoutingModule,
    SharedMainModule,
    SidebarColumnModule,
    NbCardModule,
    NbIconModule,
    NbContextMenuModule,
    NbListModule,
    NbUserModule,
    SharedModule,
    FontAwesomeModule,
    NbButtonModule,
    NbActionsModule,
  ],

  providers: [
  ],

})
export class PostWatchModule {
}
