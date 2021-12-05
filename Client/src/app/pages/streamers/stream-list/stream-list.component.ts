import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";

import {faUserPlus, faUserCheck, faUsers} from '@fortawesome/pro-light-svg-icons';
import {faFire as faFireSolid} from '@fortawesome/pro-solid-svg-icons';

import {IStreams} from "../models/streams-model";
import {StreamersService} from "../streamers.service";
import {NbDialogService} from "../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {UserStore} from "../../../core/stores/user.store";
import {RestService} from "../../../core/rest/rest.service";
import {Animations} from "../../../core/animations";

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss'],
  animations: [Animations.listItemLoadAnimation],
})
export class StreamListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private streamersService: StreamersService, private dialogService: NbDialogService,
              private userStore: UserStore, protected route: ActivatedRoute, private router: Router,
              private restService: RestService) {

  }

  ngOnInit(): void {
    this.getLiveStreams();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  streams: IStreams;

  isChessbookStreamers = false;
  twitchLoginName: string;
  names: string[] = [];

  loading = false;

  faFireSolid = faFireSolid;
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faUserCheck = faUserCheck;

  getLiveStreams() {
    this.streamersService.getLiveStreams(null)
        .subscribe((data: IStreams) => {
          this.streams = data;
        }, err => console.log(err.message));
  }

  loadMoreStreams() {
    if (!this.streams) {
      return;
    }

    if (this.loading) {
      return;
    }

    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, 'cursor', this.streams.pagination.cursor);

    this.loading = true;
    this.streamersService.getLiveStreams(params)
        .subscribe((data: IStreams) => {
          this.streams.data.push(...data.data);

          this.loading = false;
        }, err => console.log(err.message));
  }

}
