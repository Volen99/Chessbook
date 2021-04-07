import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-container',
  templateUrl: './timeline-container.component.html',
  styleUrls: ['./timeline-container.component.scss']
})
export class TimelineContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  locale: string; // required
  hashtag: string;
  home: boolean;

}
