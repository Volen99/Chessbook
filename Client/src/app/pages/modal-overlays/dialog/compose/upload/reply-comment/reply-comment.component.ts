import {Component, Input, OnInit} from '@angular/core';
import {PostDetails} from "../../../../../../shared/shared-main/post/post-details.model";

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.scss']
})
export class ReplyCommentComponent implements OnInit {
  @Input() post: PostDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
