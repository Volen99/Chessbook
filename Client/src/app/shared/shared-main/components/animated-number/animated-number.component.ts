import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-animated-number',
  templateUrl: './animated-number.component.html',
  styleUrls: ['./animated-number.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AnimatedNumberComponent implements OnInit, OnChanges {
  @Input() value: number;
  @Input() obfuscate: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  direction: number;

  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes;
    if (value) {
      if (value.currentValue > this.value) {
        this.direction = 1;
      } else if (value.currentValue < this.value) {
        this.direction = -1;
      }
    }
  }

  // willEnter = () => {
  //   return { y: -1 * this.direction };
  // }
  //
  // willLeave = () => {
  //   return { y: spring(1 * this.direction, { damping: 35, stiffness: 400 }) };
  // }

}
