import {Component} from '@angular/core';
import {GenericServerBlocklistComponent} from "../../../shared/moderation/server-blocklist.component";
import {BlocklistComponentType} from "../../../shared/moderation/blocklist.service";

@Component({
  selector: 'my-account-server-blocklist',
  styleUrls: ['../../../shared/moderation/moderation.scss', '../../../shared/moderation/server-blocklist.component.scss'],
  templateUrl: '../../../shared/moderation/server-blocklist.component.html'
})
export class MyAccountServerBlocklistComponent extends GenericServerBlocklistComponent {
  mode = BlocklistComponentType.Account;

  getIdentifier() {
    return 'MyAccountServerBlocklistComponent';
  }
}
