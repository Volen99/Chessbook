import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PostWatchComponent} from "./post-watch.component";
import {PostMediaDetailComponent} from "./post-media-detail/post-media-detail.component";

const routes: Routes = [
  {
    path: '',
    component: PostWatchComponent,
  },
  {
    path: 'photo/:photoId',
    component: PostMediaDetailComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PostWatchRoutingModule {
}
