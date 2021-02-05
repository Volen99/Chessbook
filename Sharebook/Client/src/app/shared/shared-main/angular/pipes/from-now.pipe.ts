import {Pipe, PipeTransform} from '@angular/core';

// Thanks: https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site ♥
@Pipe({name: 'myFromNow'})
export class FromNowPipe implements PipeTransform {

  transform(arg: number | Date | string) {
    const argDate = new Date(arg);
    const seconds = Math.floor((Date.now() - argDate.getTime()) / 1000);

    let interval = Math.round(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    if (interval === 1) return `${interval} year ago`;

    interval = Math.round(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    if (interval === 1) return `${interval} month ago`;

    interval = Math.round(seconds / 604800);
    if (interval > 1) return `${interval} weeks ago`;
    if (interval === 1) return `${interval} week ago`;

    interval = Math.round(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    if (interval === 1) return `${interval} day ago`;

    interval = Math.round(seconds / 3600);
    if (interval > 1) return `${interval}h`;
    if (interval === 1) return `${interval}h`;

    interval = Math.round(seconds / 60);
    if (interval >= 1) return `${interval}m`;

    return `just now`;
  }
}
