import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  styleUrls: [ './button.component.scss' ],
  templateUrl: './delete-button.component.html'
})

export class DeleteButtonComponent implements OnInit {
  @Input() label: string;
  @Input() title: string;

  ngOnInit() {
    // <app-delete-button /> No label
    if (this.label === undefined && !this.title) {
      this.title = $localize`Delete`;
    }

    // <app-delete-button label /> Use default label
    if (this.label === '') {
      this.label = $localize`Delete`;

      if (!this.title) {
        this.title = this.label;
      }
    }
  }
}
