import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "../../../../sharebook-nebular/theme/components/dialog/dialog-ref";
import {ShowcaseDialogComponent} from "../../../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import {Router} from "@angular/router";
import {PostsService} from "../../posts.service";
import {IUser} from "../../../../core/interfaces/common/users";

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {
  @Input() user: IUser;
  @Input() title: string;
  @Input() postId: number;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>, private router: Router, private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.getLikers(this.postId)
      .subscribe((data) => {
        this.users = data;
    });
  }

  users: IUser[];

  // users: { name: string, title: string }[] = [
  //   { name: 'Carla Espinosa', title: 'Nurse' },
  //   { name: 'Bob Kelso', title: 'Doctor of Medicine' },
  //   { name: 'Janitor', title: 'Janitor' },
  //   { name: 'Perry Cox', title: 'Doctor of Medicine' },
  //   { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  // ];

  dismiss() {
    this.ref.close();
  }

  userClickHandler(screenName: string) {
    this.router.navigate([`/${screenName}`]);
  }

}
