import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-loader',
  styleUrls: [],
  templateUrl: './small-loader.component.html'
})

export class SmallLoaderComponent {
  @Input() loading: boolean;
}
