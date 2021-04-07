import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {SurveyComponent} from "./survey/survey.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'survey',
                component: SurveyComponent,
            }
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {

}