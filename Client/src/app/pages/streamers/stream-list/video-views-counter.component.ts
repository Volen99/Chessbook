import { Component, Input } from '@angular/core';
import {IStreamsData} from "../models/streams-model";

@Component({
  selector: 'app-video-views-counter',
  styleUrls: [ './video-views-counter.component.scss' ],
  templateUrl: './video-views-counter.component.html'
})
export class VideoViewsCounterComponent {
  @Input() video: IStreamsData;
}
