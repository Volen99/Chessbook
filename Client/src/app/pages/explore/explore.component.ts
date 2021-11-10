import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs/Subject";

import {
  faRadio,
} from '@fortawesome/pro-light-svg-icons';

import {
  faBadgeCheck,
} from '@fortawesome/pro-solid-svg-icons';

import {ExploreService, NewsPost, Pagination} from "./explore.service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  private lastQueryLength: number;

  onDataSubject = new Subject<any[]>();

  constructor(private exploreService: ExploreService) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.exploreService.load(25, 0)
      .subscribe((posts) => {
        this.newsPost = posts.data;
        this.pagination = posts.pagination;

        this.topNew = this.newsPost.filter(n => n.title.includes('Magnus Carlsen'))[0];
        if (!this.topNew) {
          this.topNew = this.newsPost[3];
        }

        this.newsPost = this.newsPost.filter(n => n.title !== this.topNew.title);

        this.loading = false;
      });
  }

  topNew: NewsPost;

  newsPost: NewsPost[];
  pagination: Pagination;

  faRadio = faRadio;
  faBadgeCheck = faBadgeCheck;

  getImageUrl (url: string) {
    if (url) {
      return url;
    }

    return `assets/images/default-news-avatar.png`;
  }

  loading = false;
  loadMoreNews() {
    if (!this.pagination) {
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;
    this.exploreService.load(this.pagination.limit, this.pagination.offset + 25)
        .subscribe((posts) => {
          this.newsPost.push(...posts.data);
          this.pagination = posts.pagination;

          this.loading = false;
        });
  }

  calcMinHeight(count?: number): number {
    if (!count) {
      return 670;
    }

    return count * 115;
  }

  translateY: number;

  setTransform(i: number): number {
    if (i === 1) {
      this.translateY = i * (299 + 100);

      return this.translateY;
    }

    this.translateY = this.translateY + 100; // 😁

    return this.translateY;
  }
}
