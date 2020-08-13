import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/shared-core/user/user.model';

import {StorageService} from '../../../core/shared-core/services/storage.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  private storage: StorageService;

  constructor(storage: StorageService ) {
    this.storage = storage;
  }

  public user: User;

  ngOnInit(): void {
    this.user = this.storage.retrieve('userData');
  }
}
