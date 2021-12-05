import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {Component, Input, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Subject, Subscription} from "rxjs";

import {IStreams, IStreamsData} from "../models/streams-model";
import {StreamersService} from "../streamers.service";

@Component({
  selector: 'app-stream-watch',
  templateUrl: './stream-watch.component.html',
  styleUrls: ['./stream-watch.component.scss']
})
export class StreamWatchComponent implements OnInit, OnDestroy {
  @Input() stream: IStreamsData;

  private paramsSub: Subscription;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private streamersService: StreamersService) {

  }


  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(routeParams => {
      const loginName = routeParams['login_name'];
      if (loginName) {
        this.streamersService.getLiveStreamByUserLogin(loginName)
          .subscribe((data: IStreams) => {
            this.stream = data.data[0];
            this.streamUrl = `https://player.twitch.tv/?channel=${this.stream.user_login}&parent=localhost&autoplay=true`;
            this.chatUrl = `https://www.twitch.tv/embed/${this.stream.user_login}/chat?parent=localhost`;
          });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  streamUrl: string;
  chatUrl: string;

}


@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
