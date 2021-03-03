import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { UsersRoutingModule } from './users-routing.module';

// components
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { UsersTableComponent } from './users-table/users-table.component';
// components

import {ThemeModule} from "../../theme/theme.module";
import {AuthModule} from "../../auth/auth.module";
import {ComponentsModule} from "../../components/components.module";
import {NbActionsModule} from "../../sharebook-nebular/theme/components/actions/actions.module";
import {NbButtonModule} from "../../sharebook-nebular/theme/components/button/button.module";
import {NbCardModule} from "../../sharebook-nebular/theme/components/card/card.module";
import {NbInputModule} from "../../sharebook-nebular/theme/components/input/input.module";
import {NbTabsetModule} from "../../sharebook-nebular/theme/components/tabset/tabset.module";
import {NbUserModule} from "../../sharebook-nebular/theme/components/user/user.module";
import {NbRadioModule} from "../../sharebook-nebular/theme/components/radio/radio.module";
import {NbSelectModule} from "../../sharebook-nebular/theme/components/select/select.module";
import {NbListModule} from "../../sharebook-nebular/theme/components/list/list.module";
import {NbIconModule} from "../../sharebook-nebular/theme/components/icon/icon.module";
import {NbSpinnerModule} from "../../sharebook-nebular/theme/components/spinner/spinner.module";
import {NbDatepickerModule} from "../../sharebook-nebular/theme/components/datepicker/datepicker.module";

const  NB_MODULES = [
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbInputModule,
];

@NgModule({
  imports: [
    ThemeModule,
    AuthModule,
    Ng2SmartTableModule,
    UsersRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ...NB_MODULES,
  ],
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UserComponent,
  ],
  entryComponents: [
  ],
  providers: [],
})
export class UsersModule { }
