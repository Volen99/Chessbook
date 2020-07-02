import {RouterModule, Routes} from '@angular/router';
import {ScienceViewComponent} from './view/science-view.component';
import {NgModule} from '@angular/core';
import {UploadComponent} from './upload/upload.component';


const routes: Routes = [
  { path: 'history/BC', component: ScienceViewComponent },
  { path: '', component: UploadComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ScienceRoutingModule {}
