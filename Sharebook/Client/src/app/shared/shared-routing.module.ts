import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomePageComponent} from '../home/home-page.component';
import {UploadComponent} from "./components/upload/upload.component";
import {MessagesComponent} from "./components/messages/messages.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'compose/tweet',
    component: UploadComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SharedRoutingModule {
}
