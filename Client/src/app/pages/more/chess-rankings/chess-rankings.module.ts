import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ChessRankingsRoutingModule} from "./chess-rankings-routing.module";
import {ChessRankingsComponent} from "./chess-rankings.component";
import {NbCardModule} from "../../../sharebook-nebular/theme/components/card/card.module";
import {NbInputModule} from "../../../sharebook-nebular/theme/components/input/input.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ThemeModule} from "../../../theme/theme.module";
import {ChessRankingsService} from "./chess-rankings.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

// 11.06.2021, Friday, 11:40 AM | ＢＡＤ ＦＥＥＬＩＮＧＳ
@NgModule({
  declarations: [ChessRankingsComponent],

  imports: [
    CommonModule,
    ChessRankingsRoutingModule,
    NbCardModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    FontAwesomeModule,
  ],

  providers: [ChessRankingsService],

})
export class ChessRankingsModule {
}
