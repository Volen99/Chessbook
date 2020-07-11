import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from '../../../core/shared/services/current-user.service';
import {User} from '../../../core/shared/user/user.model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  private currentUserService: CurrentUserService;

  constructor(currentUserService: CurrentUserService) {
    this.currentUserService = currentUserService;
  }

  public user: User;

  ngOnInit(): void {
    debugger
    this.user = this.currentUserService.user;
  }
}
