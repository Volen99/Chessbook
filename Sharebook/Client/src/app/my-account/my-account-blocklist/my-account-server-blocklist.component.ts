import {Component} from '@angular/core';
import {GenericServerBlocklistComponent} from "../../shared/shared-moderation/server-blocklist.component";
import {BlocklistComponentType} from "../../shared/shared-moderation/blocklist.service";

@Component({
  selector: 'my-account-server-blocklist',
  styleUrls: ['../../shared/shared-moderation/moderation.scss', '../../shared/shared-moderation/server-blocklist.component.scss'],
  templateUrl: '../../shared/shared-moderation/server-blocklist.component.html'
})
export class MyAccountServerBlocklistComponent extends GenericServerBlocklistComponent {
  mode = BlocklistComponentType.Account;

  getIdentifier() {
    return 'MyAccountServerBlocklistComponent';
  }
}
