import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs';

import {ConfirmService} from "../confirm/confirm.service";

export type CanComponentDeactivateResult = { text?: string, canDeactivate: Observable<boolean> | boolean };

export interface CanComponentDeactivate {
  canDeactivate: () => CanComponentDeactivateResult;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor(private confirmService: ConfirmService) {
  }

  canDeactivate(component: CanComponentDeactivate) {
    const result = component.canDeactivate();
    const text = result.text || `All unsaved data will be lost, are you sure you want to leave this page? 🤔`;

    return result.canDeactivate || this.confirmService.confirm(
      text,
      `Warning`
    );
  }

}
