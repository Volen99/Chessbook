import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  styleUrls: [ './button.component.scss' ],
  templateUrl: './edit-button.component.html'
})

export class EditButtonComponent implements OnInit {
  @Input() label: string;
  @Input() title: string;
  @Input() routerLink: string[] | string = [];

  ngOnInit() {
    // <app-edit-button /> No label
    if (this.label === undefined && !this.title) {
      this.title = $localize`Update`;
    }

    // <app-edit-button label /> Use default label
    if (this.label === '') {
      this.label = $localize`Update`;

      if (!this.title) {
        this.title = this.label;
      }
    }
  }
}
