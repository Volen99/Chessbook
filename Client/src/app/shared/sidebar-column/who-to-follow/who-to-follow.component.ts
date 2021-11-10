import { Component, OnInit } from '@angular/core';

import {IUser} from "../../../core/interfaces/common/users";
import {UsersService} from "../../../core/backend/common/services/users.service";
import {ComponentPaginationLight} from "../../../core/rest/component-pagination.model";

@Component({
  selector: 'app-who-to-follow',
  templateUrl: './who-to-follow.component.html',
  styleUrls: ['../sidebar-column.component.scss', './who-to-follow.component.scss']
})
export class WhoToFollowComponent implements OnInit {

  constructor(private userService: UsersService) { }

  pagination: ComponentPaginationLight = {
    currentPage: 1,
    itemsPerPage: 2,
  };

  ngOnInit(): void {
    this.userService.getUsers({pagination: this.pagination})
        .subscribe((data) => {
          this.users = data.data;
        });
  }

  users: IUser[];

}
