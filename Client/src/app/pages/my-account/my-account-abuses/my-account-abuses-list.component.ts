import { Component } from '@angular/core';
import {
  faFlag,
} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'my-account-abuses-list',
  templateUrl: './my-account-abuses-list.component.html',
  styleUrls: [ './my-account-abuses-list.component.scss' ]
})
export class MyAccountAbusesListComponent {
  faFlag = faFlag;
}
