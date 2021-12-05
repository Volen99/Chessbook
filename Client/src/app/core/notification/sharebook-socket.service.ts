import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs';

import {UserNotification} from "../../shared/shared-main/users/user-notification.model";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {InitUserService} from "../../theme/services/init-user.service";
import {NbAuthService} from "../../sharebook-nebular/auth/services/auth.service";
import {NbTokenLocalStorage} from "../../sharebook-nebular/auth/services/token/token-storage";
import {IPost} from "../../shared/posts/models/post.model";
import {takeUntil} from "rxjs/operators";
import {IUser} from "../interfaces/common/users";
import {UserStore} from "../stores/user.store";

export type NotificationEvent = 'new' | 'read' | 'read-all';

@Injectable()
export class PeerTubeSocket {
  private _hubConnection: HubConnection;
  private SignalrHubUrl: string = '';
  private msgSignalrSource = new Subject();
  msgReceived$ = this.msgSignalrSource.asObservable();

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    private auth: NbTokenLocalStorage,
    private initUserService: InitUserService,
    private userStore: UserStore,
    private ngZone: NgZone,
  ) {

    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: IUser) => {
        if (user) {
          this.SignalrHubUrl = 'https://localhost:5001';
          this.init();
        }

      });
  }

  stop() {
    this._hubConnection.stop();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private init() {
    if (this.authService.isAuthenticated()) {
      this.register();
      this.stablishConnection();
      this.registerHandlers();
    }
  }

  private register() {
    this.ngZone.runOutsideAngular(() => {
      this._hubConnection = new HubConnectionBuilder()
        .withUrl(this.SignalrHubUrl + '/notificationhub', {
          accessTokenFactory: () => this.auth.get().getValue()
        })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();
    });

  }

  dispatchNotificationEvent(type: NotificationEvent, notification?: UserNotification) {
    this.notificationSubject.next({type, notification});
  }

  async getMyNotificationsSocket() {
    await this.initNotificationSocket();

    return this.notificationSubject.asObservable();
  }

  private stablishConnection() {
    Object.defineProperty(WebSocket, 'OPEN', {value: 1,});   // woaaw 😮
    this._hubConnection.start()
      .then(() => {
        console.log('Hub connection started');
      })
      .catch(() => {
        console.log('Error while establishing connection');
      });
  }

  private registerHandlers() {
    this._hubConnection.on('SendNotification', (msg) => {
      console.log(`Order ${msg.orderId} updated to ${msg.status}`);
      // this.toastr.success('Updated to status: ' + msg.status, 'Order Id: ' + msg.orderId);
      this.msgSignalrSource.next();
    });

  }

  private notificationSubject = new Subject<{ type: NotificationEvent, notification?: UserNotification }>();


  private async initNotificationSocket() {
    this._hubConnection.on("newNotification", (n: UserNotification) => {
      this.ngZone.run(() => this.dispatchNotificationEvent('new', n));
    });
  }

}
