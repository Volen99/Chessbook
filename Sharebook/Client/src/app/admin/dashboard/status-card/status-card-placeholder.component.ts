import { Component } from '@angular/core';

@Component({
  selector: 'ngx-status-card-placeholder',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card [ngClass]="{'off': true}">
      <div class="icon-container">
        <div class="icon primary">
        </div>
      </div>
      <div class="details">
        <div class="title"></div>
        <div class="status">OFF</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardPlaceholderComponent {
}
