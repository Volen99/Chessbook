import {Component, OnInit} from '@angular/core';
import {faFire, faUserCheck, faUserPlus} from '@fortawesome/pro-light-svg-icons';
import {faUsers as faUsersSolid} from '@fortawesome/pro-solid-svg-icons';
import {faUsers} from '@fortawesome/pro-solid-svg-icons';
import {DialogUsernamePromptComponent} from "./dialog-username-prompt-component/dialog-username-prompt.component";
import {StreamersService} from "../../streamers.service";
import {NbDialogService} from "../../../../sharebook-nebular/theme/components/dialog/dialog.service";
import {DialogUsernameEditPromptComponent} from "./dialog-username-prompt-edit-component/dialog-username-edit-prompt.component";
import {IStreams} from "../../models/streams-model";
import {HttpParams} from "@angular/common/http";
import {RestService} from "../../../../core/rest/rest.service";
import {UserStore} from "../../../../core/stores/user.store";
import {NbToastrService} from "../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {NbGlobalPhysicalPosition} from "../../../../sharebook-nebular/theme/components/cdk/overlay/position-helper";

@Component({
  selector: 'app-chessbook-users-stream',
  templateUrl: './chessbook-users-stream.component.html',
  styleUrls: ['./chessbook-users-stream.component.scss']
})
export class ChessbookUsersStreamComponent implements OnInit {

  constructor(private streamersService: StreamersService, private dialogService: NbDialogService,
              private restService: RestService, private userStore: UserStore,
              private toasterService: NbToastrService,) {

  }

  ngOnInit(): void {
    this.getChessbookUsersStream();
  }

  streams: IStreams;

  twitchLoginName: string;
  names: string[] = [];

  faFire = faFire;
  faUsersSolid = faUsersSolid;
  faUserPlus = faUserPlus;
  faUserCheck = faUserCheck;

  getChessbookUsersStream() {
    this.streamersService.getChessbookUsersStream(null)
      .subscribe((data: IStreams) => {
        if (data) {
          this.streams = data;
          // @ts-ignore
          this.twitchLoginName = data.twitch_login_name;
        }
      });
  }

  open3() {
    this.dialogService.open(DialogUsernamePromptComponent)
      .onClose.subscribe((name) => {
      if (name) {
        this.names.push(name);

        this.streamersService.saveTwitchLoginName(name)
          .subscribe((data) => {
            if (data.message === 'Username already exists') {
              this.toasterService.danger(data.message, '', {
                position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
              });
            } else {
              this.twitchLoginName = name;

              this.toasterService.success('Username successfully added!', '', {
                position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
              });
            }
          });
      }
    });
  }

  async deleteMe() {
    this.dialogService.open(DialogUsernameEditPromptComponent, {
      context: {
        title: 'Edit your Twitch username',
        body: 'Edit',
        username: this.twitchLoginName,
      },
      closeOnEsc: false,
    }).onClose.subscribe((username) => {
      if (!username) {
        return;
      }
      let user = this.userStore.getUser();
      if (username === 'action-delete') {
        this.streamersService.deleteTwitchLoginName(username, user.id)
          .subscribe((data) => {
            this.twitchLoginName = '';

            this.toasterService.success('Username successfully deleted!', '', {
              position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
            });
          });
      } else if (username !== this.twitchLoginName) {
        this.streamersService.editTwitchLoginName(username, user.id)
          .subscribe((data) => {
            this.twitchLoginName = data.username;

            this.toasterService.success('Username Updated!', '', {
              position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
            });
          });
      }
    });
  }

  loading = false;

  loadMoreStreams() {
    if (!this.streams) {
      return;
    }

    if (this.loading) {
      return;
    }

    let params = new HttpParams();

    params = this.restService.addParameterToQuery(params, 'cursor', this.streams.pagination.cursor);

    this.loading = true;
    this.streamersService.getChessbookUsersStream(params)
      .subscribe((data: IStreams) => {
        this.streams.data.push(...data.data);

        this.loading = false;
      });
  }


}
