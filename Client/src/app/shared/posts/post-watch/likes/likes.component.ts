import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

import {NbDialogRef} from "../../../../sharebook-nebular/theme/components/dialog/dialog-ref";
import {ShowcaseDialogComponent} from "../../../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import {PostsService} from "../../posts.service";
import {IUser} from "../../../../core/interfaces/common/users";
import {UserStore} from "../../../../core/stores/user.store";

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {
  @Input() title: string;
  @Input() postId: number;
  @Input() type: 'likes' | 'reposts';

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>, private router: Router,
              private postService: PostsService, private userStore: UserStore) {
  }

  ngOnInit(): void {
    if (this.type === 'likes') {
      this.postService.getLikers(this.postId)
        .subscribe((data) => {
          this.users = data;
        });
    } else if (this.type === 'reposts') {
      this.postService.getReposters(this.postId)
        .subscribe((data) => {
          this.users = data;
        });
    }

  }

  faTimes = faTimes;

  svgStyles = {
    'display': 'inline-block',
    'fill': 'currentcolor',
    'flex-shrink': '0',
    'width': '1.5em',
    'height': '1.5em',
    'max-width': '100% ',
    'position': 'relative',
    'vertical-align': 'text-bottom',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
  };

  users: IUser[];

  dismiss() {
    this.ref.close();
  }

  userClickHandler(screenName: string) {
    this.ref.close();
    this.router.navigate([`/${screenName.substring(1)}`]);
  }

  isManageable(user: IUser) {
    return user?.id === this.userStore.getUser().id;
  }

}
