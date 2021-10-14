import {ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, Subscription} from "rxjs";

import {IStreams, IStreamsData} from "../models/streams-model";
import {StreamersService} from "../streamers.service";
import {map, takeUntil} from "rxjs/operators";
import {NbMediaBreakpointsService} from "../../../sharebook-nebular/theme/services/breakpoints.service";
import {NbThemeService} from "../../../sharebook-nebular/theme/services/theme.service";
import {DomSanitizer} from "@angular/platform-browser";

declare let Twitch: any;
@Component({
  selector: 'app-stream-watch',
  templateUrl: './stream-watch.component.html',
  styleUrls: ['./stream-watch.component.scss']
})
export class StreamWatchComponent implements OnInit, OnDestroy {
  @Input() stream: IStreamsData;

  private paramsSub: Subscription;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private streamersService: StreamersService,
              private themeService: NbThemeService, private cd: ChangeDetectorRef) {

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

            // this.getPlayer();
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
  player: any;

  getPlayer() {
    let options2 = {
      width: 1129,
      height: 476,
      channel: this.stream.user_login,
      // only needed if your site is also embedded on embed.example.com and othersite.example.com
      parent: ["localhost"]
    };
    let player2 = new Twitch.Player("player", options2);
    player2.setVolume(0.5);

    this.player = player2;
  }

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
