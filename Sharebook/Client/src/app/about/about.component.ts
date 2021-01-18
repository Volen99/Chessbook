import { Component } from '@angular/core';
import { ScreenService } from '../core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent {
  constructor(
    private screenService: ScreenService
  ) {
  }

  get isBroadcastMessageDisplayed() {
    return this.screenService.isBroadcastMessageDisplayed;
  }
}
