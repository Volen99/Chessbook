import {Component} from '@angular/core';
import {BlocklistComponentType} from "../../../shared/shared-moderation/blocklist.service";
import {GenericServerBlocklistComponent} from "../../../shared/shared-moderation/server-blocklist.component";

@Component({
  selector: 'my-instance-server-blocklist',
  styleUrls: ['../../../shared/shared-moderation/server-blocklist.component.scss'],
  templateUrl: '../../../shared/shared-moderation/server-blocklist.component.html'
})
export class InstanceServerBlocklistComponent extends GenericServerBlocklistComponent {
  mode = BlocklistComponentType.Instance;

  getIdentifier() {
    return 'InstanceServerBlocklistComponent';
  }
}
