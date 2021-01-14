import { NgModule } from '@angular/core';
import { SearchService } from '../shared/shared-search/search.service';
import { ChannelLazyLoadResolver } from './channel-lazy-load.resolver';
import { SearchFiltersComponent } from './search-filters.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { VideoLazyLoadResolver } from './video-lazy-load.resolver';
import { SharedMainModule } from '../shared/shared-main';
import { SharedSearchModule } from '../shared/shared-search';
import { SharedFormModule } from '../shared/shared-forms/shared-form.module';
import { SharedUserSubscriptionModule } from '../shared/shared-user-subscription';
import { SharedVideoMiniatureModule } from '../shared/shared-video-miniature';

@NgModule({
  imports: [
    SearchRoutingModule,

    SharedMainModule,
    SharedSearchModule,
    SharedFormModule,
    SharedUserSubscriptionModule,
    SharedVideoMiniatureModule,
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
    ChannelLazyLoadResolver
  ]
})
export class SearchModule {
}
