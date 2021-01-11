import {Component, Input} from '@angular/core';
import {Notifier} from "../../../core/notification/notifier-service";
import {RedundancyService} from "../../../shared/main/video/redundancy.service";

@Component({
  selector: 'my-redundancy-checkbox',
  templateUrl: './redundancy-checkbox.component.html',
  styleUrls: ['./redundancy-checkbox.component.scss']
})
export class RedundancyCheckboxComponent {
  @Input() redundancyAllowed: boolean;
  @Input() host: string;

  constructor(private notifier: Notifier, private redundancyService: RedundancyService) {
  }

  updateRedundancyState() {
    this.redundancyService.updateRedundancy(this.host, this.redundancyAllowed)
      .subscribe(
        () => {
          const stateLabel = this.redundancyAllowed ? $localize`enabled` : $localize`disabled`;

          this.notifier.success($localize`Redundancy for ${this.host} is ${stateLabel}`);
        },

        err => this.notifier.error(err.message)
      );
  }
}
