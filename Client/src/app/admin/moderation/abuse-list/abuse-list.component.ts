import { Component } from '@angular/core';

import {
  faFlag,
} from '@fortawesome/pro-light-svg-icons';


@Component({
  selector: 'app-abuse-list',
  templateUrl: './abuse-list.component.html',
  styleUrls: [ 'abuse-list.component.scss' ]
})
export class AbuseListComponent {
  faFlag = faFlag;
}
