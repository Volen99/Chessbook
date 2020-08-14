import {Component, OnInit} from '@angular/core';
import {User} from '../../../core/shared-core/user/user.model';

import {StorageService} from '../../../core/shared-core/services/storage.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  private storageService: StorageService;

  constructor(storageService: StorageService ) {
    this.storageService = storageService;
  }

  public userCurrent: User;

  ngOnInit(): void {
    this.userCurrent = this.storageService.retrieve('userData');
  }
}
