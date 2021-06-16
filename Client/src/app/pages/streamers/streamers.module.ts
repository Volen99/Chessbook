import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {SidebarColumnModule} from "../../shared/sidebar-column/sidebar-column.module";
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {StreamersComponent} from "./streamers.component";
import {StreamersRoutingModule} from "./streamers-routing.module";
import {StreamersService} from "./streamers.service";
import { StreamWatchComponent } from './stream-watch/stream-watch.component';
import { StreamListComponent } from './stream-list/stream-list.component';
import {VideoMiniatureComponent} from "./stream-list/stream-miniature/video-miniature.component";
import {VideoThumbnailComponent} from "./stream-list/shared-thumbnail/video-thumbnail.component";
import {VideoViewsCounterComponent} from "./stream-list/video-views-counter.component";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbActionsModule} from "../../sharebook-nebular/theme/components/actions/actions.module";
import {VideoTrendingHeaderComponent} from "./stream-list/stream-list-header/video-trending-header.component";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbTooltipModule} from "../../sharebook-nebular/theme/components/tooltip/tooltip.module";
import {DialogUsernamePromptComponent} from "./stream-list/stream-list-chessbook-users/dialog-username-prompt-component/dialog-username-prompt.component";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";
import {DialogUsernameEditPromptComponent} from "./stream-list/stream-list-chessbook-users/dialog-username-prompt-edit-component/dialog-username-edit-prompt.component";
import {NbListModule} from "../../sharebook-nebular/theme/components/list/list.module";
import { ChessbookUsersStreamComponent } from './stream-list/stream-list-chessbook-users/chessbook-users-stream.component';
import {NbDialogModule} from "../../sharebook-nebular/theme/components/dialog/dialog.module";

// 15.04.2021, Thursday, 10:31 AM | SOKO - We Might Be Dead By Tomorrow (lyrics on screen)
@NgModule({
  declarations: [
    StreamersComponent,
    StreamWatchComponent,
    StreamListComponent,

    VideoMiniatureComponent,
    VideoThumbnailComponent,
    VideoViewsCounterComponent,
    VideoTrendingHeaderComponent,
    DialogUsernamePromptComponent,
    DialogUsernameEditPromptComponent,
    ChessbookUsersStreamComponent,
  ],

    imports: [
        CommonModule,
        StreamersRoutingModule,
        SidebarColumnModule,
        SharedMainModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbIconModule,
        NbTooltipModule,
        NbInputModule,
        FontAwesomeModule,
        NbListModule,
        NbDialogModule.forChild(),
    ],

  providers: [
    StreamersService,
  ],

})
export class StreamersModule {
}
