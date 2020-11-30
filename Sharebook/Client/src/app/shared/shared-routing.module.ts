import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {UploadComponent} from "./components/upload/upload.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'compose/tweet',
    component: UploadComponent,
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
