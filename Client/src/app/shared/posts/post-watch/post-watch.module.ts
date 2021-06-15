import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PostMediaDetailComponent} from "./post-media-detail/post-media-detail.component";
import {NbButtonModule} from "../../../sharebook-nebular/theme/components/button/button.module";
import {NbActionsModule} from "../../../sharebook-nebular/theme/components/actions/actions.module";
import {SecurityCamerasData} from "../../../core/interfaces/iot/security-cameras";
import {SecurityCamerasService} from "../../../core/mock/iot/security-cameras.service";

const SERVICES = [
  { provide: SecurityCamerasData, useClass: SecurityCamerasService },
];

@NgModule({
  declarations: [PostWatchComponent, PostThreadComponent, LikesComponent, PostMediaDetailComponent],

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
    ...SERVICES,
  ],

})
export class PostWatchModule {
}
