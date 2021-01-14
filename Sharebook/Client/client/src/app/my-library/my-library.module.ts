import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { MyHistoryComponent } from './my-history/my-history.component';
import { MyLibraryRoutingModule } from './my-library-routing.module';
import { MyLibraryComponent } from './my-library.component';
import { MyAcceptOwnershipComponent } from './my-ownership/my-accept-ownership/my-accept-ownership.component';
import { MyOwnershipComponent } from './my-ownership/my-ownership.component';
import { MySubscriptionsComponent } from './my-subscriptions/my-subscriptions.component';
import { MyVideoImportsComponent } from './my-video-imports/my-video-imports.component';
import { MyVideoPlaylistCreateComponent } from './my-video-playlists/my-video-playlist-create.component';
import { MyVideoPlaylistElementsComponent } from './my-video-playlists/my-video-playlist-elements.component';
import { MyVideoPlaylistUpdateComponent } from './my-video-playlists/my-video-playlist-update.component';
import { MyVideoPlaylistsComponent } from './my-video-playlists/my-video-playlists.component';
import { VideoChangeOwnershipComponent } from './my-videos/modals/video-change-ownership.component';
import { MyVideosComponent } from './my-videos/my-videos.component';
import { SharedMainModule } from '../shared/shared-main';
import { SharedModerationModule } from '../shared/shared-moderation';
import { SharedVideoMiniatureModule } from '../shared/shared-video-miniature';
import { SharedUserSubscriptionModule } from '../shared/shared-user-subscription';
import { SharedVideoPlaylistModule } from '../shared/shared-video-playlist';
import { SharedUserInterfaceSettingsModule } from '../shared/shared-user-settings';
import { SharedGlobalIconModule } from '../shared/shared-icons/shared-global-icon.module';
import { SharedAbuseListModule } from '../shared/shared-abuse-list/shared-abuse-list.module';
import { SharedShareModal } from '../shared/shared-share-modal';
import { SharedVideoLiveModule } from '../shared/shared-video-live';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';

@NgModule({
  imports: [
    MyLibraryRoutingModule,

    AutoCompleteModule,
    TableModule,
    DragDropModule,

    SharedMainModule,
    SharedFormModule,
    SharedModerationModule,
    SharedVideoMiniatureModule,
    SharedUserSubscriptionModule,
    SharedVideoPlaylistModule,
    SharedUserInterfaceSettingsModule,
    SharedGlobalIconModule,
    SharedAbuseListModule,
    SharedShareModal,
    SharedVideoLiveModule
  ],

  declarations: [
    MyLibraryComponent,

    MyVideosComponent,

    VideoChangeOwnershipComponent,

    MyOwnershipComponent,
    MyAcceptOwnershipComponent,
    MyVideoImportsComponent,
    MySubscriptionsComponent,
    MyHistoryComponent,

    MyVideoPlaylistCreateComponent,
    MyVideoPlaylistUpdateComponent,
    MyVideoPlaylistsComponent,
    MyVideoPlaylistElementsComponent
  ],

  exports: [
    MyLibraryComponent
  ],

  providers: []
})
export class MyLibraryModule {
}
