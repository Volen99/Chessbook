import { Component } from '@angular/core';
import { BlocklistComponentType, GenericAccountBlocklistComponent } from '../../../shared/shared-moderation';

@Component({
  selector: 'app-instance-account-blocklist',
  styleUrls: [ '../../../shared/shared-moderation/moderation.scss', '../../../shared/shared-moderation/account-blocklist.component.scss' ],
  templateUrl: '../../../shared/shared-moderation/account-blocklist.component.html'
})
export class InstanceAccountBlocklistComponent extends GenericAccountBlocklistComponent {
  mode = BlocklistComponentType.Instance;

  getIdentifier() {
    return 'InstanceAccountBlocklistComponent';
  }
}
