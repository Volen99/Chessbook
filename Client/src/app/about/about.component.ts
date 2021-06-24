import {Component} from '@angular/core';
import {ScreenService} from "../core/wrappers/screen.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent {
  constructor(private screenService: ScreenService) {

  }

  get isBroadcastMessageDisplayed() {
    return this.screenService.isBroadcastMessageDisplayed;
  }
}
