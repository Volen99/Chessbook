import { NgModule } from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import { SidebarColumnComponent } from './sidebar-column.component';
import { TrendsComponent } from './trends/trends.component';
import { WhoToFollowComponent } from './who-to-follow/who-to-follow.component';
import { SearchComponent } from './search/search.component';
import {SharedMainModule} from "../shared-main/shared-main.module";
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
import {FeedbackFormComponent} from './feedback/feedback-form.component';
import {NbCheckboxModule} from '../../sharebook-nebular/theme/components/checkbox/checkbox.module';
import {NbRadioModule} from '../../sharebook-nebular/theme/components/radio/radio.module';
import {NbPopoverModule} from '../../sharebook-nebular/theme/components/popover/popover.module';
import {NbTooltipModule} from '../../sharebook-nebular/theme/components/tooltip/tooltip.module';
import {CustomLoadingIndicatorModule} from "../../components/custom-loading-indicator/custom-loading-indicator.module";

@NgModule({
  declarations: [
    SidebarColumnComponent,
    TrendsComponent,
    WhoToFollowComponent,
    SearchComponent,
    FeedbackFormComponent
  ],
    imports: [
        SharedMainModule,
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
        NbCheckboxModule,
        NbRadioModule,
        NbPopoverModule,
        NbTooltipModule,
        CustomLoadingIndicatorModule,
    ],
  exports: [
    SidebarColumnComponent,
    SearchComponent
  ]
})
export class SidebarColumnModule { }
