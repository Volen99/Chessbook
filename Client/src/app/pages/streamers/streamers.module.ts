import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

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
import {SharedGlobalIconModule} from "../../shared/shared-icons/shared-global-icon.module";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbActionsModule} from "../../sharebook-nebular/theme/components/actions/actions.module";
import {VideoTrendingHeaderComponent} from "./stream-list/stream-list-header/video-trending-header.component";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbTooltipModule} from "../../sharebook-nebular/theme/components/tooltip/tooltip.module";
import {DialogUsernamePromptComponent} from "./stream-list/dialog-username-prompt-component/dialog-username-prompt.component";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";
import {DialogUsernameEditPromptComponent} from "./stream-list/dialog-username-prompt-edit-component/dialog-username-edit-prompt.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

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
  ],

  imports: [
    CommonModule,
    StreamersRoutingModule,
    SidebarColumnModule,
    SharedMainModule,
    NbCardModule,
    SharedGlobalIconModule,
    NbButtonModule,
    NbActionsModule,
    NbIconModule,
    NbTooltipModule,
    NbInputModule,
    FontAwesomeModule,
  ],

  providers: [
    StreamersService,
  ],

})
export class StreamersModule {
}
