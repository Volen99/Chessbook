import {Component, Input} from '@angular/core';
import { PostDetails } from 'app/shared/shared-main/post/post-details.model';

@Component({
  selector: 'app-post-attributes',
  templateUrl: './post-attributes.component.html',
  styleUrls: ['./post-attributes.component.scss']
})
export class PostAttributesComponent {
  @Input() post: PostDetails;

  constructor() {
  }

  getPostTags() {
    if (!this.post || Array.isArray(this.post.tags) === false) {
      return [];
    }

    return this.post.tags;
  }

}
