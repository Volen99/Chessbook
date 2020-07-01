// This is our Main Method where everything starts

import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserToCreate} from './_interfaces/userToCreate.model';
import {User} from './_interfaces/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isCreate: boolean;
  public name: string;
  public address: string;
  public user: UserToCreate;
  public users: User[] = [];
  public response: {'dbPath': ''};


  constructor(private http: HttpClient) {

  }

  ngOnInit(){
    this.isCreate = true;
  }

  public onCreate = () => {
    this.user = {
      imgPath: this.response[0].dbPath,
    };

    this.isCreate = false;

    // console.log(this.user);
    // this.http.post('https://localhost:5000/api/users', this.user)
    //   .subscribe(res => {
    //     this.isCreate = false;
    //   });
  }

  public returnToCreate = () => {
    this.isCreate = true;
  }

  public uploadFinished = (event) => {
    this.response = event;
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5000/${serverPath}`;
  }


  title = 'world-feed';
}
