import {Component, Input, OnInit} from '@angular/core';
import {TagsService} from "../../services/tags.service";
import {IPostTag} from "../../shared-main/post/post-details.model";

import {
  faPawClaws,
  faCog
} from '@fortawesome/pro-solid-svg-icons';


@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['../sidebar-column.component.scss', './trends.component.scss']
})
export class TrendsComponent implements OnInit {
  @Input() hideWhoToFollow = false;

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsService.getPostTags(this.hideWhoToFollow ? 5 : 2)
      .subscribe((data) => {
        this.tags = data.tags;
      });
  }

  tags: IPostTag[];

  faPawClaws = faPawClaws;
  faCog = faCog;

}
