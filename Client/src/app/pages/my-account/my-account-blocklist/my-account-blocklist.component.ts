import {Component} from '@angular/core';
import {BlocklistComponentType} from "../../../shared/moderation/blocklist.service";
import {GenericAccountBlocklistComponent} from "../../../shared/moderation/account-blocklist.component";

@Component({
  selector: 'my-account-blocklist',
  styleUrls: ['../../../shared/moderation/account-blocklist.component.scss'],
  templateUrl: '../../../shared/moderation/account-blocklist.component.html'
})
export class MyAccountBlocklistComponent extends GenericAccountBlocklistComponent {
  mode = BlocklistComponentType.Account;

  getIdentifier() {
    return 'MyAccountBlocklistComponent';
  }
}
