import {Directive, OnInit} from '@angular/core';
import {FormReactive} from "../../../shared/shared-forms/form-reactive";
import {SelectOptionsItem} from "../../../shared/shared-forms/select/select-options.component";
import {User} from "../../../shared/shared-main/user/user.model";
import {HTMLServerConfig} from "../../../shared/models/server/server-config.model";
import {ServerService} from "../../../core/server/server.service";
import {ScreenService} from "../../../core/wrappers/screen.service";
import {UserStore} from "../../../core/stores/user.store";
import {UserRole} from "../../../shared/models/users/user-role";
import {USER_ROLE_LABELS} from "../../../core/utils/users/user-role";
import {UserAdminFlag} from "../../../shared/models/users/user-flag.model";

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class UserEdit extends FormReactive implements OnInit {
  username: string;
  user: User;

  roles: { value: string, label: string }[] = [];

  protected serverConfig: HTMLServerConfig;

  protected abstract serverService: ServerService;
  protected abstract screenService: ScreenService;
  protected abstract auth: UserStore;

  abstract isCreation(): boolean;

  abstract getFormButtonTitle(): string;

  ngOnInit(): void {
    this.serverConfig = this.serverService.getHTMLConfig();

    this.buildRoles();
  }

  get subscribersCount() {
    const forAccount = this.user
      ? this.user.followersCount
      : 0;
    // const forChannels = this.user
    //   ? this.user.videoChannels.map(c => c.followersCount).reduce((a, b) => a + b, 0)
    //   : 0;
    return forAccount;
  }

  isInBigView() {
    return this.screenService.getWindowInnerWidth() > 1600;
  }

  buildRoles() {
    const authUser = this.auth.getUser();

    if (authUser.roles.includes(UserRole.ADMINISTRATOR)) {
      this.roles = Object.keys(USER_ROLE_LABELS)
        .map(key => ({value: key.toString(), label: USER_ROLE_LABELS[key]}));
      return;
    }

    this.roles = [
      {value: UserRole.REGISTERED.toString(), label: USER_ROLE_LABELS[UserRole.REGISTERED]}
    ];
  }

  isTranscodingInformationDisplayed() {
    const formVideoQuota = parseInt(this.form.value['videoQuota'], 10);

    return this.serverConfig.transcoding.enabledResolutions.length !== 0 &&
      formVideoQuota > 0;
  }

  resetPassword() {
    return;
  }

  protected buildAdminFlags(formValue: any) {
    return formValue.byPassAutoBlock ? UserAdminFlag.BYPASS_VIDEO_AUTO_BLACKLIST : UserAdminFlag.NONE;
  }
}
