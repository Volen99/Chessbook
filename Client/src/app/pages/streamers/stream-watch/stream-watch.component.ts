import {Component, Input, OnInit} from '@angular/core';
import {IStreams, IStreamsData} from "../models/streams-model";
import {StreamersService} from "../streamers.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

declare let Twitch: any;
@Component({
  selector: 'app-stream-watch',
  templateUrl: './stream-watch.component.html',
  styleUrls: ['./stream-watch.component.scss']
})
export class StreamWatchComponent implements OnInit {
  @Input() stream: IStreamsData;

  private paramsSub: Subscription;

  constructor(private route: ActivatedRoute, private streamersService: StreamersService, ) {

  }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(routeParams => {
      const loginName = routeParams['login_name'];
      if (loginName) {
        this.streamersService.getLiveStreamByUserLogin(loginName)
          .subscribe((data: IStreams) => {
            this.stream = data.data[0];

            this.getPlayer();
          });
      }
    });
  }

  getPlayer() {
    let options2 = {
      width: 1129,
      height: 560,
      channel: this.stream.user_login,
      // only needed if your site is also embedded on embed.example.com and othersite.example.com
      parent: ["localhost"]
    };
    let player2 = new Twitch.Player("player", options2);
    player2.setVolume(0.5);
  }

}
