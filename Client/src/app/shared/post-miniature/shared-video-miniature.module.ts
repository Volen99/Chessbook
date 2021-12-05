import {NgModule} from '@angular/core';

import {SharedMainModule} from '../shared-main/shared-main.module';
import {VideoActionsDropdownComponent} from './video-actions-dropdown.component';
import {VideoMiniatureComponent} from './video-miniature.component';
import {VideosSelectionComponent} from './videos-selection.component';
import {VideoListHeaderComponent} from './video-list-header.component';
import {SharedActorImageModule} from '../shared-actor-image/shared-actor-image.module';
import {SharedModerationModule} from "../shared-moderation/shared-moderation.module";
import {SharedFormModule} from "../shared-forms/shared-form.module";
import {SharedThumbnailModule} from "../shared-thumbnail/shared-thumbnail.module";
import {PostsModule} from "../posts/posts.module";

@NgModule({
  imports: [
    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedThumbnailModule,
    PostsModule,
    SharedActorImageModule
  ],

  declarations: [
    VideoActionsDropdownComponent,
    VideoMiniatureComponent,
    VideosSelectionComponent,
    VideoListHeaderComponent
  ],

  exports: [
    VideoActionsDropdownComponent,
    VideoMiniatureComponent,
    VideosSelectionComponent
  ],

  providers: []
})
export class SharedVideoMiniatureModule {
}
