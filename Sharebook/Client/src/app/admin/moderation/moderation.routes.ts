import {Routes} from '@angular/router';
import {UserRightGuard} from "../../core/routing/user-right-guard.service";
import {UserRight} from "../../shared/models/users/user-right.enum";
import {VideoBlockListComponent} from "./video-block-list/video-block-list.component";
import {VideoCommentListComponent} from "./video-comment-list/video-comment-list.component";
import {ModerationComponent} from "./moderation.component";
import {AbuseListComponent} from "./abuse-list/abuse-list.component";
import {InstanceAccountBlocklistComponent} from "./instance-blocklist/instance-account-blocklist.component";
import {InstanceServerBlocklistComponent} from "./instance-blocklist/instance-server-blocklist.component";

export const ModerationRoutes: Routes = [
  {
    path: 'moderation',
    component: ModerationComponent,
    children: [
      {
        path: '',
        redirectTo: 'abuses/list',
        pathMatch: 'full'
      },
      {
        path: 'video-abuses',
        redirectTo: 'abuses/list',
        pathMatch: 'full'
      },
      {
        path: 'video-abuses/list',
        redirectTo: 'abuses/list',
        pathMatch: 'full'
      },
      {
        path: 'abuses/list',
        component: AbuseListComponent,
        canActivate: [UserRightGuard],
        data: {
          userRight: UserRight.MANAGE_ABUSES,
          meta: {
            title: $localize`Reports`
          }
        }
      },

      {
        path: 'video-blacklist',
        redirectTo: 'video-blocks/list',
        pathMatch: 'full'
      },
      {
        path: 'video-auto-blacklist',
        redirectTo: 'video-blocks/list',
        pathMatch: 'full'
      },
      {
        path: 'video-auto-blacklist/list',
        redirectTo: 'video-blocks/list',
        pathMatch: 'full'
      },
      {
        path: 'video-blacklist',
        redirectTo: 'video-blocks/list',
        pathMatch: 'full'
      },
      {
        path: 'video-blocks/list',
        component: VideoBlockListComponent,
        canActivate: [UserRightGuard],
        data: {
          userRight: UserRight.MANAGE_VIDEO_BLACKLIST,
          meta: {
            title: $localize`Blocked videos`
          }
        }
      },

      {
        path: 'video-comments',
        redirectTo: 'video-comments/list',
        pathMatch: 'full'
      },
      {
        path: 'video-comments/list',
        component: VideoCommentListComponent,
        canActivate: [UserRightGuard],
        data: {
          userRight: UserRight.SEE_ALL_COMMENTS,
          meta: {
            title: $localize`Video comments`
          }
        }
      },

      {
        path: 'blocklist/accounts',
        component: InstanceAccountBlocklistComponent,
        canActivate: [UserRightGuard],
        data: {
          userRight: UserRight.MANAGE_ACCOUNTS_BLOCKLIST,
          meta: {
            title: $localize`Muted accounts`
          }
        }
      },
      {
        path: 'blocklist/servers',
        component: InstanceServerBlocklistComponent,
        canActivate: [UserRightGuard],
        data: {
          userRight: UserRight.MANAGE_SERVERS_BLOCKLIST,
          meta: {
            title: $localize`Muted instances`
          }
        }
      }
    ]
  }
];
