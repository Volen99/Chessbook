import {Component} from '@angular/core';
import {GenericAccountBlocklistComponent} from "../../shared/shared-moderation/account-blocklist.component";
import {BlocklistComponentType} from "../../shared/shared-moderation/blocklist.service";

@Component({
  selector: 'my-account-blocklist',
  styleUrls: ['../../shared/shared-moderation/account-blocklist.component.scss'],
  templateUrl: '../../shared/shared-moderation/account-blocklist.component.html'
})
export class MyAccountBlocklistComponent extends GenericAccountBlocklistComponent {
  mode = BlocklistComponentType.Account;

  getIdentifier() {
    return 'MyAccountBlocklistComponent';
  }
}
