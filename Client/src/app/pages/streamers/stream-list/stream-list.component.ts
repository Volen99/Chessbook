import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";

import {faUsers} from '@fortawesome/pro-solid-svg-icons';
import {faFire, faUserPlus, faUserCheck} from '@fortawesome/pro-light-svg-icons';

import {IStreams} from "../models/streams-model";
import {StreamersService} from "../streamers.service";
import {NbDialogService} from "../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {UserStore} from "../../../core/stores/user.store";
import {Subject, Subscription} from "rxjs";
import {RestService} from "../../../core/rest/rest.service";

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

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

  faFire = faFire;
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faUserCheck = faUserCheck;


  getLiveStreams() {
    this.streamersService.getLiveStreams(null)
      .subscribe((data: IStreams) => {
        this.streams = data;
      });
  }

  streams: IStreams;

  isChessbookStreamers = false;
  twitchLoginName: string;
  names: string[] = [];

  loading = false;
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
        });
  }

}
