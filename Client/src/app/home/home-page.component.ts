import {Component, OnInit} from '@angular/core';

import {TimelineService} from "../shared/timeline/timeline.service";
import {GetHomeTimelineParameters} from "../shared/models/timeline/get-home-timeline-parameters";

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }
}
