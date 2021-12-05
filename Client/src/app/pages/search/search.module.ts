import {NgModule} from '@angular/core';

import {SearchFiltersComponent} from './search-filters.component';
import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from './search.component';
import {ChannelLazyLoadResolver} from "./shared/channel-lazy-load.resolver";
import {VideoLazyLoadResolver} from "./shared/video-lazy-load.resolver";
import {SharedMainModule} from "../../shared/shared-main/shared-main.module";
import {SharedActorImageModule} from "../../shared/shared-actor-image/shared-actor-image.module";
import {SharedFormModule} from "../../shared/shared-forms/shared-form.module";
import {SharedSearchModule} from "../../shared/shared-search/shared-search.module";
import {SearchService} from "../../shared/shared-search/search.service";
import {UserFollowModule} from "../../shared/user-follow/user-follow.module";
import {SharedVideoMiniatureModule} from "../../shared/post-miniature/shared-video-miniature.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NbButtonModule} from '../../sharebook-nebular/theme/components/button/button.module';
import {NbInputModule} from '../../sharebook-nebular/theme/components/input/input.module';

@NgModule({
  imports: [
    SearchRoutingModule,

    SharedMainModule,
    SharedSearchModule,
    SharedFormModule,
    SharedActorImageModule,
    UserFollowModule,
    SharedVideoMiniatureModule,
    FontAwesomeModule,
    NbButtonModule,
    NbInputModule,
  ],

  declarations: [
    SearchComponent,
    SearchFiltersComponent
  ],

  exports: [
    SearchComponent
  ],

  providers: [
    SearchService,
    VideoLazyLoadResolver,
    ChannelLazyLoadResolver,
  ]
})
export class SearchModule {
}
