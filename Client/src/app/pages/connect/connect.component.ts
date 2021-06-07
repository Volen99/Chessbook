import { Component, OnInit } from '@angular/core';
import {IUser} from "../../core/interfaces/common/users";
import {PostsService} from "../../shared/posts/posts.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {ComponentPaginationLight} from "../../core/rest/component-pagination.model";
import {UsersService} from "../../core/backend/common/services/users.service";

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  private lastQueryLength: number;

  // A Subject is like an Observable, but can multicast to many Observers.
  // Subjects are like EventEmitters: they maintain a registry of many listeners.
  onDataSubject = new Subject<any[]>();

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers(1, 40)
      .subscribe((data) => {
        this.users = data;
      });
  }

  pagination: ComponentPaginationLight = {
    currentPage: 1,
    itemsPerPage: 40,
  };

  users: IUser[];
  hasDoneFirstQuery = false;
  disabled = false;


  loadMoreVideos(reset = false) {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage).
    subscribe(({data}) => {
        this.hasDoneFirstQuery = true;
        this.lastQueryLength = data;

        if (reset) {
          this.users = [];
        }

        this.users = this.users.concat(data);

        this.onDataSubject.next(data);
      },

      error => {
        const message = `Cannot load more posts. 😞 Try again later.`;

        console.error(message, {error});
      }
    );
  }

  calcMinHeight(usersCount?: number): number {
    if (!usersCount) {
      return 670;
    }

    return usersCount * 670;
  }

  setTransform(i: number): number {
    return i * 100; // 😁
  }

  onNearOfBottom() {
    if (this.disabled) {
      return;
    }

    // No more results
    if (this.lastQueryLength !== undefined && this.lastQueryLength < this.pagination.itemsPerPage) {
      return;
    }

    this.pagination.currentPage += 1;

    // this.setScrollRouteParams();

    this.loadMoreVideos();
  }

  userClickHandler(screenName: string) {
    this.router.navigate([`/${screenName}`]);
  }

}
