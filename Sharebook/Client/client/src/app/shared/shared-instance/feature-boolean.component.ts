import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-boolean',
  templateUrl: './feature-boolean.component.html',
  styleUrls: [ './feature-boolean.component.scss' ]
})
export class FeatureBooleanComponent {
  @Input() value: boolean;
}
