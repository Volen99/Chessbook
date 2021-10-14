import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ChessStuffComponent} from "./chess-stuff.component";
import {ChessStuffRoutingModule} from "./chess-stuff-routing.module";
import {NbCardModule} from "../../../sharebook-nebular/theme/components/card/card.module";
import {NbAlertModule} from "../../../sharebook-nebular/theme/components/alert/alert.module";
import {WorldChampionsComponent} from "./world-champions/world-champions.component";
import {WorldChampionsService} from "./world-champions/world-champions.service";
import {NbTabsetModule} from "../../../sharebook-nebular/theme/components/tabset/tabset.module";
import {NbListModule} from "../../../sharebook-nebular/theme/components/list/list.module";
import {NbUserModule} from "../../../sharebook-nebular/theme/components/user/user.module";
import {AuthModule} from "../../../auth/auth.module";
import {NbSpinnerModule} from "../../../sharebook-nebular/theme/components/spinner/spinner.module";
import {MatRippleModule} from "@angular/material/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SnackbarSampleComponent} from "./snackbar/snackbar.sample";

@NgModule({
  declarations: [
    ChessStuffComponent,
    WorldChampionsComponent,
    SnackbarSampleComponent,
  ],

  imports: [
    CommonModule,
    ChessStuffRoutingModule,
    NbCardModule,
    NbAlertModule,
    NbTabsetModule,
    NbListModule,
    NbUserModule,
    AuthModule,
    NbSpinnerModule,
    MatRippleModule,
    FontAwesomeModule
  ],

  providers: [
    WorldChampionsService,
  ]

})
export class ChessStuffModule { }
