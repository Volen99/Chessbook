import {Component, Input} from '@angular/core';
import {Video} from "../main/video/video.model";

// I will never manage make this site, coz I am so fucking dumb | 10.01.2021, Sunday, 20:10 PM | Kailee Morgue - F**K U (Lyrics)
@Component({
  selector: 'my-video-views-counter',
  styleUrls: ['./video-views-counter.component.scss'],
  templateUrl: './video-views-counter.component.html'
})
export class VideoViewsCounterComponent {
  @Input() video: Video;
}
