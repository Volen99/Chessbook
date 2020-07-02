import { Component, OnInit } from '@angular/core';
import {UserToCreate} from '../../../../_interfaces/userToCreate.model';
import {User} from '../../../../_interfaces/user.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-history-BC-science-view',
  templateUrl: './science-view.component.html',
  styleUrls: ['./science-view.component.css']
})
export class ScienceViewComponent implements OnInit {
  public isCreate: boolean;
  public name: string;
  public address: string;
  public user: UserToCreate;
  public users: User[] = [];
  public response: {data: {dbPath: ''}};

  constructor(private http: HttpClient) {

  }

  ngOnInit(){
    this.isCreate = true;
  }

  public onCreate = () => {
    this.user = {
      imgPath: this.response.data[0].dbPath,
    };

    this.isCreate = false;
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
}
