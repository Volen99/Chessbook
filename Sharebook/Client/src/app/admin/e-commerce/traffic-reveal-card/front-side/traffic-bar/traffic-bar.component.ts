import { Component, Input } from '@angular/core';
import { Comparison } from '../../../../../core/interfaces/ecommerce/traffic-list';

@Component({
  selector: 'ngx-traffic-bar',
  styleUrls: ['./traffic-bar.component.scss'],
  templateUrl: './traffic-bar.component.html',
})
export class TrafficBarComponent {

  @Input() barData: Comparison;
  @Input() successDelta: boolean;
}
