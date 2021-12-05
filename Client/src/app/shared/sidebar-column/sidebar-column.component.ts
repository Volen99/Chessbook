import {Component, Input, OnInit} from '@angular/core';
import {FeedbackFormComponent} from './feedback/feedback-form.component';

import {
  faEllipsisH,
} from '@fortawesome/pro-light-svg-icons';


@Component({
  selector: 'app-sidebar-column',
  templateUrl: './sidebar-column.component.html',
  styleUrls: ['./sidebar-column.component.scss']
})
export class SidebarColumnComponent implements OnInit {
  @Input() hideWhoToFollow = false;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  feedbackFormComponent = FeedbackFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

  moreMenu = this.getMenuItems();
  faEllipsisH = faEllipsisH;

  getMenuItems() {
    return [
      { title: 'About', link: '/about' },
      { title: 'Chessbook for Business', link: '/about' },
      { title: 'Developers', link: '/about', fragment: 'developers' },
    ];
  }

  toggleFeedbackForm() {

  }

}
