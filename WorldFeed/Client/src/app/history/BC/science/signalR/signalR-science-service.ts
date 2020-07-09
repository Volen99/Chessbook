import {Injectable} from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {PostModel} from '../interfaces/post.model';

// DON'T use EventEmitter in services!!
@Injectable()
export class SignalRScienceService {
  private hubConnection: signalR.HubConnection;

  constructor() {
  }

  public data: PostModel;

  public subscribe = () => {
    const options = {
      accessTokenFactory: () => {
        return localStorage.getItem('token');
      }
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5012/posts', options)
      .build();

    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceivePost', (data) => {
      debugger;
      this.data = data.result;
    });
  }
}
