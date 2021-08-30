import { Component, OnInit } from '@angular/core';
import {TagsService} from "../../services/tags.service";
import {IPostTag} from "../../shared-main/post/post-details.model";

import {
  faPawClaws,
} from '@fortawesome/pro-solid-svg-icons';


@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['../sidebar-column.component.scss', './trends.component.scss']
})
export class TrendsComponent implements OnInit {

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsService.getPostTags(2)
      .subscribe((data) => {
        this.tags = data.tags;
      });
  }

  tags: IPostTag[];

  faPawClaws = faPawClaws;

}
