import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AdminComponent} from "./admin.component";
import {UsersRoutes} from "./users";
import {ModerationRoutes} from "./moderation";
import {SurveyRoutes} from "./survey/survey.routes";

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
            },
            // ...FollowsRoutes,
               ...UsersRoutes,
               ...ModerationRoutes,
            // ...SystemRoutes,
            // ...ConfigRoutes,
            // ...PluginsRoutes
               ...SurveyRoutes,
        ]
    }
];


@NgModule({
    imports: [ RouterModule.forChild(adminRoutes) ],
    exports: [ RouterModule ]
})
export class AdminRoutingModule {

}
