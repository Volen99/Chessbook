import { Component, OnDestroy } from '@angular/core';
import { forkJoin } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import {WorldChampionsService} from "./world-champions.service";
import {Champion, FemaleChampion} from "../../../../core/interfaces/iot/champion";

@Component({
  selector: 'app-world-champions',
  styleUrls: ['./world-champions.component.scss'],
  templateUrl: './world-champions.component.html',
})
export class WorldChampionsComponent implements OnDestroy {

  private alive = true;

  constructor(private championsService: WorldChampionsService) {
    forkJoin([
      this.championsService.getChampions(),
      this.championsService.getFemaleChampions(),
  ])
      .pipe(takeWhile(() => this.alive))
      .subscribe(([champions, femaleChampions]: [Champion[], FemaleChampion[]]) => {
        this.champions = champions;
        this.femaleChampions = femaleChampions;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  champions: any[];
  femaleChampions: any[];

  avatarClick(name: string) {
    window.open(`https://en.wikipedia.org/wiki/${name.replace(/ /g, '_')}`, '_blank');
  }
}
