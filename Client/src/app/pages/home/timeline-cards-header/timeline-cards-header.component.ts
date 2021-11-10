import { Component, OnInit } from '@angular/core';
import {
  faStars,
} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-timeline-cards-header',
  templateUrl: './timeline-cards-header.component.html',
  styleUrls: ['./timeline-cards-header.component.scss']
})
export class TimelineCardsHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faStars = faStars;

}
