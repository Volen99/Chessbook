import { Component, OnInit } from '@angular/core';

import {User} from "../../shared/shared-main/user/user.model";
import {UsersService} from "../../core/backend/common/services/users.service";


@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.userService.getUsers(1, 40)
        .subscribe((data) => {
          this.users = data;
        });
  }

  users: User[];
}
