import {RouterModule, Routes} from '@angular/router';
import {ScienceViewComponent} from './view/science-view.component';
import {NgModule} from '@angular/core';
import {PostComponent} from './post/post.component';


const routes: Routes = [
  { path: 'history/BC', component: ScienceViewComponent },
  { path: '', component: PostComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ScienceRoutingModule {}
