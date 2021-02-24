import { NgModule } from '@angular/core';

import { SidebarColumnComponent } from './sidebar-column.component';
import { TrendsComponent } from './trends/trends.component';
import { WhoToFollowComponent } from './who-to-follow/who-to-follow.component';
import { SearchComponent } from './search/search.component';
import {SharedMainModule} from "../shared-main/shared-main.module";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbActionsModule} from "../../sharebook-nebular/theme/components/actions/actions.module";
import {NbContextMenuModule} from "../../sharebook-nebular/theme/components/context-menu/context-menu.module";

@NgModule({
  declarations: [
    SidebarColumnComponent,
    TrendsComponent,
    WhoToFollowComponent,
    SearchComponent,
  ],
  imports: [
    SharedMainModule,
    NbIconModule,
    NbActionsModule,
    NbContextMenuModule,
  ],
  exports: [
    SidebarColumnComponent,
    SearchComponent
  ]
})
export class SidebarColumnModule { }
