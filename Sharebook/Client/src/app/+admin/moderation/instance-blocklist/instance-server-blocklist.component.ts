import { Component } from '@angular/core';
import { GenericServerBlocklistComponent, BlocklistComponentType } from '../../../shared/shared-moderation';

@Component({
  selector: 'app-instance-server-blocklist',
  styleUrls: [ '../../../shared/shared-moderation/server-blocklist.component.scss' ],
  templateUrl: '../../../shared/shared-moderation/server-blocklist.component.html'
})
export class InstanceServerBlocklistComponent extends GenericServerBlocklistComponent {
  mode = BlocklistComponentType.Instance;

  getIdentifier() {
    return 'InstanceServerBlocklistComponent';
  }
}
