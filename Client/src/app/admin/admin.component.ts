import {Component, OnInit} from '@angular/core';
import {TopMenuDropdownParam} from "../shared/shared-main/misc/top-menu-dropdown.component";
import {UserRight} from "../shared/models/users/user-right.enum";
import {ScreenService} from "../core/wrappers/screen.service";
import {ListOverflowItem} from "../shared/shared-main/misc/list-overflow.component";
import {UserStore} from "../core/stores/user.store";

import {
  faUserCheck,
  faUserAlien,
  faBookAlt,
  faFlag,
  faTimes,
} from '@fortawesome/pro-light-svg-icons';

import {
  faCommentSmile as faCommentSmileSolid,
} from '@fortawesome/pro-solid-svg-icons';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: ListOverflowItem[] = [];
  menuEntries: TopMenuDropdownParam[] = [];

  constructor(
    private userStore: UserStore,
    private screen: ScreenService) {
  }

  get isBroadcastMessageDisplayed() {
    return this.screen.isBroadcastMessageDisplayed;
  }

  ngOnInit() {
    const moderationItems: TopMenuDropdownParam = {
      label: `Moderation`,
      children: []
    };

    if (this.hasAbusesRight()) {
      moderationItems.children.push({
        label: `Reports`,
        routerLink: '/admin/moderation/abuses/list',
        iconName: this.faFlag,
      });
    }
    if (this.hasVideoBlocklistRight()) {
      moderationItems.children.push({
        label: `Video blocks`,
        routerLink: '/admin/moderation/video-blocks/list',
        iconName: this.faTimes,
      });
    }
    if (this.hasVideoCommentsRight()) {
      moderationItems.children.push({
        label: `Video comments`,
        routerLink: '/admin/moderation/video-comments/list',
        iconName: this.faCommentSmileSolid,
      });
    }
    if (this.hasAccountsBlocklistRight()) {
      moderationItems.children.push({
        label: `Blocked accounts`,
        routerLink: '/admin/moderation/blocklist/accounts',
        iconName: this.faTimes,
      });
    }
    if (this.hasServersBlocklistRight()) {
      moderationItems.children.push({
        label: `Muted servers`,
        routerLink: '/admin/moderation/blocklist/servers',
        iconName: this.faTimes,
      });
    }

    if (this.hasUsersRight()) {
      this.menuEntries.push({label: `Users`, routerLink: '/admin/users'});
    }

    if (this.hasAbusesRight() || this.hasVideoBlocklistRight()) this.menuEntries.push(moderationItems);

    // if (this.hasConfigRight()) {
    //   this.menuEntries.push({label: `Configuration`, routerLink: '/admin/config'});
    // }

    // if (this.hasJobsRight() || this.hasLogsRight() || this.hasDebugRight()) {
    //   this.menuEntries.push({label: `System`, routerLink: '/admin/system'});
    // }

    if (this.hasUsersRight()) {
      this.menuEntries.push({label: 'Survey', routerLink: '/admin/survey'});
    }

    if (this.hasUsersRight()) {
      this.menuEntries.push({label: 'Tournaments', routerLink: '/admin/tournaments'});
    }
  }

  faUserCheck = faUserCheck;
  faUserAlien = faUserAlien;
  faBookAlt = faBookAlt;
  faFlag = faFlag;
  faTimes = faTimes;
  faCommentSmileSolid = faCommentSmileSolid;

  hasUsersRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_USERS);
  }

  hasServerFollowRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_SERVER_FOLLOW);
  }

  hasAbusesRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_ABUSES);
  }

  hasVideoBlocklistRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_VIDEO_BLACKLIST);
  }

  hasAccountsBlocklistRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_ACCOUNTS_BLOCKLIST);
  }

  hasServersBlocklistRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_SERVERS_BLOCKLIST);
  }

  hasConfigRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_CONFIGURATION);
  }

  hasPluginsRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_PLUGINS);
  }

  hasLogsRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_LOGS);
  }

  hasJobsRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_JOBS);
  }

  hasDebugRight() {
    return this.userStore.getUser().hasRight(UserRight.MANAGE_DEBUG);
  }

  hasVideoCommentsRight() {
    return this.userStore.getUser().hasRight(UserRight.SEE_ALL_COMMENTS);
  }
}
