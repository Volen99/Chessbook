import {Component, OnDestroy} from '@angular/core';

import {
  faUsers,
  faFrown,
} from '@fortawesome/pro-solid-svg-icons';


import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService
} from "../../../sharebook-nebular/theme/services/breakpoints.service";
import {NbThemeService} from "../../../sharebook-nebular/theme/services/theme.service";

@Component({
  selector: 'app-chess-stuff',
  templateUrl: './chess-stuff.component.html',
  styleUrls: ['./chess-stuff.component.scss']
})
export class ChessStuffComponent implements OnDestroy {

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  faUsers = faUsers;
  faFrown = faFrown;

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

}
