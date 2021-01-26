import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserFormMode} from "../admin/users/user/user.component";
import {takeUntil} from "rxjs/operators";
import {User, UserData} from "../@core/interfaces/common/users";
import {NbTokenService} from "@nebular/auth";
import {UserStore} from "../@core/stores/user.store";
import {NbToastrService} from "@nebular/theme";
import {FormBuilder} from "@angular/forms";
import {Subject} from "rxjs/Subject";

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
              private userStore: UserStore) {
  }

  public location = location;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.loadUserData();
  }

  public profileCurrent: User;

  loadUserData() {
    debugger
    const username = this.route.snapshot.params['username'];
    if (username) {
      const currentUserId = this.userStore.getUser().id;
      this.loadUser(username);
    }
  }

  loadUser(username: string) {
    const loadUser = this.usersService.get(username);
    loadUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.profileCurrent = user;
        // this is a place for value changes handling
        // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
      });
  }
}
