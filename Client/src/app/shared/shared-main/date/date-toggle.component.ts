import {DatePipe} from '@angular/common';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FromNowPipe} from "../angular/pipes/from-now.pipe";

@Component({
  selector: 'app-date-toggle',
  templateUrl: './date-toggle.component.html',
  styleUrls: ['./date-toggle.component.scss']
})
export class DateToggleComponent implements OnChanges {
  @Input() date: Date;
  @Input() toggled = false;

  constructor(private datePipe: DatePipe, private fromNowPipe: FromNowPipe) {
  }

  ngOnChanges() {
    this.updateDates();
  }

  dateRelative: string;
  dateAbsolute: string;

  toggle() {
    this.toggled = !this.toggled;
  }

  getTitle() {
    return this.toggled
      ? this.dateRelative
      : this.dateAbsolute;
  }

  getContent() {
    return this.toggled
      ? this.dateAbsolute
      : this.dateRelative;
  }

  private updateDates() {
    this.dateRelative = this.fromNowPipe.transform(this.date);
    if (typeof this.date !== 'string') {
      this.dateAbsolute = this.date.toLocaleDateString();
    } else {
      this.dateAbsolute = this.date;
    }
  }
}
