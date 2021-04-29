import {Component, OnDestroy, OnInit} from '@angular/core';
import {IStreams} from "../models/streams-model";
import {StreamersService} from "../streamers.service";
import {NbDialogService} from "../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {DialogUsernamePromptComponent} from "./dialog-username-prompt-component/dialog-username-prompt.component";
import {ShowcaseDialogComponent} from "../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import {DialogUsernameEditPromptComponent} from "./dialog-username-prompt-edit-component/dialog-username-edit-prompt.component";
import {AuthService} from "../../../core/auth/auth.service";
import {UserStore} from "../../../core/stores/user.store";
import {Subject, Subscription} from "rxjs";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent} from "@angular/router";
import {distinctUntilChanged, filter, map, takeUntil} from "rxjs/operators";
import {RedirectService} from "../../../core/routing/redirect.service";
import {faFire, faUserPlus, faUserCheck} from '@fortawesome/pro-light-svg-icons';
import {faUsers} from '@fortawesome/pro-solid-svg-icons';

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  private destroy$ = new Subject<void>();

  constructor(private streamersService: StreamersService, private dialogService: NbDialogService,
              private userStore: UserStore, protected route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((route: NavigationEnd) => {
        if (route.url.includes('users')) {
          this.isChessbookStreamers = true;
          this.getChessbookUsersStream();
        } else if (route.url.endsWith('list') || route.urlAfterRedirects?.endsWith('list')) {
          this.isChessbookStreamers = false;
          this.getLiveStreams();
        }
      });

    this.getLiveStreams();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  faFire = faFire;
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faUserCheck = faUserCheck;


  getLiveStreams() {
    this.streamersService.getLiveStreams()
      .subscribe((data: IStreams) => {
        this.streams = data;
      });
  }

  streams: IStreams;

  isChessbookStreamers = false;
  twitchLoginName: string;
  names: string[] = [];

  getChessbookUsersStream() {
    this.streamersService.getChessbookUsersStream()
      .subscribe((data: IStreams) => {
        this.streams = data;
                                  // @ts-ignore
        this.twitchLoginName = data.twitch_login_name;
      });
  }

  open3() {
    this.dialogService.open(DialogUsernamePromptComponent)
      .onClose.subscribe((name) => {
        if (name) {
          this.names.push(name);

          this.streamersService.saveTwitchLoginName(name)
            .subscribe((data) => {

            });
        }
    });
  }

  async deleteMe() {
    this.dialogService.open(DialogUsernameEditPromptComponent, {
      context: {
        title: 'Edit your Twitch username',
        body: 'Edit',
        username: this.twitchLoginName,
      },
      closeOnEsc: true,
    })
      .onClose.subscribe((username) => {
        if (username !== this.twitchLoginName) {
          let user = this.userStore.getUser();
          this.streamersService.editTwitchLoginName(username, user.id)
            .subscribe((data) => {
              this.twitchLoginName = username;
            });
        }
    });
  }

}
