import {Component, OnInit} from '@angular/core';

import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {
  faChessPawnAlt,
  faChessKnightAlt,
  faChessBishopAlt,
  faChessRookAlt,
  faChessQueenAlt,
  faChessKingAlt,

  faTrophy,
} from '@fortawesome/pro-light-svg-icons';

import {FactsService} from "./facts.service";

@Component({
  selector: 'app-snackbar-sample',
  styleUrls: ['snackbar.sample.scss'],
  templateUrl: 'snackbar.sample.html',
  providers: [FactsService]
})
export class SnackbarSampleComponent implements OnInit {
  private _colors: string[];
  private facts: string[];

  constructor(private factsService: FactsService) {
  }

  ngOnInit() {
    const randomBool = Math.random() < 0.5;

    this.facts = this.factsService.fetchFacts();

    this.pieces = randomBool ? this.pieces : this.pieces.reverse();

    this.color = 'mediumpurple';
    this.actionName = 'Undo';
    this._colors = [];

    this.fact = '';
  }

  public color: string;
  public actionName: string;
  public fact: string;

  backgroundColorStyles: {};

  faTrophy = faTrophy;
  pieces: IconDefinition[] = [faChessPawnAlt, faChessKnightAlt, faChessBishopAlt, faChessRookAlt, faChessQueenAlt, faChessKingAlt];

  public changeColor() {
    const characters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += characters[Math.floor(Math.random() * 16)];
    }

    this._colors.push(this.color);
    this.color = color;

    this.fact = this.facts[Math.floor(Math.random() * this.facts.length)];
    // snackbar.open('Changed color to ' + this.color);


    this.backgroundColorStyles = {
      'background-color': `${this.color}`,
      'background-image': `linear-gradient(315deg, ${this.color} 0%, #000000 74%)`,
    };
  }

  public undoColorChange(snackbar) {
    this.color = this._colors.pop();

    snackbar.close();
  }

  public onAnimationStarted() {
    console.log('animation started');
  }

  public onAnimationDone() {
    console.log('animation ended');
  }

  public toggleSnackbar() {
    // this.snackbar.toggle();
  }

  public close(element) {
    element.close();
  }
}
