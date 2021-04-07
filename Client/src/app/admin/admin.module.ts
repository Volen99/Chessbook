import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptionComponent, SurveyComponent} from './survey/survey.component';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from "./admin-routing-module";
import {NbCardModule} from "../sharebook-nebular/theme/components/card/card.module";
import {NbIconModule} from "../sharebook-nebular/theme/components/icon/icon.module";
import {NbSelectModule} from "../sharebook-nebular/theme/components/select/select.module";
import {NbInputModule} from "../sharebook-nebular/theme/components/input/input.module";
import {NbButtonModule} from "../sharebook-nebular/theme/components/button/button.module";
import {SurveyService} from "./survey/survey.service";


@NgModule({
    declarations: [SurveyComponent, AdminComponent, OptionComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NbCardModule,
        NbIconModule,
        NbSelectModule,
        NbInputModule,
        NbButtonModule,
    ],

    exports: [
        SurveyComponent
    ],

    providers: [SurveyService]
})
export class AdminModule {
}
