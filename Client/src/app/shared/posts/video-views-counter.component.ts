import { Component, Input } from '@angular/core';
import {Post} from "../shared-main/post/post.model";

@Component({
  selector: 'app-video-views-counter',
  styleUrls: [ './video-views-counter.component.scss' ],
  templateUrl: './video-views-counter.component.html'
})
export class VideoViewsCounterComponent {
  @Input() video: Post;
  @Input() viewsOrLikes: string;
}
