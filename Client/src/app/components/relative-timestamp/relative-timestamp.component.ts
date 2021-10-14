import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';


const dateFormatOptions = {
  hour12: false,
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

const shortDateFormatOptions = {
  month: 'short',
  day: 'numeric',
};

const SECOND = 1000;
const MINUTE = 1000 * 60;
const HOUR   = 1000 * 60 * 60;
const DAY    = 1000 * 60 * 60 * 24;

const MAX_DELAY = 2147483647;

const selectUnits = delta => {
  const absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  } else if (absDelta < HOUR) {
    return 'minute';
  } else if (absDelta < DAY) {
    return 'hour';
  }

  return 'day';
};

const getUnitDelay = units => {
  switch (units) {
    case 'second':
      return SECOND;
    case 'minute':
      return MINUTE;
    case 'hour':
      return HOUR;
    case 'day':
      return DAY;
    default:
      return MAX_DELAY;
  }
};

export const timeAgoString = (intl, date, now, year, timeGiven = true) => {
  const delta = now - date.getTime();

  let relativeTime;

  if (delta < DAY && !timeGiven) {
    relativeTime = 'today';
  } else if (delta < 10 * SECOND) {
    relativeTime = 'now';
  } else if (delta < 7 * DAY) {
    if (delta < MINUTE) {
      relativeTime = (Math.floor(delta / SECOND)) + 's';
    } else if (delta < HOUR) {
      relativeTime = (Math.floor(delta / MINUTE)) + 'm';
    } else if (delta < DAY) {
      relativeTime = (Math.floor(delta / HOUR)) + 'h';
    } else {
      relativeTime = (Math.floor(delta / DAY)) + 'd';
    }
  } else if (date.getFullYear() === year) {
    relativeTime = intl.formatDate(date, shortDateFormatOptions);
  } else {
    relativeTime = intl.formatDate(date, { ...shortDateFormatOptions, year: 'numeric' });
  }

  return relativeTime;
};

const timeRemainingString = (intl, date, now, timeGiven = true) => {
  const delta = date.getTime() - now;

  let relativeTime;

  if (delta < DAY && !timeGiven) {
    relativeTime = 'today';
  } else if (delta < 10 * SECOND) {
    relativeTime = 'Moments remaining';
  } else if (delta < MINUTE) {
    const number = Math.floor(delta / SECOND);
    if (number === 1) {
      relativeTime = number + ' second left';
    } else {
      relativeTime = number + ' seconds left';
    }
  } else if (delta < HOUR) {
    const number = (Math.floor(delta / MINUTE));
    if (number === 1) {
      relativeTime = number + ' minute left';
    } else {
      relativeTime = number + ' minutes left';
    }
  } else if (delta < DAY) {
    const number = (Math.floor(delta / HOUR));
    if (number === 1) {
      relativeTime = number + ' hour left';
    } else {
      relativeTime = number + ' hours left';
    }
  } else {
    const number = Math.floor(delta / DAY);
    if (number === 1) {
      relativeTime = number + ' day left';
    } else {
      relativeTime = number + ' days left';
    }
  }

  return relativeTime;
};

@Component({
  selector: 'app-relative-timestamp',
  templateUrl: './relative-timestamp.component.html',
  styleUrls: ['./relative-timestamp.component.scss']
})
export class RelativeTimestampComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() timestamp: string;
  @Input() year: number = (new Date()).getFullYear();
  @Input() futureDate: boolean;

  private _timer: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let {timestamp} = changes;
    if (this.timestamp !== timestamp?.currentValue) {
      this.now = Date.now();
    }
  }

  ngOnInit(): void {
    const timeGiven = this.timestamp.includes('T');
    const date = new Date(this.timestamp);
    this.relativeTime = this.futureDate ? timeRemainingString(null, date, this.now, timeGiven) : timeAgoString(null, date, this.now, this.year, timeGiven);
  }

  ngAfterViewInit(): void {
    this._scheduleNextUpdate();
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  // state
  now = Date.now();


  relativeTime: any;


  private _scheduleNextUpdate () {
    clearTimeout(this._timer);

    const delta          = (new Date(this.timestamp)).getTime() - this.now;
    const unitDelay      = getUnitDelay(selectUnits(delta));
    const unitRemainder  = Math.abs(delta % unitDelay);
    const updateInterval = 1000 * 10;
    const delay          = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);

    this._timer = setTimeout(() => {
      this.now = Date.now();
    }, delay);
  }

}
