import { NgModule } from '@angular/core';

import { ThemeModule } from '../../theme/theme.module';
import { UiFeaturesRoutingModule } from './ui-features-routing.module';
import { UiFeaturesComponent } from './ui-features.component';
import { GridComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { SearchComponent } from './search-fields/search-fields.component';
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbPopoverModule} from "../../sharebook-nebular/theme/components/popover/popover.module";
import {NbSearchModule} from "../../sharebook-nebular/theme/components/search/search.module";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbAlertModule} from "../../sharebook-nebular/theme/components/alert/alert.module";

const components = [
  UiFeaturesComponent,
  GridComponent,
  IconsComponent,
  TypographyComponent,
  SearchComponent,
];

@NgModule({
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    UiFeaturesRoutingModule,
  ],
  declarations: [
    ...components,
  ],
})
export class UiFeaturesModule { }
