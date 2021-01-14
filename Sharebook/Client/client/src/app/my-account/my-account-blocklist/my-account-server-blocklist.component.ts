import { Component } from '@angular/core';
import { BlocklistComponentType, GenericServerBlocklistComponent } from '../../shared/shared-moderation';

@Component({
  selector: 'app-account-server-blocklist',
  styleUrls: [ '../../shared/shared-moderation/moderation.scss', '../../shared/shared-moderation/server-blocklist.component.scss' ],
  templateUrl: '../../shared/shared-moderation/server-blocklist.component.html'
})
export class MyAccountServerBlocklistComponent extends GenericServerBlocklistComponent {
  mode = BlocklistComponentType.Account;

  getIdentifier() {
    return 'MyAccountServerBlocklistComponent';
  }
}
