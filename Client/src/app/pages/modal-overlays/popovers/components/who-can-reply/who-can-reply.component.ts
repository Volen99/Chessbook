import {Component, OnInit, Output} from '@angular/core';
import {PostPrivacy} from "../../../../../shared/models/enums/post-privacy";

@Component({
  selector: 'app-who-can-reply',
  templateUrl: './who-can-reply.component.html',
  styleUrls: ['./who-can-reply.component.scss']
})
export class WhoCanReplyComponent implements OnInit {
  @Output() privacy: PostPrivacy;

  constructor() { }

  ngOnInit(): void {
  }

  change(value) {
    this.privacy = value;
  }

}
