import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-poll-button',
  templateUrl: './poll-button.component.html',
  styleUrls: ['./poll-button.component.scss']
})
export class PollButtonComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() onClick: () => any;

  constructor() { }

  ngOnInit(): void {
  }

  handleClick = () => {
    this.onClick();
  }

}
