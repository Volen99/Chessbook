import { NgModule } from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import { SidebarColumnComponent } from './sidebar-column.component';
import { TrendsComponent } from './trends/trends.component';
import { WhoToFollowComponent } from './who-to-follow/who-to-follow.component';
import { SearchComponent } from './search/search.component';
import {SharedMainModule} from "../shared-main/shared-main.module";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbActionsModule} from "../../sharebook-nebular/theme/components/actions/actions.module";
import {NbContextMenuModule} from "../../sharebook-nebular/theme/components/context-menu/context-menu.module";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";
import {SharedModule} from "../shared.module";
import {NbFormFieldModule} from "../../sharebook-nebular/theme/components/form-field/form-field.module";
import {NbSidebarModule} from "../../sharebook-nebular/theme/components/sidebar/sidebar.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {UserFollowModule} from "../user-follow/user-follow.module";
import {SharedSearchModule} from "../shared-search/shared-search.module";
import {MatRippleModule} from "@angular/material/core";

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
    NbButtonModule,
    NbInputModule,
    FontAwesomeModule,
    SharedModule,
    NbFormFieldModule,
    NbSidebarModule,
    NbCardModule,
    UserFollowModule,
    SharedSearchModule,
    MatRippleModule,
  ],
  exports: [
    SidebarColumnComponent,
    SearchComponent
  ]
})
export class SidebarColumnModule { }
