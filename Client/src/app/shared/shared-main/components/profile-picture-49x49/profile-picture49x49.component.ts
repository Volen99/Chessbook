import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-picture49x49',
  templateUrl: './profile-picture49x49.component.html',
  styleUrls: ['./profile-picture49x49.component.scss']
})
export class ProfilePicture49x49Component implements OnInit {
  @Input() profileImageUrlHttps: string;
  @Input() screenName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
