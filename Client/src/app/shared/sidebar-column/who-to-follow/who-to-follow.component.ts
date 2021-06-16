import { Component, OnInit } from '@angular/core';

import {IUser} from "../../../core/interfaces/common/users";
import {UsersService} from "../../../core/backend/common/services/users.service";

@Component({
  selector: 'app-who-to-follow',
  templateUrl: './who-to-follow.component.html',
  styleUrls: ['../sidebar-column.component.scss', './who-to-follow.component.scss']
})
export class WhoToFollowComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers(1, 40)
        .subscribe((data) => {
          this.users = data;
        });
  }

  users: IUser[];

}
