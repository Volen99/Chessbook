import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';
import {AboutPeertubeComponent} from "./about-peertube/about-peertube.component";

const aboutRoutes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path: '',
        redirectTo: 'chessbook',
        pathMatch: 'full'
      },
      {
        path: 'chessbook',
        component: AboutPeertubeComponent,
        data: {
          meta: {
            title: `About Chessbook`
          }
        }
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(aboutRoutes) ],
  exports: [ RouterModule ]
})
export class AboutRoutingModule {}
