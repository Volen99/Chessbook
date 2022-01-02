import {Router} from "@angular/router";
import {Component, Input, OnInit} from '@angular/core';

import {NbDialogService} from "../../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {AppInjector} from "../../../../../app-injector";
import {VideoReportComponent} from "../../../../shared-moderation/report-modals/video-report.component";
import {Post} from "../../../post/post.model";
import {NbToastrService} from "../../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {BlocklistService} from "../../../../shared-moderation/blocklist.service";
import {UserStore} from "../../../../../core/stores/user.store";
import {PostsService} from "../../../../posts/posts.service";
import {RedirectService} from "../../../../../core/routing/redirect.service";


@Component({
  selector: 'app-popover-more',
  templateUrl: './popover-more.component.html',
  styleUrls: ['./popover-more.component.scss'],
})
export class PopoverMoreComponent implements OnInit {
  @Input() items: any;
  @Input() post: Post;

  constructor(private notifier: NbToastrService, private blocklistService: BlocklistService,
              private router: Router, private userStore: UserStore, private postService: PostsService,
              private redirectService: RedirectService) {
  }

  ngOnInit(): void {
  }

  svgStyles = {
    "display": 'inline-block;',
    'flex-shrink': '0',
    'height': '1.25em',
    'margin-right': '12px',
    'max-width': '100%',
    'position': 'relative',
    "vertical-align": 'text-bottom',
    "-moz-user-select": 'none',
    "-ms-user-select": 'none',
    "-webkit-user-select": 'none',
    "user-select": 'none',
  };

  // omg I am so good
  handleClick = e => {
    let userCurrent = this.userStore.getUser();

    if (!userCurrent) {
      this.router.navigate([`/auth`, 'login']);
      return;
    }

    const i = Number(e.currentTarget.getAttribute('data-index'));

    if (userCurrent.id === this.post.user.id) {
      if (i === 0) {
        this.postService.deletePost(this.post.id)
          .subscribe((data) => {
            this.notifier.success('Your post was deleted', 'Success');
            if (this.router.url.includes('post')) {
              this.redirectService.redirectToHomepage();
            } else {
              // emit delete event or call parent func kk
            }
          }, err => this.notifier.danger(err.message, 'Error'));
      } else if (i === 1) {
        if (!this.post.pinned) {
          this.postService.pinPost(this.post.id)
            .subscribe(() => {
                this.post.pinned = true;
                this.notifier.success('Your Post was pinned to your profile.', 'Success');
              },
              err => this.notifier.danger(err.message, 'Error'));
        } else {
          this.postService.unpinPost(this.post.id)
            .subscribe(() => {
                this.post.pinned = false;
                this.notifier.success('Your Post was unpinned from your profile', 'Success');
              },
              err => this.notifier.danger(err.message, 'Error'));
        }
      } else if (i === 2) {
        this.router.navigate([`/${this.post.user.screenName.substring(1)}/post`, this.post.id]);
      }
    } else {
      if (i === 1) {
        if (!this.post.user.blocking) {
          this.blocklistService.blockAccountByUser(this.post.user)
            .subscribe(
              () => {
                this.notifier.success('', 'Successfully blocked');

                this.post.user.blocking = true;
                /*this.userChanged.emit();*/
              },

              err => this.notifier.danger(err.message, 'Error')
            );
        } else {
          this.blocklistService.unblockAccountByUser(this.post.user)
            .subscribe(
              () => {
                this.notifier.success('', 'Successfully unblocked');

                this.post.user.blocking = false;
                // this.userChanged.emit();
              },

              err => this.notifier.danger(err.message, 'Error')
            );
        }
      } else if (i === 2) {
        if (this.router.url.includes('post')) {
          this.notifier.warning('Chessbook will allow embedding posts soon.', 'Coming soon');
        } else {
          this.router.navigate([`/${this.post.user.screenName.substring(1)}/post`, this.post.id]);
        }
      }

      if (i === 3) {
        if (this.router.url.includes('post')) {
          this.invokeReportModal();
        } else {
          this.notifier.warning('Chessbook will allow embedding posts soon.', 'Coming soon');
        }
      }

      if (i === 4) {
        this.invokeReportModal();
      }
    }
  }

  private invokeReportModal() {
    let dialogService = AppInjector.get(NbDialogService);
    dialogService.open(VideoReportComponent, {
      // @ts-ignore
      context: {
        post: this.post,
      },
      closeOnBackdropClick: true,
      closeOnEsc: false,
    });
  }

}
