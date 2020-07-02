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
  constructor() {}
  title = 'world-feed';
}
