import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './moderation.component.html',
  styleUrls: [ ]
})
export class ModerationComponent implements OnInit {
  autoBlockVideosEnabled = false;

  constructor () { }

  ngOnInit (): void {
    this.autoBlockVideosEnabled = false ;
  }
}
