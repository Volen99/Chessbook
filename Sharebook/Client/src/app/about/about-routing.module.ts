import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetaGuard} from '@ngx-meta/core';
import {AboutComponent} from './about.component';
import {AboutInstanceComponent} from "./about-instance/about-instance.component";
import {AboutInstanceResolver} from "./about-instance/about-instance.resolver";
import {AboutPeertubeComponent} from "./about-peertube/about-peertube.component";
import {AboutFollowsComponent} from "./about-follows/about-follows.component";

const aboutRoutes: Routes = [
  {
    path: '',
    component: AboutComponent,
    canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        redirectTo: 'instance',
        pathMatch: 'full'
      },
      {
        path: 'instance',
        component: AboutInstanceComponent,
        data: {
          meta: {
            title: $localize`About this instance`
          }
        },
        resolve: {
          instanceData: AboutInstanceResolver
        }
      },
      {
        path: 'peertube',
        component: AboutPeertubeComponent,
        data: {
          meta: {
            title: $localize`About PeerTube`
          }
        }
      },
      {
        path: 'follows',
        component: AboutFollowsComponent,
        data: {
          meta: {
            title: $localize`About this instance's network`
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {
}
