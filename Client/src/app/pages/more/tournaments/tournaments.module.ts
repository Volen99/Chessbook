import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {TournamentsComponent} from "./tournaments.component";
import {TournamentsRoutingModule} from "./tournaments-routing.module";
import { TournamentComponent } from './tournament/tournament.component';
import {NbCardModule} from "../../../sharebook-nebular/theme/components/card/card.module";
import {NbButtonModule} from "../../../sharebook-nebular/theme/components/button/button.module";

@NgModule({
  declarations: [
    TournamentsComponent,
    TournamentComponent,
  ],

  imports: [
    CommonModule,
    TournamentsRoutingModule,

    FontAwesomeModule,
    NbCardModule,
    NbButtonModule,
  ],

  providers: [
  ]

})
export class TournamentsModule { }
