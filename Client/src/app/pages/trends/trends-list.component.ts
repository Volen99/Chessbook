import {Component, OnInit} from '@angular/core';

import {TagsService} from 'app/shared/services/tags.service';
import {IPostTag} from "../../shared/shared-main/post/post-details.model";

@Component({
  selector: 'app-trends-list',
  templateUrl: './trends-list.component.html',
  styleUrls: ['./trends-list.component.scss']
})
export class TrendsListComponent implements OnInit {

  constructor(private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.tagsService.getPostTags(0)
      .subscribe((data) => {
        this.tags = data.tags?.sort(() => Math.random() - 0.5);
      });
  }

  tags: IPostTag[];

  getFontSize(tag: IPostTag) {
    let itemWeights = new Array<number>();
    for (const tag of this.tags) {
      itemWeights.push(tag.postCount);
    }

    let resArr = this.stdDev(itemWeights);

    let stdDev = resArr[0];
    let mean = resArr[1];

    return this.getFontSizePrivate(tag.postCount, mean, stdDev);
  }

  private stdDev(values: number[]): any[] {
    let mean = this.mean(values);
    let sumOfDiffSquares = 0;
    let count = 0;

    for (const d of values) {
      let diff = (d - mean);
      sumOfDiffSquares += diff * diff;
      count++;
    }

    if (count === 0) {
      return [0, mean];
    }

    let stdDev = Math.sqrt(sumOfDiffSquares / count);

    return [stdDev, mean];
  }

  private mean(values: number[]): number {
    let sum = 0;
    let count = 0;

    for (const d of values) {
      sum += d;
      count++;
    }

    if (count === 0) {
      return 0;
    }

    return sum / count;
  }

  private getFontSizePrivate(weight: number, mean: number, stdDev: number): number {
    let factor = (weight - mean);

    if (factor !== 0 && stdDev !== 0) {
      factor /= stdDev;
    }

    return (factor > 2) ? 150 :
      (factor > 1) ? 120 :
        (factor > 0.5) ? 100 :
          (factor > -0.5) ? 90 :
            (factor > -1) ? 85 :
              (factor > -2) ? 80 :
                75;
  }

}
