import { Component, OnInit } from '@angular/core';

import {User} from "../../shared/shared-main/user/user.model";
import {UsersService} from "../../core/backend/common/services/users.service";
import {ComponentPaginationLight} from "../../core/rest/component-pagination.model";


@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor(private userService: UsersService) {
  }

  pagination: ComponentPaginationLight = {
    currentPage: 1,
    itemsPerPage: 5,
  };

  ngOnInit(): void {
    // this.userService.getUsers({pagination: this.pagination})
    //     .subscribe((res) => {
    //       this.users = res.data;
    //     });
  }

  users: User[];
}
