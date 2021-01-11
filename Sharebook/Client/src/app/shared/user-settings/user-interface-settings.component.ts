import {Subject, Subscription} from 'rxjs';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormReactive} from "../shared-forms/form-reactive";
import {User} from "../models/users/user.model";
import {ServerConfig} from "../models/server/server-config.model";
import {FormValidatorService} from "../shared-forms/form-validator.service";
import {Notifier} from "../../core/notification/notifier-service";
import {UserService} from "../../core/users/user.service";
import {ServerService} from "../../core/server";
import {UserUpdateMe} from "../models/users/user-update-me.model";
import {AuthService} from "../../core/auth/auth.service";

@Component({
  selector: 'my-user-interface-settings',
  templateUrl: './user-interface-settings.component.html',
  styleUrls: ['./user-interface-settings.component.scss']
})
export class UserInterfaceSettingsComponent extends FormReactive implements OnInit, OnDestroy {
  @Input() user: User = null;
  @Input() reactiveUpdate = false;
  @Input() notifyOnUpdate = true;
  @Input() userInformationLoaded: Subject<any>;

  formValuesWatcher: Subscription;

  private serverConfig: ServerConfig;

  constructor(
    protected formValidatorService: FormValidatorService,
    private authService: AuthService,
    private notifier: Notifier,
    private userService: UserService,
    private serverService: ServerService,
  ) {
    super();
  }

  get availableThemes() {
    return this.serverConfig.theme.registered
      .map(t => t.name);
  }

  ngOnInit() {
    this.serverConfig = this.serverService.getTmpConfig();
    this.serverService.getConfig()
      .subscribe(config => this.serverConfig = config);

    this.buildForm({
      theme: null
    });

    this.userInformationLoaded
      .subscribe(() => {
        this.form.patchValue({
          theme: this.user.theme
        });

        if (this.reactiveUpdate) {
          this.formValuesWatcher = this.form.valueChanges.subscribe(val => this.updateInterfaceSettings());
        }
      });
  }

  ngOnDestroy() {
    this.formValuesWatcher?.unsubscribe();
  }

  updateInterfaceSettings() {
    const theme = this.form.value['theme'];

    const details: UserUpdateMe = {
      theme
    };

    if (this.authService.isLoggedIn()) {
      this.userService.updateMyProfile(details).subscribe(
        () => {
          this.authService.refreshUserInformation();

          if (this.notifyOnUpdate) {
            this.notifier.success($localize`Interface settings updated.`);
          }
        },

        err => this.notifier.error(err.message)
      );
    } else {
      this.userService.updateMyAnonymousProfile(details);
      if (this.notifyOnUpdate) {
        this.notifier.success($localize`Interface settings updated.`);
      }
    }
  }
}
