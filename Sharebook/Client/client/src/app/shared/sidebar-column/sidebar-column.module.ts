import { NgModule } from '@angular/core';

import { SidebarColumnComponent } from './sidebar-column.component';
import { TrendsComponent } from './trends/trends.component';
import { WhoToFollowComponent } from './who-to-follow/who-to-follow.component';
import { SearchComponent } from './search/search.component';
import { SharedMainModule } from '../shared-main';

@NgModule({
  declarations: [
    SidebarColumnComponent,
    TrendsComponent,
    WhoToFollowComponent,
    SearchComponent,
  ],
  imports: [
    SharedMainModule,
  ],
  exports: [
    SidebarColumnComponent
  ]
})
export class SidebarColumnModule { }
