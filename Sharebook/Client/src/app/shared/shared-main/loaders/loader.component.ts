import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  styleUrls: [ './loader.component.scss' ],
  templateUrl: './loader.component.html'
})
export class LoaderComponent {
  @Input() loading: boolean;
}
