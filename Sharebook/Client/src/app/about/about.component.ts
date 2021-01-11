import {Component} from '@angular/core';
import {ScreenService} from "../core/wrappers/screen.service";

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html'
})

export class AboutComponent {
  constructor(private screenService: ScreenService) {
  }

  get isBroadcastMessageDisplayed() {
    return this.screenService.isBroadcastMessageDisplayed;
  }
}
