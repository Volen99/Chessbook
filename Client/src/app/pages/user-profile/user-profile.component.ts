import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import { Location } from '@angular/common';

import {IUser, UserData} from "../../core/interfaces/common/users";
import {UserStore} from "../../core/stores/user.store";
import {NbTokenService} from "../../sharebook-nebular/auth/services/token/token.service";

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private usersService: UserData,
              private router: Router,
              private route: ActivatedRoute,
              private tokenService: NbTokenService,
              private userStore: UserStore,
              protected location: Location) {
  }

  ngOnInit() {
    // this.loadUserData();

    this.initUser();
  }

  ngOnDestroy() {
  }

  initUser() {
    return this.usersService.getCurrentUser()
      .pipe(tap(user => {
        this.profileCurrent = user;
      }))
      .subscribe();
  }

  public profileCurrent: IUser;

  loadUserData() {
    const username = this.route.snapshot.params['username'];
    if (username) {
      const currentUserId = this.userStore.getUser().id;
      this.loadUser(username);
    }
  }

  loadUser(username: number /*string*/) {
    const loadUser = this.usersService.get(username);
    loadUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users) => {
        this.profileCurrent = users;
        // this is a place for value changes handling
        // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
      });
  }

  tabs: any[] = [
    {
      title: 'Posts',
      route: './tab1',
    },
    {
      title: 'Posts & replies',
      route: [ './tab2' ],
    },
    {
      title: 'Media',
      route: './tab3'
      // icon: 'flash-outline',
      // responsive: true,
      // disabled: true,
    },
    {
      title: 'Likes',
      route: './tab4'
    },
    // {
    //   title: 'Dislikes',
    //   route: './tab5'
    // },
  ];

  back() {
    this.location.back();
    return false;
  }
}
