import { Component } from '@angular/core';
import { BlocklistComponentType, GenericAccountBlocklistComponent } from '../../shared/shared-moderation';

@Component({
  selector: 'app-account-blocklist',
  styleUrls: [ '../../shared/shared-moderation/account-blocklist.component.scss' ],
  templateUrl: '../../shared/shared-moderation/account-blocklist.component.html'
})
export class MyAccountBlocklistComponent extends GenericAccountBlocklistComponent {
  mode = BlocklistComponentType.Account;

  getIdentifier() {
    return 'MyAccountBlocklistComponent';
  }
}
