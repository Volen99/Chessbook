import { Component, Input } from '@angular/core';
import { Syndication } from './syndication.model';

import {
  faSatelliteDish,
} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-feed',
  styleUrls: [ './feed.component.scss' ],
  templateUrl: './feed.component.html'
})
export class FeedComponent {
  @Input() syndicationItems: Syndication[];

  faSatelliteDish = faSatelliteDish;
}
