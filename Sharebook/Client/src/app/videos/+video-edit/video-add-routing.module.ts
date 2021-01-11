import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetaGuard} from '@ngx-meta/core';
import {VideoAddComponent} from './video-add.component';
import {LoginGuard} from "../../core/routing/login-guard.service";
import {CanDeactivateGuard} from "../../core/routing/can-deactivate-guard.service";

const videoAddRoutes: Routes = [
  {
    path: '',
    component: VideoAddComponent,
    canActivate: [MetaGuard, LoginGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(videoAddRoutes)],
  exports: [RouterModule]
})
export class VideoAddRoutingModule {
}
