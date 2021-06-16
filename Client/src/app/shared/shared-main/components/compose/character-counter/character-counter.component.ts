import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {length} from 'stringz';

@Component({
  selector: 'app-character-counter',
  templateUrl: './character-counter.component.html',
  styleUrls: ['./character-counter.component.scss']
})
export class CharacterCounterComponent implements OnChanges {
  @Input() text: string;
  @Input() max: number;

  constructor() {
  }

  diff: number;

  ngOnChanges(changes: SimpleChanges): void {
    const {text} = changes;
    if (text) {
      this.diff = this.max - length(text.currentValue);
    }
  }

}
