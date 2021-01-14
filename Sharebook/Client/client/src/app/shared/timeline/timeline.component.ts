import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public isCommentIconHovered = false;
  public isLikeIconHovered = false;
  public isRetweetIconHovered = false;
  public isAddToBookmarkIconHovered = false;

  handleCommentIconHover(event: MouseEvent) {
    this.isCommentIconHovered = !this.isCommentIconHovered;
  }

  handleLikeIconHover(event: MouseEvent) {
    this.isLikeIconHovered = !this.isLikeIconHovered;
  }

  handleRetweetIconHover(event: MouseEvent) {
    this.isRetweetIconHovered = !this.isRetweetIconHovered;
  }

  handleAddToBookmarkIconHover(event: MouseEvent) {
    this.isAddToBookmarkIconHovered = !this.isAddToBookmarkIconHovered;
  }
}
