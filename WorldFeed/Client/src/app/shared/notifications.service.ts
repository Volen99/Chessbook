import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
    private hubConnection: signalR.HubConnection;

    constructor(private toastr: ToastrService) { }

    public subscribe = () => {
      const options = {
            accessTokenFactory: () => {
                return localStorage.getItem('token');
            }
        };

      this.hubConnection = new signalR.HubConnectionBuilder()
                                .withUrl('https://localhost:5011/notifications', options)
                                .build();

      this.hubConnection.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));

      this.hubConnection.on('ReceiveNotification', (data) => {
            this.toastr.success(`A new ${data.type} was uploaded!`, "New Media!");
        });
    }
}
